import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { NoResultsFound } from '../components/NoResultsFound';
import { LocationList } from '../components/LocationList';
import { Map } from '../components/Map';
import { AdUnit } from '../components/AdUnit';
import { PizzaLocation } from '../types';
import { searchPizzaPlaces } from '../services/locationService';
import { checkRateLimit } from '../services/rateLimiting';
import { MapPin, Star, Clock, Shield, Pizza } from 'lucide-react';

const pizzaFacts = [
  "Did you know? The world's most expensive pizza costs $12,000 and is topped with three types of caviar!",
  "Pizza fact: Americans eat approximately 350 slices of pizza every second!",
  "Fun fact: The first pizzeria in America opened in 1905 - Lombardi's in New York City.",
  "Pizza trivia: Hawaiian pizza was actually invented in Canada, not Hawaii!",
  "Did you know? The longest pizza ever made was 6,333 feet long - that's more than a mile of pizza!",
  "Pizza fact: Saturday night is the most popular night for eating pizza.",
  "Fun fact: The U.S. Military Labs developed a pizza that can stay good for up to 3 years!",
  "Pizza trivia: The most popular pizza topping worldwide is pepperoni."
];

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<PizzaLocation[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({ lat: 40.7128, lng: -74.0060 });
  const [currentFact, setCurrentFact] = useState(pizzaFacts[0]);
  const [searchCount, setSearchCount] = useState(0);
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFact = pizzaFacts[Math.floor(Math.random() * pizzaFacts.length)];
      setCurrentFact(randomFact);
    }, 6000);

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(console.error);

    return () => clearInterval(interval);
  }, []);

  const performSearch = async (coordinates: google.maps.LatLngLiteral) => {
    if (!userIp) {
      setError('Unable to verify search limit. Please try again.');
      return false;
    }

    const { allowed, count } = await checkRateLimit(userIp);
    setSearchCount(count);

    if (!allowed) {
      setError('Daily search limit reached. Please try again tomorrow.');
      return false;
    }

    try {
      setUserLocation(coordinates);
      const pizzaPlaces = await searchPizzaPlaces(coordinates);
      setLocations(pizzaPlaces);
      setSearchPerformed(true);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to search for locations. Please try again.');
      setLocations([]);
      return false;
    }
  };

  const geocodeAddress = async (address: string): Promise<google.maps.LatLngLiteral> => {
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else if (status === 'ZERO_RESULTS') {
          reject(new Error('Address not found. Please try a different location.'));
        } else {
          reject(new Error('Failed to find location. Please try again.'));
        }
      });
    });
  };

  const handleSearch = async (address: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = await geocodeAddress(address);
      await performSearch(coordinates);
    } catch (err: any) {
      setError(err.message || 'Failed to search for locations. Please try again.');
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          await performSearch(coordinates);
          setIsLoading(false);
        },
        (err) => {
          setError('Unable to get your location. Please check your browser settings.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="bg-red-800 p-4 md:p-6">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-200 text-center mb-3">
            Find Pizza Near Me
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            onUseMyLocation={handleUseMyLocation}
            isLoading={isLoading}
          />
          {error && (
            <p className="text-center text-sm text-gray-200 mt-2">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Map 
          locations={locations} 
          center={userLocation} 
          searchPerformed={searchPerformed}
        />

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
          </div>
        )}

        {locations.length > 0 && (
          <LocationList locations={locations} userLocation={userLocation} />
        )}

        {searchPerformed && locations.length === 0 && !isLoading && !error && (
          <NoResultsFound />
        )}

        <div className="space-y-16 mt-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Pizza className="w-7 h-7 text-red-600" />
              Welcome to Pizza Maps
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-16">
              We're passionate about connecting pizza lovers with their perfect slice. Pizza Maps is a game-changing app that shows you every pizza spot within a 10-mile radius of your location. We don't just drop pins on a map — we serve up the full experience. You'll get real-time directions, contact numbers to place your order, and honest reviews from pizza lovers just like you. Prefer your pie piping hot and close by? Sort your results by distance. Want only the top-rated slices in town? Sort by review and follow the cheese trail to pizza perfection.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-3">
                  <MapPin className="text-red-600 w-8 h-8" strokeWidth={2.5} />
                  How Pizza Maps Works
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">1.</span>
                    Enter your location or use our "Use My Location" feature.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">2.</span>
                    We'll show you all the pizza places within 10 miles.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">3.</span>
                    View ratings, directions, and contact information.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">4.</span>
                    Call directly or get directions with one click.
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-3">
                  <Star className="text-red-600 w-8 h-8" strokeWidth={2.5} />
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Clock className="text-red-600 w-6 h-6" />
                    Real-time updates and accurate information.
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="text-red-600 w-6 h-6" />
                    Verified customer ratings and reviews.
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="text-red-600 w-6 h-6" />
                    Easy-to-use location-based search.
                  </li>
                  <li className="flex items-center gap-3">
                    <Pizza className="w-6 h-6 text-red-600" />
                    Discover hidden pizza gems near you.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Pizza className="w-7 h-7 text-red-600" />
              Buy Frozen Pizza
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a 
                href="https://amzn.to/4jHYI96" 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="block transition-transform hover:scale-105"
              >
                <img 
                  src="https://f.media-amazon.com/images/I/91ubP-YuiDL._SL1500_.jpg" 
                  alt="Pepperoni Pizza" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-center mt-3 text-lg font-semibold text-red-600">Pepperoni</p>
              </a>
              <a 
                href="https://amzn.to/3GrG7Qk" 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="block transition-transform hover:scale-105"
              >
                <img 
                  src="https://f.media-amazon.com/images/I/91U3PWUikaL._SL1500_.jpg" 
                  alt="Supreme Pizza" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-center mt-3 text-lg font-semibold text-red-600">Supreme</p>
              </a>
              <a 
                href="https://amzn.to/3ECQeBq" 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="block transition-transform hover:scale-105"
              >
                <img 
                  src="https://f.media-amazon.com/images/I/91xhMw9DmQL._SL1500_.jpg" 
                  alt="Four Cheese Pizza" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-center mt-3 text-lg font-semibold text-red-600">Four Cheese</p>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Pizza className="w-7 h-7 text-red-600" />
              Watch Our Commercial
            </h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/Iu_SFWtK7Z8"
                title="Pizza Maps Commercial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Pizza className="w-7 h-7 text-red-600" />
              Fun Pizza Facts
            </h2>
            <div className="animate-fadeIn">
              <p className="text-gray-700 text-lg">{currentFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};