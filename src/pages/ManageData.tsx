"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/context/DataContext';
import AddEmployeeForm from '@/components/forms/AddEmployeeForm';
import AddVendorForm from '@/components/forms/AddVendorForm';
import AddDealerForm from '@/components/forms/AddDealerForm';
import AddShelfLocationForm from '@/components/forms/AddShelfLocationForm';
import AddDeviceForm from '@/components/forms/AddDeviceForm';
import AddProductForm from '@/components/forms/AddProductForm';
import EditEmployeeForm from '@/components/forms/EditEmployeeForm';
import EditProductForm from '@/components/forms/EditProductForm';
import { PlusCircle, Edit } from 'lucide-react';
import { Employee, Product } from '@/types/inventory'; // Import types for better state management

const ManageData: React.FC = () => {
  const { data } = useData();
  const [isEmployeeAddDialogOpen, setIsEmployeeAddDialogOpen] = useState(false);
  const [isEmployeeEditDialogOpen, setIsEmployeeEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Type correctly

  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [isDealerDialogOpen, setIsDealerDialogOpen] = useState(false);
  const [isShelfLocationDialogOpen, setIsShelfLocationDialogOpen] = useState(false);
  const [isDeviceDialogOpen, setIsDeviceDialogOpen] = useState(false);
  
  const [isProductAddDialogOpen, setIsProductAddDialogOpen] = useState(false);
  const [isProductEditDialogOpen, setIsProductEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Type correctly

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeEditDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductEditDialogOpen(true);
  };

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
            <Dialog open={isEmployeeAddDialogOpen} onOpenChange={setIsEmployeeAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <AddEmployeeForm onSuccess={() => setIsEmployeeAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.employees.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No employees added yet.</p>
            ) : (
              data.employees.map((employee) => (
                <Card key={employee.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{employee.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => handleEditEmployee(employee)}>
                      <Edit className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Edit employee</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p>ID: {employee.id}</p>
                    {/* Passcode should not be displayed */}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {/* Refactored Dialog for editing employee */}
          <Dialog open={isEmployeeEditDialogOpen} onOpenChange={setIsEmployeeEditDialogOpen}>
            {selectedEmployee && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>
                <EditEmployeeForm initialData={selectedEmployee} onSuccess={() => setIsEmployeeEditDialogOpen(false)} />
              </DialogContent>
            )}
          </Dialog>
        </TabsContent>

        <TabsContent value="dealers" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Dealers</h3>
            <Dialog open={isDealerDialogOpen} onOpenChange={setIsDealerDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Dealer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Dealer</DialogTitle>
                </DialogHeader>
                <AddDealerForm onSuccess={() => setIsDealerDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
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
                    {/* Passcode should not be displayed */}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
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
            <Dialog open={isShelfLocationDialogOpen} onOpenChange={setIsShelfLocationDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Shelf Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Shelf Location</DialogTitle>
                </DialogHeader>
                <AddShelfLocationForm onSuccess={() => setIsShelfLocationDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Devices</h3>
            <Dialog open={isDeviceDialogOpen} onOpenChange={setIsDeviceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Device
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Device</DialogTitle>
                </DialogHeader>
                <AddDeviceForm onSuccess={() => setIsDeviceDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Products</h3>
            <Dialog open={isProductAddDialogOpen} onOpenChange={setIsProductAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <AddProductForm onSuccess={() => setIsProductAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.products.length === 0 ? (
              <p className="text-muted-foreground col-span-full">No products added yet.</p>
            ) : (
              data.products.map((product) => (
                <Card key={product.sku}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Edit product</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p>SKU: {product.sku}</p>
                    <p>Size: {product.size}</p>
                    <p>Bulk: {product.isBulk ? "Yes" : "No"}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Cost: ${product.cost.toFixed(2)}</p>
                    {product.locationId && <p>Location: {product.locationId}</p>}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {/* Refactored Dialog for editing product */}
          <Dialog open={isProductEditDialogOpen} onOpenChange={setIsProductEditDialogOpen}>
            {selectedProduct && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <EditProductForm initialData={selectedProduct} onSuccess={() => setIsProductEditDialogOpen(false)} />
              </DialogContent>
            )}
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageData;