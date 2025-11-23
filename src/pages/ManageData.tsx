"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/context/DataContext';
import AddEmployeeForm from '@/components/forms/AddEmployeeForm';
import AddVendorForm from '@/components/forms/AddVendorForm';
import { PlusCircle } from 'lucide-react';

const ManageData: React.FC = () => {
  const { data } = useData();
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  // Add state for other dialogs as needed

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Manage Application Data</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Add, view, and edit employees, dealers, vendors, shelf locations, devices, and products.
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Employees</h3>
            <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <AddEmployeeForm onSuccess={() => setIsEmployeeDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
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
                    {/* Passcode should not be displayed */}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="dealers" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Dealers</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Dealer
            </Button>
          </div>
          <p className="text-muted-foreground">No dealers added yet.</p>
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Vendors</h3>
            <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Vendor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Vendor</DialogTitle>
                </DialogHeader>
                <AddVendorForm onSuccess={() => setIsVendorDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Shelf Locations</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Shelf Location
            </Button>
          </div>
          <p className="text-muted-foreground">No shelf locations added yet.</p>
        </TabsContent>

        <TabsContent value="devices" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Devices</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Device
            </Button>
          </div>
          <p className="text-muted-foreground">No devices added yet.</p>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Products</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
          <p className="text-muted-foreground">No products added yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageData;