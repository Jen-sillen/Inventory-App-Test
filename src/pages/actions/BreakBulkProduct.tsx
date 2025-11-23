import React from 'react';
import BreakBulkProductForm from '@/components/forms/BreakBulkProductForm'; // New import

const BreakBulkProduct: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Break Bulk Product</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to record the breaking down of bulk products into sellable item packages.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <BreakBulkProductForm />
      </div>
    </div>
  );
};

export default BreakBulkProduct;