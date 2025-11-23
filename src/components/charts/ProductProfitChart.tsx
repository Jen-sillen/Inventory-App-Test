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

const ProductProfitChart: React.FC = () => {
  const { data } = useData();

  // Aggregate profit data by product
  const productProfitMap = new Map<string, { totalRevenue: number; totalCost: number; unitsSold: number }>();

  data.saleTransactions.forEach(transaction => {
    transaction.productsSold.forEach(soldItem => {
      const product = data.products.find(p => p.sku === soldItem.sku);
      if (product) {
        const currentData = productProfitMap.get(product.sku) || { totalRevenue: 0, totalCost: 0, unitsSold: 0 };
        productProfitMap.set(product.sku, {
          totalRevenue: currentData.totalRevenue + (soldItem.quantity * soldItem.price),
          totalCost: currentData.totalCost + (soldItem.quantity * product.cost),
          unitsSold: currentData.unitsSold + soldItem.quantity,
        });
      }
    });
  });

  // Calculate average profit per unit for each product
  const chartData = Array.from(productProfitMap.entries())
    .map(([sku, totals]) => {
      const product = data.products.find(p => p.sku === sku);
      const profit = totals.totalRevenue - totals.totalCost;
      const averageProfitPerUnit = totals.unitsSold > 0 ? profit / totals.unitsSold : 0;
      return {
        productName: product ? product.name : `Unknown Product (${sku})`,
        averageProfit: parseFloat(averageProfitPerUnit.toFixed(2)),
      };
    })
    .sort((a, b) => b.averageProfit - a.averageProfit); // Sort by average profit, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Profit by Product</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No sales data with cost information available to display profit.
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
              <XAxis dataKey="productName" className="text-sm" />
              <YAxis className="text-sm" tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Avg. Profit per Unit']}
                labelFormatter={(label: string) => `Product: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="averageProfit" fill="hsl(var(--primary))" name="Average Profit per Unit" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductProfitChart;