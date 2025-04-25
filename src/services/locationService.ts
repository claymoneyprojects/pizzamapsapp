import { PizzaLocation } from '../types';

export const searchPizzaPlaces = async (location: google.maps.LatLngLiteral): Promise<PizzaLocation[]> => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      reject(new Error('Google Maps not loaded. Please try again.'));
      return;
    }

    const MILES_TO_METERS = 1609.34;
    const RADIUS_MILES = 10;
    const RADIUS_METERS = RADIUS_MILES * MILES_TO_METERS;
    const MAX_LOCATIONS = 5;

    // Create a map div for the PlacesService
    const mapDiv = document.createElement('div');
    const map = new google.maps.Map(mapDiv, { center: location, zoom: 15 });
    const service = new google.maps.places.PlacesService(map);
    
    const request: google.maps.places.PlaceSearchRequest = {
      location: location,
      radius: RADIUS_METERS,
      type: 'restaurant',
      keyword: 'pizza'
    };

    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        // Filter results to ensure they're within 10 miles and limit to MAX_LOCATIONS
        const filteredResults = results
          .filter(place => {
            if (!place.geometry?.location) return false;
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(location.lat, location.lng),
              place.geometry.location
            );
            return distance <= RADIUS_METERS;
          })
          .slice(0, MAX_LOCATIONS); // Limit to MAX_LOCATIONS before getting details

        // Get more details for each place
        const detailedPlaces = await Promise.all(
          filteredResults.map(place =>
            new Promise<PizzaLocation>((resolvePlace) => {
              if (!place.place_id) {
                resolvePlace({
                  id: place.place_id || '',
                  name: place.name || 'Unknown',
                  latitude: place.geometry?.location?.lat() || 0,
                  longitude: place.geometry?.location?.lng() || 0,
                  address: place.vicinity || '',
                  phone: '',
                  rating: place.rating || 0,
                  website: ''
                });
                return;
              }

              service.getDetails(
                {
                  placeId: place.place_id,
                  fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'website']
                },
                (placeDetails, detailStatus) => {
                  if (detailStatus === google.maps.places.PlacesServiceStatus.OK) {
                    resolvePlace({
                      id: place.place_id || '',
                      name: place.name || 'Unknown',
                      latitude: place.geometry?.location?.lat() || 0,
                      longitude: place.geometry?.location?.lng() || 0,
                      address: placeDetails?.formatted_address || place.vicinity || '',
                      phone: placeDetails?.formatted_phone_number || '',
                      rating: place.rating || 0,
                      website: placeDetails?.website || ''
                    });
                  } else {
                    resolvePlace({
                      id: place.place_id || '',
                      name: place.name || 'Unknown',
                      latitude: place.geometry?.location?.lat() || 0,
                      longitude: place.geometry?.location?.lng() || 0,
                      address: place.vicinity || '',
                      phone: '',
                      rating: place.rating || 0,
                      website: ''
                    });
                  }
                }
              );
            })
          )
        );

        resolve(detailedPlaces);
      } else {
        resolve([]);
      }
    });
  });
};