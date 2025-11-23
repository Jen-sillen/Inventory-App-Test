import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import MonthlySalesChart from '@/components/charts/MonthlySalesChart'; // New import

const OverallMetricsSales: React.FC = () => {
  const { data } = useData();

  // Calculate total sales amount
  const totalSales = data.saleTransactions.reduce(
    (sum, transaction) => sum + transaction.totalAmount,
    0
  );

  // Count total products (unique SKUs)
  const totalProducts = data.products.length;

  // Count active vendors
  const activeVendors = data.vendors.length;

  // Count total employees
  const totalEmployees = data.employees.length;

  // Count total dealers
  const totalDealers = data.dealers.length;

  // Count total shelf locations
  const totalShelfLocations = data.shelfLocations.length;

  // Count total devices
  const totalDevices = data.devices.length;

  // Calculate total quantity of all products
  const totalProductQuantity = data.products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Overall Metrics & Sales</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page displays key performance indicators and sales data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products (Unique SKUs)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Product Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalProductQuantity}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{activeVendors}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Dealers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalDealers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Shelf Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalShelfLocations}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalDevices}</p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Metrics Visualizations</h3>
        <p className="text-gray-600 dark:text-gray-400">
          This section will include tabs to visualize data by various criteria:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Bulk Purchase totals/frequency by vendor and product type</li>
          <li>Sale totals/frequency by Dealer and product type</li>
          <li>Purchase/Sales totals/frequency by Employee</li>
          <li>Average turnaround of bulk product by types</li>
          <li>Average Profit by product type</li>
          <li>Net/Gross Profits and Spending</li>
          <li>Breakdown of gross by product type</li>
          <li>Monthly Overview</li>
          <li>Weekly Overview</li>
          <li>Seasonal Trending</li>
          <li>Dealer Reorder data</li>
          <li>Price Fluctuations</li>
        </ul>
        <MonthlySalesChart /> {/* Replaced placeholder with the new chart */}
      </section>
    </div>
  );
};

export default OverallMetricsSales;