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
import { format } from 'date-fns';

const FullTransactionLog: React.FC = () => {
  const { data } = useData();

  console.log("FullTransactionLog - Data from context:", data); // Diagnostic log

  // Helper to get entity names
  const getEmployeeName = (id?: string) => id ? (data.employees.find(e => e.id === id)?.name || `Unknown Employee (${id})`) : 'N/A';
  const getVendorName = (id?: string) => id ? (data.vendors.find(v => v.id === id)?.name || `Unknown Vendor (${id})`) : 'N/A';
  const getDealerName = (id?: string) => id ? (data.dealers.find(d => d.id === id)?.name || `Unknown Dealer (${id})`) : 'N/A';
  const getProductName = (sku: string) => data.products.find(p => p.sku === sku)?.name || `Unknown Product (${sku})`;
  const getLocationName = (id?: string) => id ? (data.shelfLocations.find(l => l.id === id)?.name || `Unknown Location (${id})`) : 'N/A';

  // Combine all transaction types into a single array
  const allTransactions = [
    ...data.saleTransactions.map(t => ({
      type: 'Sale',
      date: new Date(t.date),
      details: (
        <>
          Sold to {getDealerName(t.dealerId)} by {getEmployeeName(t.employeeId)}. Total: ${t.totalAmount.toFixed(2)}
          <ul className="list-disc list-inside ml-4">
            {t.productsSold.map((p, i) => (
              <li key={i}>{getProductName(p.sku)} (Qty: {p.quantity}) @ {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : 'N/A'}/unit</li>
            ))}
          </ul>
        </>
      ),
    })),
    ...data.bulkDeliveries.map(t => {
      const safeTotalAmount = typeof t.totalAmount === 'number' ? t.totalAmount : 0; // Safely access totalAmount
      return {
        type: 'Bulk Purchase',
        date: new Date(t.date),
        details: (
          <>
            Purchased {t.quantity} units of {getProductName(t.productId)} from {getVendorName(t.vendorId)} for ${safeTotalAmount.toFixed(2)}
            {t.employeeId && ` by ${getEmployeeName(t.employeeId)}`}
          </>
        ),
      };
    }),
    ...data.bulkBreakings.map(t => ({
      type: 'Bulk Breaking',
      date: new Date(t.date),
      details: (
        <>
          Broke down {t.quantityToBreak ?? 'N/A'} units of bulk {getProductName(t.bulkProductId)} by {getEmployeeName(t.employeeId)}.
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
  ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  console.log("FullTransactionLog - All transactions:", allTransactions); // Diagnostic log

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Full Transaction Log</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page shows a comprehensive log of all transactions and inventory movements.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {allTransactions.length === 0 ? (
          <p className="text-muted-foreground text-center">No transactions recorded yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead className="w-[200px]">Date</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.map((transaction, index) => {
                try {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{transaction.type}</TableCell>
                      <TableCell>{format(transaction.date, 'PPP p')}</TableCell>
                      <TableCell>{transaction.details}</TableCell>
                    </TableRow>
                  );
                } catch (error) {
                  console.error(`Error rendering transaction at index ${index}:`, transaction, error);
                  return (
                    <TableRow key={index} className="bg-red-100 dark:bg-red-900">
                      <TableCell colSpan={3} className="text-red-700 dark:text-red-300">
                        Error displaying transaction (Type: {transaction.type}). Check console for details.
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default FullTransactionLog;