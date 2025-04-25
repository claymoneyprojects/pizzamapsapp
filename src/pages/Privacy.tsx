import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Privacy Policy</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect location data only when you explicitly provide it through the search function or "Use My Location" feature. This data is used solely to find pizza places near you and is never stored or shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To provide location-based search results for pizza places</li>
            <li>To improve our service and user experience</li>
            <li>To respond to your inquiries and support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">
            We use Google Maps to provide location services and display pizza places. Your use of Google Maps is subject to Google's Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Cookies and Tracking</h2>
          <p className="text-gray-700 mb-4">
            We use cookies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Privacy Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
};