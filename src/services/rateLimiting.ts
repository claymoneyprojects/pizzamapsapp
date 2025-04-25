import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const checkRateLimit = async (ip: string): Promise<{ allowed: boolean; count: number }> => {
  try {
    // Start a transaction to ensure data consistency
    const { data: existingLog, error: fetchError } = await supabase
      .from('request_logs')
      .select('*')
      .eq('ip_address', ip)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking rate limit:', fetchError);
      return { allowed: false, count: 0 };
    }

    const now = new Date();

    // If no existing log, create one and allow the request
    if (!existingLog) {
      const { error: insertError } = await supabase
        .from('request_logs')
        .insert([{ 
          ip_address: ip,
          request_count: 1,
          last_request: now.toISOString()
        }]);

      if (insertError) {
        console.error('Error creating rate limit record:', insertError);
        return { allowed: false, count: 0 };
      }

      return { allowed: true, count: 1 };
    }

    const lastRequest = new Date(existingLog.last_request);
    const hoursSinceLastRequest = (now.getTime() - lastRequest.getTime()) / (1000 * 60 * 60);

    // Reset count if 24 hours have passed
    if (hoursSinceLastRequest >= 24) {
      const { error: updateError } = await supabase
        .from('request_logs')
        .update({ 
          request_count: 1,
          last_request: now.toISOString()
        })
        .eq('ip_address', ip);

      if (updateError) {
        console.error('Error resetting rate limit:', updateError);
        return { allowed: false, count: 0 };
      }

      return { allowed: true, count: 1 };
    }

    // Check if limit exceeded
    if (existingLog.request_count >= 3) {
      return { allowed: false, count: existingLog.request_count };
    }

    // Increment count
    const { error: updateError } = await supabase
      .from('request_logs')
      .update({ 
        request_count: existingLog.request_count + 1,
        last_request: now.toISOString()
      })
      .eq('ip_address', ip);

    if (updateError) {
      console.error('Error updating rate limit:', updateError);
      return { allowed: false, count: existingLog.request_count };
    }

    return { 
      allowed: true, 
      count: existingLog.request_count + 1
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    return { allowed: false, count: 0 };
  }
};