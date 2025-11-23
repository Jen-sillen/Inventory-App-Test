import React from 'react';
import { useData } from '@/context/DataContext';

const Index: React.FC = () => {
  const { data } = useData(); // Example of how to access data

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Your Inventory Management App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Use the sidebar to navigate through the application.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          Currently tracking {data.employees.length} employees and {data.vendors.length} vendors.
        </p>
      </div>
    </div>
  );
};

export default Index;