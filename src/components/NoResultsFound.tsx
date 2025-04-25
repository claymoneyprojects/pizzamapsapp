import React from 'react';
import { Pizza } from 'lucide-react';

export const NoResultsFound: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fadeIn">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Pizza size={64} className="text-red-700" />
          <span className="absolute bottom-0 right-0 text-4xl">😢</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">No Pizza Places Found</h3>
      <p className="text-gray-600 mb-4">
        We couldn't find any pizzerias within 10 miles of your location. The perfect slice might be a little further away, but great pizza is always worth the journey.
      </p>
      <p className="text-gray-600 italic">
        Try searching in a different area to discover more local pizza gems.
      </p>
    </div>
  );
};