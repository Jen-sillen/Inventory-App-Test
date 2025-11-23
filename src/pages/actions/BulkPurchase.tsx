import React from 'react';

const BulkPurchase: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Make a Bulk Purchase</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to record incoming bulk product purchases from vendors.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Form for selecting vendor, product, quantity, and purchase details.
        </p>
      </div>
    </div>
  );
};

export default BulkPurchase;