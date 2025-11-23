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

  // Aggregate bulk purchase data by vendor, now summing totalAmount
  const vendorPurchaseMap = new Map<string, number>(); // Key: vendorId, Value: total purchase amount

  data.bulkDeliveries.forEach(delivery => {
    const currentAmount = vendorPurchaseMap.get(delivery.vendorId) || 0;
    vendorPurchaseMap.set(delivery.vendorId, currentAmount + delivery.totalAmount);
  });

  // Convert map to array of objects for Recharts
  const chartData = Array.from(vendorPurchaseMap.entries())
    .map(([vendorId, totalAmount]) => {
      const vendor = data.vendors.find(v => v.id === vendorId);
      return {
        vendorName: vendor ? vendor.name : `Unknown Vendor (${vendorId})`,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
      };
    })
    .sort((a, b) => b.totalAmount - a.totalAmount); // Sort by total amount, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Purchases by Vendor (Total Value)</CardTitle>
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
              <YAxis className="text-sm" tickFormatter={(value) => `$${value}`} /> {/* Formatter for currency */}
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total Purchased']}
                labelFormatter={(label: string) => `Vendor: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="totalAmount" fill="hsl(var(--secondary))" name="Total Purchase Value" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorBulkPurchaseChart;