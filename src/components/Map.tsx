import React, { useRef, useEffect, useState } from 'react';
import { PizzaLocation } from '../types';

interface MapProps {
  locations: PizzaLocation[];
  center: google.maps.LatLngLiteral;
  searchPerformed?: boolean;
}

export const Map: React.FC<MapProps> = ({ locations, center, searchPerformed = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || !window.google || isInitialized) return;

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center,
      zoom: 11,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      keyboardShortcuts: true,
      disableDoubleClickZoom: false,
      gestureHandling: 'cooperative',
      clickableIcons: false
    });

    setIsInitialized(true);
  }, [isInitialized]);

  // Handle updates to locations and center
  useEffect(() => {
    if (!mapInstanceRef.current || !isInitialized) return;

    // Close any open info windows
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const pizzaIcon = {
      url: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png',
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 20)
    };

    // Add decorative markers if no search performed
    if (locations.length === 0 && !searchPerformed) {
      const decorativeLocations = [
        { lat: 40.7831, lng: -74.3712 },
        { lat: 40.7505, lng: -73.4023 },
        { lat: 41.1214, lng: -73.9877 },
        { lat: 40.4829, lng: -74.2654 },
        { lat: 40.9484, lng: -74.2857 }
      ];

      decorativeLocations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          icon: pizzaIcon,
          clickable: false,
          animation: google.maps.Animation.DROP
        });
        markersRef.current.push(marker);
      });

      const bounds = new google.maps.LatLngBounds();
      decorativeLocations.forEach(location => bounds.extend(location));
      mapInstanceRef.current.fitBounds(bounds);
      
      setTimeout(() => {
        if (mapInstanceRef.current) {
          const currentZoom = mapInstanceRef.current.getZoom() || 11;
          mapInstanceRef.current.setZoom(Math.min(9, currentZoom));
        }
      }, 100);
    } else {
      // Add user location marker
      const centerMarker = new google.maps.Marker({
        position: center,
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        }
      });
      markersRef.current.push(centerMarker);

      // Add location markers
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: mapInstanceRef.current,
          icon: pizzaIcon,
          title: location.name,
          animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 16px; min-width: 200px; max-width: 300px;">
              <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">${location.name}</h3>
              <p style="margin: 8px 0; color: #4B5563; font-size: 14px;">${location.address}</p>
              ${location.rating ? `<p style="margin: 8px 0; font-size: 14px;">Rating: ${location.rating} ⭐</p>` : ''}
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="padding: 8px 12px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;"
                >
                  Get Directions
                </a>
                ${location.phone ? `
                  <a
                    href="tel:${location.phone}"
                    style="padding: 8px 12px; background-color: #059669; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;"
                  >
                    Call Now
                  </a>
                ` : ''}
              </div>
            </div>
          `,
          pixelOffset: new google.maps.Size(0, -20)
        });

        marker.addListener('click', () => {
          // Close any previously opened info window
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
          infoWindow.open(mapInstanceRef.current, marker);
          infoWindowRef.current = infoWindow;
        });

        markersRef.current.push(marker);
      });

      // Fit bounds to include all markers
      if (locations.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(center);
        locations.forEach(location => {
          bounds.extend({ lat: location.latitude, lng: location.longitude });
        });
        mapInstanceRef.current.fitBounds(bounds);
      } else {
        mapInstanceRef.current.setCenter(center);
        mapInstanceRef.current.setZoom(13);
      }
    }
  }, [locations, center, searchPerformed, isInitialized]);

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-6 relative">
      <div ref={mapRef} className="w-full h-[400px]" />
      {searchPerformed && locations.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-800">No Local Pizza Found 😢</p>
          </div>
        </div>
      )}
    </div>
  );
};