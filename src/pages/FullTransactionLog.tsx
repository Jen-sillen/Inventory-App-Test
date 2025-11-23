import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import EditSaleForm from '@/components/forms/EditSaleForm';
import EditBulkPurchaseForm from '@/components/forms/EditBulkPurchaseForm';
import { SaleTransaction, BulkDelivery } from '@/types/inventory';

// Define a union type for editable transactions
type EditableTransaction = SaleTransaction | BulkDelivery;

const FullTransactionLog: React.FC = () => {
  const { data } = useData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<EditableTransaction | null>(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState<'Sale' | 'Bulk Purchase' | null>(null);

  // Helper to get entity names
  const getEmployeeName = (id?: string) => id ? (data.employees.find(e => e.id === id)?.name || `Unknown Employee (${id})`) : 'N/A';
  const getVendorName = (id?: string) => id ? (data.vendors.find(v => v.id === id)?.name || `Unknown Vendor (${id})`) : 'N/A';
  const getDealerName = (id?: string) => id ? (data.dealers.find(d => d.id === id)?.name || `Unknown Dealer (${id})`) : 'N/A';
  const getProductName = (sku: string) => data.products.find(p => p.sku === sku)?.name || `Unknown Product (${sku})`;
  const getLocationName = (id?: string) => id ? (data.shelfLocations.find(l => l.id === id)?.name || `Unknown Location (${id})`) : 'N/A';

  // Combine all transaction types into a single array
  const allTransactions = [
    ...data.saleTransactions.map(t => ({
      id: t.id,
      type: 'Sale' as const,
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
      originalTransaction: t,
    })),
    ...data.bulkDeliveries.map(t => {
      const safeTotalAmount = typeof t.totalAmount === 'number' ? t.totalAmount : 0;
      return {
        id: t.id,
        type: 'Bulk Purchase' as const,
        date: new Date(t.date),
        details: (
          <>
            Purchased {t.quantity} units of {getProductName(t.productId)} from {getVendorName(t.vendorId)} for ${safeTotalAmount.toFixed(2)}
            {t.employeeId && ` by ${getEmployeeName(t.employeeId)}`}
          </>
        ),
        originalTransaction: t,
      };
    }),
    ...data.bulkBreakings.map(t => ({
      id: t.id,
      type: 'Bulk Breaking' as const,
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
      originalTransaction: t,
    })),
    ...data.inventoryMovements.map(t => ({
      id: t.id,
      type: 'Inventory Movement' as const,
      date: new Date(t.date),
      details: (
        <>
          Moved {t.quantity} units of {getProductName(t.productId)} from {getLocationName(t.fromLocationId)} to {getLocationName(t.toLocationId)} by {getEmployeeName(t.employeeId)}
        </>
      ),
      originalTransaction: t,
    })),
    ...data.productReceipts.map(t => ({
      id: t.id,
      type: 'Product Receipt' as const,
      date: new Date(t.date),
      details: (
        <>
          Received {t.quantity} units of {getProductName(t.productId)} at {getLocationName(t.toLocationId)}
          {t.vendorId && ` from ${getVendorName(t.vendorId)}`}
          {t.employeeId && ` by ${getEmployeeName(t.employeeId)}`}
        </>
      ),
      originalTransaction: t,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  const handleEditClick = (transaction: EditableTransaction, type: 'Sale' | 'Bulk Purchase') => {
    setSelectedTransaction(transaction);
    setSelectedTransactionType(type);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setSelectedTransaction(null);
    setSelectedTransactionType(null);
  };

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
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.map((transaction, index) => {
                try {
                  return (
                    <TableRow key={transaction.id || index}>
                      <TableCell className="font-medium">{transaction.type}</TableCell>
                      <TableCell>{format(transaction.date, 'PPP p')}</TableCell>
                      <TableCell>{transaction.details}</TableCell>
                      <TableCell className="text-right">
                        {(transaction.type === 'Sale' || transaction.type === 'Bulk Purchase') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(transaction.originalTransaction as EditableTransaction, transaction.type)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                } catch (error) {
                  console.error(`Error rendering transaction at index ${index}:`, transaction, error);
                  return (
                    <TableRow key={transaction.id || index} className="bg-red-100 dark:bg-red-900">
                      <TableCell colSpan={4} className="text-red-700 dark:text-red-300">
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {selectedTransactionType} Transaction</DialogTitle>
          </DialogHeader>
          {selectedTransactionType === 'Sale' && selectedTransaction && (
            <EditSaleForm
              initialData={selectedTransaction as SaleTransaction}
              onSuccess={handleEditSuccess}
            />
          )}
          {selectedTransactionType === 'Bulk Purchase' && selectedTransaction && (
            <EditBulkPurchaseForm
              initialData={selectedTransaction as BulkDelivery}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullTransactionLog;