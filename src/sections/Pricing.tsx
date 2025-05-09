import React from 'react';

// eslint-disable-next-line import/no-unused-modules
export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="w-full py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Pricing Section
        </h2>
        {/* Placeholder for pricing plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg bg-white">
            <p>Plan 1 Placeholder</p>
          </div>
          <div className="p-6 border rounded-lg bg-white">
            <p>Plan 2 Placeholder</p>
          </div>
          <div className="p-6 border rounded-lg bg-white">
            <p>Plan 3 Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};
