import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const checkIpStatus = async (ip: string) => {
  const { data, error } = await supabase
    .from('request_logs')
    .select('*')
    .eq('ip_address', ip)
    .single();
    
  if (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
  
  if (!data) {
    return { blocked: false, message: 'No rate limit record found' };
  }
  
  const now = new Date();
  const lastRequest = new Date(data.last_request);
  const hoursSinceLastRequest = (now.getTime() - lastRequest.getTime()) / (1000 * 60 * 60);
  
  return {
    blocked: data.request_count >= 3 && hoursSinceLastRequest < 24,
    requestCount: data.request_count,
    hoursSinceLastRequest,
    lastRequest: data.last_request
  };
};

// Check the IP
const ip = '70.67.166.225';
const status = await checkIpStatus(ip);
console.log('Rate limit status:', status);