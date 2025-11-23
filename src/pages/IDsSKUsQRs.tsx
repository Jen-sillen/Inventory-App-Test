import React from 'react';
import { useData } from '@/context/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const IDsSKUsQRs: React.FC = () => {
  const { data } = useData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Full list of Created IDs/SKUs/QRs</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page lists all unique IDs, SKUs, and QR codes for various entities in the system.
      </p>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="dealers">Dealers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="shelf-locations">Shelf Locations</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Employees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.employees.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No employees added yet.</p>
            ) : (
              data.employees.map((employee) => (
                <Card key={employee.id}>
                  <CardHeader>
                    <CardTitle>{employee.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {employee.id}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="dealers" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Dealers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.dealers.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No dealers added yet.</p>
            ) : (
              data.dealers.map((dealer) => (
                <Card key={dealer.id}>
                  <CardHeader>
                    <CardTitle>{dealer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {dealer.id}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Vendors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.vendors.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No vendors added yet.</p>
            ) : (
              data.vendors.map((vendor) => (
                <Card key={vendor.id}>
                  <CardHeader>
                    <CardTitle>{vendor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {vendor.id}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="shelf-locations" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Shelf Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.shelfLocations.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No shelf locations added yet.</p>
            ) : (
              data.shelfLocations.map((location) => (
                <Card key={location.id}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {location.id}</p>
                    <p>QR Code: {location.qrCode}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Devices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.devices.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No devices added yet.</p>
            ) : (
              data.devices.map((device) => (
                <Card key={device.id}>
                  <CardHeader>
                    <CardTitle>{device.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {device.id}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
            {data.products.length === 0 ? (
              <p className="text-muted-foreground text-center">No products added yet.</p>
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
                      <TableCell>{data.shelfLocations.find(loc => loc.id === product.locationId)?.name || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IDsSKUsQRs;