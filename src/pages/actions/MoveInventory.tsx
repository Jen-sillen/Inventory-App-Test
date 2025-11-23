import React from 'react';
import MoveInventoryForm from '@/components/forms/MoveInventoryForm'; // New import

const MoveInventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Move Inventory</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to record the movement of inventory between shelf locations.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <MoveInventoryForm />
      </div>
    </div>
  );
};

export default MoveInventory;