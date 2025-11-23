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

const InventorySnapshot: React.FC = () => {
  const { data } = useData();

  const getLocationName = (locationId?: string) => {
    if (!locationId) return 'N/A';
    const location = data.shelfLocations.find(loc => loc.id === locationId);
    return location ? location.name : `Unknown Location (${locationId})`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Inventory Snapshot</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page provides a real-time overview of current inventory quantities and locations.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
        {data.products.length === 0 ? (
          <p className="text-muted-foreground text-center">No products in inventory yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Size/Type</TableHead>
                <TableHead>Bulk Item</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((product) => (
                <TableRow key={product.sku}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.isBulk ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell>{getLocationName(product.locationId)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default InventorySnapshot;