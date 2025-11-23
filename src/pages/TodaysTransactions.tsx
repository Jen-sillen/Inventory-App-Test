import React from 'react';
import { useData } from '@/context/DataContext';
import { format, isToday } from 'date-fns';

const TodaysTransactions: React.FC = () => {
  const { data } = useData();

  // Helper to get entity names
  const getEmployeeName = (id?: string) => id ? (data.employees.find(e => e.id === id)?.name || `Unknown Employee (${id})`) : 'N/A';
  const getVendorName = (id?: string) => id ? (data.vendors.find(v => v.id === id)?.name || `Unknown Vendor (${id})`) : 'N/A';
  const getDealerName = (id?: string) => id ? (data.dealers.find(d => d.id === id)?.name || `Unknown Dealer (${id})`) : 'N/A';
  const getProductName = (sku: string) => data.products.find(p => p.sku === sku)?.name || `Unknown Product (${sku})`;
  const getLocationName = (id?: string) => id ? (data.shelfLocations.find(l => l.id === id)?.name || `Unknown Location (${id})`) : 'N/A';

  // Combine all transaction types into a single array and filter for today
  const allTransactions = [
    ...data.saleTransactions.map(t => ({
      type: 'Sale',
      date: t.date,
      details: `Sold to ${getDealerName(t.dealerId)} by ${getEmployeeName(t.employeeId)}. Total: $${t.totalAmount.toFixed(2)}`,
    })),
    ...data.bulkDeliveries.map(t => ({
      type: 'Bulk Purchase',
      date: t.date,
      details: `Purchased ${t.quantity} units of ${getProductName(t.productId)} from ${getVendorName(t.vendorId)}`,
    })),
    ...data.bulkBreakings.map(t => ({
      type: 'Bulk Breaking',
      date: t.date,
      details: `Broke down bulk ${getProductName(t.bulkProductId)} by ${getEmployeeName(t.employeeId)}.`,
    })),
  ].filter(transaction => {
    try {
      const transactionDate = new Date(transaction.date);
      if (isNaN(transactionDate.getTime())) {
        console.error("Invalid date string for transaction:", transaction.date, "Type:", transaction.type);
        return false;
      }
      return isToday(transactionDate);
    } catch (e) {
      console.error("Error processing transaction date:", transaction.date, "Type:", transaction.type, e);
      return false;
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Today’s Transactions</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays all transactions that have occurred today.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p>Current Date (formatted by date-fns): {format(new Date(), 'PPP')}</p>
        {allTransactions.length === 0 ? (
          <p className="text-muted-foreground text-center">No transactions recorded today yet.</p>
        ) : (
          <p className="text-muted-foreground text-center">
            {allTransactions.length} transactions recorded today.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodaysTransactions;