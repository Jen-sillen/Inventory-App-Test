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

const DealerSalesChart: React.FC = () => {
  const { data } = useData();

  // Aggregate sales data by dealer
  const dealerSalesMap = new Map<string, number>(); // Key: dealerId, Value: total sales

  data.saleTransactions.forEach(transaction => {
    const currentSales = dealerSalesMap.get(transaction.dealerId) || 0;
    dealerSalesMap.set(transaction.dealerId, currentSales + transaction.totalAmount);
  });

  // Convert map to array of objects for Recharts
  const chartData = Array.from(dealerSalesMap.entries())
    .map(([dealerId, totalSales]) => {
      const dealer = data.dealers.find(d => d.id === dealerId);
      return {
        dealerName: dealer ? dealer.name : `Unknown Dealer (${dealerId})`,
        sales: parseFloat(totalSales.toFixed(2)),
      };
    })
    .sort((a, b) => b.sales - a.sales); // Sort by sales, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Dealer</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No dealer sales data available to display.
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
              <XAxis dataKey="dealerName" className="text-sm" />
              <YAxis className="text-sm" tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                labelFormatter={(label: string) => `Dealer: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="hsl(var(--accent))" name="Total Sales" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DealerSalesChart;