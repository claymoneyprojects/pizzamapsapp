import React from 'react';
import { ZapOff as MapOff } from 'lucide-react';

export const RegionRestricted: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <MapOff size={64} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Region Restricted</h2>
        <p className="text-gray-600 mb-2">
          We apologize, but Pizza Maps is currently only available in select countries.
        </p>
        <p className="text-gray-500 text-sm">
          Our service is available in: United States, Canada, United Kingdom, Germany, France, Japan, Australia, New Zealand, Singapore, and South Korea.
        </p>
      </div>
    </div>
  );
};