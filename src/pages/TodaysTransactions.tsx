import React from 'react';
import { useData } from '@/context/DataContext';
import { format, isToday } from 'date-fns';

const TodaysTransactions: React.FC = () => {
  const { data } = useData();

  // Simplify transaction aggregation and add error handling for date parsing
  const todaySales = data.saleTransactions.filter(transaction => {
    try {
      const transactionDate = new Date(transaction.date);
      // Check if the date is valid before calling isToday
      if (isNaN(transactionDate.getTime())) {
        console.error("Invalid date string for sale transaction:", transaction.date);
        return false;
      }
      return isToday(transactionDate);
    } catch (e) {
      console.error("Error processing sale transaction date:", transaction.date, e);
      return false; // Exclude problematic dates
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Today’s Transactions</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays all transactions that have occurred today.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
        <p>Current Date (formatted by date-fns): {format(new Date(), 'PPP')}</p>
        {todaySales.length === 0 ? (
          <p className="text-muted-foreground text-center">No sales transactions recorded today yet.</p>
        ) : (
          <p className="text-muted-foreground text-center">
            {todaySales.length} sales transactions recorded today.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodaysTransactions;