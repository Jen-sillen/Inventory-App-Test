import React from 'react';
import { useData } from '@/context/DataContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      date: new Date(t.date),
      details: (
        <>
          Sold to {getDealerName(t.dealerId)} by {getEmployeeName(t.employeeId)}. Total: ${t.totalAmount.toFixed(2)}
          <ul className="list-disc list-inside ml-4">
            {t.productsSold.map((p, i) => (
              <li key={i}>{getProductName(p.sku)} (Qty: {p.quantity}) @ ${p.price.toFixed(2)}/unit</li>
            ))}
          </ul>
        </>
      ),
    })),
    ...data.bulkDeliveries.map(t => ({
      type: 'Bulk Purchase',
      date: new Date(t.date),
      details: (
        <>
          Purchased {t.quantity} units of {getProductName(t.productId)} from {getVendorName(t.vendorId)}
          {t.employeeId && ` by ${getEmployeeName(t.employeeId)}`}
        </>
      ),
    })),
    ...data.bulkBreakings.map(t => ({
      type: 'Bulk Breaking',
      date: new Date(t.date),
      details: (
        <>
          Broke down {t.quantityToBreak} units of bulk {getProductName(t.bulkProductId)} by {getEmployeeName(t.employeeId)}.
          Resulting products:
          <ul className="list-disc list-inside ml-4">
            {t.brokenIntoProducts.map((p, i) => (
              <li key={i}>{getProductName(p.sku)} (Qty: {p.quantity})</li>
            ))}
          </ul>
        </>
      ),
    })),
    ...data.inventoryMovements.map(t => ({
      type: 'Inventory Movement',
      date: new Date(t.date),
      details: (
        <>
          Moved {t.quantity} units of {getProductName(t.productId)} from {getLocationName(t.fromLocationId)} to {getLocationName(t.toLocationId)} by {getEmployeeName(t.employeeId)}
        </>
      ),
    })),
    ...data.productReceipts.map(t => ({
      type: 'Product Receipt',
      date: new Date(t.date),
      details: (
        <>
          Received {t.quantity} units of {getProductName(t.productId)} at {getLocationName(t.toLocationId)}
          {t.vendorId && ` from ${getVendorName(t.vendorId)}`}
          {t.employeeId && ` by ${getEmployeeName(t.employeeId)}`}
        </>
      ),
    })),
  ].filter(transaction => isToday(transaction.date)) // Filter for today's transactions
  .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Today’s Transactions</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays all transactions that have occurred today.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
        {allTransactions.length === 0 ? (
          <p className="text-muted-foreground text-center">No transactions recorded today yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead className="w-[200px]">Time</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{transaction.type}</TableCell>
                  <TableCell>{format(transaction.date, 'p')}</TableCell>
                  <TableCell>{transaction.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default TodaysTransactions;