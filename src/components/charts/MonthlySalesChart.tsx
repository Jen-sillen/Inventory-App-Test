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
import { format } from 'date-fns';

const MonthlySalesChart: React.FC = () => {
  const { data } = useData();

  // Aggregate sales data by month
  const monthlySalesMap = new Map<string, number>(); // Key: YYYY-MM, Value: total sales

  data.saleTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = format(date, 'yyyy-MM'); // e.g., "2023-10"
    const currentSales = monthlySalesMap.get(monthKey) || 0;
    monthlySalesMap.set(monthKey, currentSales + transaction.totalAmount);
  });

  // Convert map to array of objects for Recharts, sorting by date
  const chartData = Array.from(monthlySalesMap.entries())
    .map(([monthKey, totalSales]) => ({
      month: format(new Date(monthKey + '-01'), 'MMM yyyy'), // e.g., "Oct 2023"
      sales: parseFloat(totalSales.toFixed(2)),
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No sales data available to display.
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
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                labelFormatter={(label: string) => `Month: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="hsl(var(--primary))" name="Total Sales" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlySalesChart;