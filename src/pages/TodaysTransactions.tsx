import React from 'react';
import { useData } from '@/context/DataContext';
// Removed date-fns and table imports for now

const TodaysTransactions: React.FC = () => {
  const { data } = useData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Today’s Transactions</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays all transactions that have occurred today.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
        <p>This is a test message for Today's Transactions page.</p>
        <p>Number of employees: {data.employees.length}</p>
      </div>
    </div>
  );
};

export default TodaysTransactions;