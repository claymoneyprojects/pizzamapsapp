import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Terms of Service</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Pizza Maps, you accept and agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Use License</h2>
          <p className="text-gray-700 mb-4">
            Pizza Maps grants you a personal, non-exclusive, non-transferable license to use our service for finding local pizza places.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            Pizza Maps provides information about pizza places but does not guarantee accuracy of business hours, contact information, or other details. Users should verify information directly with businesses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Limitations</h2>
          <p className="text-gray-700 mb-4">
            Pizza Maps shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Continued use of Pizza Maps after changes constitutes acceptance of the modified terms.
          </p>
        </section>
      </div>
    </div>
  );
};