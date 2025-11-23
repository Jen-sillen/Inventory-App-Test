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

const VendorDealerSalesHistory: React.FC = () => {
  const { data } = useData();

  // Combine sales and bulk deliveries into a single array for display
  const combinedHistory = [
    ...data.saleTransactions.map(transaction => ({
      type: 'Sale',
      date: new Date(transaction.date),
      partnerId: transaction.dealerId,
      products: transaction.productsSold.map(item => ({
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: transaction.totalAmount,
      employeeId: transaction.employeeId,
    })),
    ...data.bulkDeliveries.map(delivery => ({
      type: 'Purchase',
      date: new Date(delivery.date),
      partnerId: delivery.vendorId,
      products: [{
        sku: delivery.productId,
        quantity: delivery.quantity,
        price: delivery.totalAmount / delivery.quantity, // Calculate unit price for display
      }],
      totalAmount: delivery.totalAmount, // Now includes totalAmount
      employeeId: delivery.employeeId,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  const getPartnerName = (partnerId: string, type: 'Sale' | 'Purchase') => {
    if (type === 'Sale') {
      const dealer = data.dealers.find(d => d.id === partnerId);
      return dealer ? dealer.name : `Unknown Dealer (${partnerId})`;
    } else {
      const vendor = data.vendors.find(v => v.id === partnerId);
      return vendor ? vendor.name : `Unknown Vendor (${partnerId})`;
    }
  };

  const getProductName = (sku: string) => {
    const product = data.products.find(p => p.sku === sku);
    return product ? product.name : `Unknown Product (${sku})`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Vendor/Dealer Sales History</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays a comprehensive history of sales to dealers and purchases from vendors.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
        {combinedHistory.length === 0 ? (
          <p className="text-muted-foreground text-center">No sales or purchase history available yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combinedHistory.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{format(entry.date, 'PPP p')}</TableCell>
                  <TableCell>{getPartnerName(entry.partnerId, entry.type)}</TableCell>
                  <TableCell>
                    {entry.products.map((item, prodIndex) => (
                      <div key={prodIndex}>
                        {getProductName(item.sku)} (Qty: {item.quantity})
                        {item.price > 0 && ` @ $${item.price.toFixed(2)}/unit`}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    {`$${entry.totalAmount.toFixed(2)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default VendorDealerSalesHistory;