import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">About Pizza Maps</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p>
            Welcome to Pizza Maps, your ultimate companion in the quest for the perfect slice. Founded in 2025, we've made it our mission to connect pizza enthusiasts with exceptional local pizzerias, transforming the way people discover and enjoy one of the world's most beloved foods.
          </p>
          <p>
            Our platform celebrates the rich diversity of pizza craftsmanship, from traditional family-owned establishments that have perfected their recipes over generations to innovative artisanal pizzerias pushing the boundaries of flavor. We understand that every pizza tells a story, and every pizzeria has its own unique character that contributes to the vibrant tapestry of local food culture.
          </p>
          <p>
            Using advanced location-based technology, Pizza Maps helps you discover hidden gems within 10 miles of your location. Whether you're a devoted pizza connoisseur exploring new flavors, a traveler seeking authentic local experiences, or simply craving a delicious slice of comfort food, we're here to guide you to your next memorable pizza experience.
          </p>
          <p>
            Beyond just listings, we provide comprehensive information about each establishment, including ratings from real customers and easy access to directions, ensuring you can satisfy your pizza cravings with confidence. Our platform is designed to celebrate the artistry of pizza-making while making great pizza accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};