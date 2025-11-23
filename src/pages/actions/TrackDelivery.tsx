import React from 'react';

const TrackDelivery: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Track a Delivery</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to track incoming deliveries from vendors.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Form for recording delivery details, linking to a bulk purchase or new stock.
        </p>
      </div>
    </div>
  );
};

export default TrackDelivery;