import React from 'react';
import AddBulkPurchaseForm from '@/components/forms/AddBulkPurchaseForm'; // New import

const BulkPurchase: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Make a Bulk Purchase</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Record incoming bulk product purchases from vendors.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <AddBulkPurchaseForm />
      </div>
    </div>
  );
};

export default BulkPurchase;