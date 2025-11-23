import React from 'react';

const NewSale: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Make a New Sale</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will allow employees to record new sales transactions to dealers.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Form for selecting dealer, employee, products, quantities, and prices.
        </p>
      </div>
    </div>
  );
};

export default NewSale;