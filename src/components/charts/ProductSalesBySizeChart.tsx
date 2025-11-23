"use client";

import React from 'react';
import { useData } from '@/context/DataContext';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B', '#6BFFB8'];

const ProductSalesBySizeChart: React.FC = () => {
  const { data } = useData();

  // Aggregate sales data by product size
  const salesBySizeMap = new Map<string, number>(); // Key: product size, Value: total sales amount

  data.saleTransactions.forEach(transaction => {
    transaction.productsSold.forEach(soldItem => {
      const product = data.products.find(p => p.sku === soldItem.sku);
      if (product) {
        const currentSales = salesBySizeMap.get(product.size) || 0;
        salesBySizeMap.set(product.size, currentSales + (soldItem.quantity * soldItem.price));
      }
    });
  });

  // Convert map to array of objects for Recharts
  const chartData = Array.from(salesBySizeMap.entries())
    .map(([size, totalSales]) => ({
      name: size,
      value: parseFloat(totalSales.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value); // Sort by sales, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Product Size/Type</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No product sales data available to display.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSalesBySizeChart;