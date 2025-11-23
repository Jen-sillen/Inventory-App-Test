import React from 'react';

const InventorySnapshot: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Inventory Snapshot</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will provide a real-time overview of current inventory quantities and locations.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Current stock levels for bulk and sellable products, by SKU and location, will be shown here.
        </p>
      </div>
    </div>
  );
};

export default InventorySnapshot;