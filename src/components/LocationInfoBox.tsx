import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { PizzaLocation } from '../types';

interface LocationInfoBoxProps {
  location: PizzaLocation;
}

export const LocationInfoBox: React.FC<LocationInfoBoxProps> = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2.5 border-l-4 border-red-700 animate-slideUp max-w-[300px]">
      <h3 className="text-base font-bold mb-1.5">{location.name}</h3>
      
      <div className="space-y-1.5">
        <div className="flex items-start">
          <MapPin size={14} className="text-red-700 mt-1 mr-1.5 flex-shrink-0" />
          <p className="text-gray-700 text-xs leading-tight">{location.address}</p>
        </div>
        
        <div className="flex items-start">
          <Phone size={14} className="text-red-700 mt-0.5 mr-1.5 flex-shrink-0" />
          <p className="text-gray-700 text-xs">
            <a href={`tel:${location.phone}`} className="hover:text-red-700 transition-colors">
              {location.phone}
            </a>
          </p>
        </div>
      </div>
      
      <div className="mt-2 flex justify-end">
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-2 py-1 bg-red-700 text-white text-xs rounded hover:bg-red-800 transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};