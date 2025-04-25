import React, { useState } from 'react';
import { MapPin, Phone, Star, ArrowUpDown } from 'lucide-react';
import { PizzaLocation } from '../types';

interface LocationListProps {
  locations: PizzaLocation[];
  userLocation: google.maps.LatLngLiteral;
}

type SortOption = 'distance' | 'rating';

export const LocationList: React.FC<LocationListProps> = ({ locations, userLocation }) => {
  const [sortBy, setSortBy] = useState<SortOption>('distance');

  // Calculate distances and sort locations
  const locationsWithDistance = locations.map(location => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(userLocation.lat, userLocation.lng),
      new google.maps.LatLng(location.latitude, location.longitude)
    );
    return { ...location, distance };
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance;
    } else {
      return (b.rating || 0) - (a.rating || 0);
    }
  });

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/images/pizza-icon.png" 
              alt="Pizza icon" 
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              Pizza Near Me
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
              <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {locationsWithDistance.map(location => (
          <div key={location.id} className="p-8 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{location.name}</h3>
              <div className="flex items-center">
                {location.rating > 0 && (
                  <div className="flex items-center bg-yellow-100 px-3 py-1.5 rounded-full">
                    <Star size={18} className="text-yellow-500 mr-1" />
                    <span className="text-base font-medium">{location.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex items-start">
                <MapPin size={20} className="text-red-600 mt-1 mr-2.5 flex-shrink-0" />
                <div>
                  <p className="text-base">{location.address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(location.distance / 1609.34).toFixed(1)} miles away
                  </p>
                </div>
              </div>
              
              {location.phone && (
                <div className="flex items-center">
                  <Phone size={20} className="text-red-600 mr-2.5 flex-shrink-0" />
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-base hover:text-red-600 transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors text-base font-medium"
              >
                Get Directions
              </a>
              {location.phone && (
                <a
                  href={`tel:${location.phone}`}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors gap-2 text-base font-medium"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};