import React from 'react';

const FullTransactionLog: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Full Transaction Log</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will show a comprehensive log of all transactions and inventory movements.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Detailed list of all actions (sales, purchases, movements, etc.) will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default FullTransactionLog;