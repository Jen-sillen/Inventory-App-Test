import React from 'react';
import AddProductReceiptForm from '@/components/forms/AddProductReceiptForm'; // New import

const TrackDelivery: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Track a Delivery</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to track incoming deliveries from vendors.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <AddProductReceiptForm />
      </div>
    </div>
  );
};

export default TrackDelivery;