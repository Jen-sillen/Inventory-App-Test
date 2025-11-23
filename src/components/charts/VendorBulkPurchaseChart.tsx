"use client";

import React from 'react';
import { useData } from '@/context/DataContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VendorBulkPurchaseChart: React.FC = () => {
  const { data } = useData();

  // Aggregate bulk purchase data by vendor
  const vendorPurchaseMap = new Map<string, number>(); // Key: vendorId, Value: total quantity

  data.bulkDeliveries.forEach(delivery => {
    const currentQuantity = vendorPurchaseMap.get(delivery.vendorId) || 0;
    vendorPurchaseMap.set(delivery.vendorId, currentQuantity + delivery.quantity);
  });

  // Convert map to array of objects for Recharts
  const chartData = Array.from(vendorPurchaseMap.entries())
    .map(([vendorId, totalQuantity]) => {
      const vendor = data.vendors.find(v => v.id === vendorId);
      return {
        vendorName: vendor ? vendor.name : `Unknown Vendor (${vendorId})`,
        quantity: totalQuantity,
      };
    })
    .sort((a, b) => b.quantity - a.quantity); // Sort by quantity, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Purchases by Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No bulk purchase data available to display.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="vendorName" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                formatter={(value: number) => [`${value} units`, 'Quantity']}
                labelFormatter={(label: string) => `Vendor: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="quantity" fill="hsl(var(--secondary))" name="Total Quantity Purchased" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorBulkPurchaseChart;