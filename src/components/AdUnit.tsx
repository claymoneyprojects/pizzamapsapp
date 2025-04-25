import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', className = '' }) => {
  const isAdInitialized = useRef(false);

  useEffect(() => {
    if (!isAdInitialized.current) {
      try {
        // Push the command to Google AdSense only if not already initialized
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isAdInitialized.current = true;
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }

    // Cleanup function to reset the initialization state when component unmounts
    return () => {
      isAdInitialized.current = false;
    };
  }, []);

  return (
    <div className={`ad-container my-4 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1595643709126080"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};