import React from 'react';

const TodaysTransactions: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Today’s Transactions</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will display all transactions that have occurred today.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          A summary and detailed list of today's sales, purchases, and inventory movements.
        </p>
      </div>
    </div>
  );
};

export default TodaysTransactions;