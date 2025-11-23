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

const EmployeeActivityChart: React.FC = () => {
  const { data } = useData();

  // Aggregate transaction counts by employee
  const employeeActivityMap = new Map<string, number>(); // Key: employeeId, Value: total transactions

  // Helper to increment count for an employee
  const incrementEmployeeActivity = (employeeId?: string) => {
    if (employeeId) {
      const currentCount = employeeActivityMap.get(employeeId) || 0;
      employeeActivityMap.set(employeeId, currentCount + 1);
    }
  };

  data.saleTransactions.forEach(t => incrementEmployeeActivity(t.employeeId));
  data.bulkDeliveries.forEach(t => incrementEmployeeActivity(t.employeeId));
  data.bulkBreakings.forEach(t => incrementEmployeeActivity(t.employeeId));
  data.inventoryMovements.forEach(t => incrementEmployeeActivity(t.employeeId));
  data.productReceipts.forEach(t => incrementEmployeeActivity(t.employeeId));

  // Convert map to array of objects for Recharts
  const chartData = Array.from(employeeActivityMap.entries())
    .map(([employeeId, transactionCount]) => {
      const employee = data.employees.find(e => e.id === employeeId);
      return {
        employeeName: employee ? employee.name : `Unknown Employee (${employeeId})`,
        transactions: transactionCount,
      };
    })
    .sort((a, b) => b.transactions - a.transactions); // Sort by transaction count, highest first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Activity (Total Transactions)</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No employee activity data available to display.
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
              <XAxis dataKey="employeeName" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                formatter={(value: number) => [`${value} transactions`, 'Transactions']}
                labelFormatter={(label: string) => `Employee: ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="transactions" fill="hsl(var(--primary))" name="Total Transactions" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeActivityChart;