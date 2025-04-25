import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (address: string) => void;
  onUseMyLocation: () => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onUseMyLocation, isLoading }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (window.google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: google.maps.places.AutocompletePrediction) => {
    onSearch(suggestion.description);
    setAddress(suggestion.description);
    setSuggestions([]);
  };

  useEffect(() => {
    if (!address.trim() || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      autocompleteService.current?.getPlacePredictions(
        {
          input: address,
          componentRestrictions: { country: ['us', 'ca'] }
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [address]);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Enter City or Zip Code"
          className="w-full py-3 px-4 pr-12 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-lg"
          autoComplete="off"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-700 transition-colors"
          aria-label="Search"
          disabled={isLoading}
        >
          <Search size={24} />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.place_id}
                className="px-4 py-2 hover:bg-red-50 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onUseMyLocation}
          className="inline-flex items-center justify-center px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors gap-2 shadow-md"
          disabled={isLoading}
        >
          <MapPin size={20} />
          Use My Location
        </button>
      </div>
    </div>
  );
};