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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [isDealerDialogOpen, setIsDealerDialogOpen] = useState(false);
  const [isShelfLocationDialogOpen, setIsShelfLocationDialogOpen] = useState(false);
  const [isDeviceDialogOpen, setIsDeviceDialogOpen] = useState(false);
  
  const [isProductAddDialogOpen, setIsProductAddDialogOpen] = useState(false);
  const [isProductEditDialogOpen, setIsProductEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <h2 className="text-3xl font-bold">Manage Data</h2>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Employees</CardTitle>
              <Dialog open={isEmployeeAddDialogOpen} onOpenChange={setIsEmployeeAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Employee
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  <AddEmployeeForm onSuccess={() => setIsEmployeeAddDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.employees.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No employees added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.employees.map((employee) => (
                    <Card key={employee.id} className="relative">
                      <CardHeader>
                        <CardTitle>{employee.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>ID: {employee.id}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-4 right-4"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Dialog open={isEmployeeEditDialogOpen} onOpenChange={setIsEmployeeEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              {selectedEmployee && (
                <EditEmployeeForm
                  initialData={selectedEmployee}
                  onSuccess={() => setIsEmployeeEditDialogOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="dealers" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Dealers</CardTitle>
              <Dialog open={isDealerDialogOpen} onOpenChange={setIsDealerDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Dealer
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Dealer</DialogTitle>
                  </DialogHeader>
                  <AddDealerForm onSuccess={() => setIsDealerDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.dealers.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No dealers added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.dealers.map((dealer) => (
                    <Card key={dealer.id}>
                      <CardHeader>
                        <CardTitle>{dealer.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>ID: {dealer.id}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Vendors</CardTitle>
              <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Vendor
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Vendor</DialogTitle>
                  </DialogHeader>
                  <AddVendorForm onSuccess={() => setIsVendorDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.vendors.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No vendors added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.vendors.map((vendor) => (
                    <Card key={vendor.id}>
                      <CardHeader>
                        <CardTitle>{vendor.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>ID: {vendor.id}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shelf-locations" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Shelf Locations</CardTitle>
              <Dialog open={isShelfLocationDialogOpen} onOpenChange={setIsShelfLocationDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Location
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Shelf Location</DialogTitle>
                  </DialogHeader>
                  <AddShelfLocationForm onSuccess={() => setIsShelfLocationDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.shelfLocations.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No shelf locations added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.shelfLocations.map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <CardTitle>{location.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>ID: {location.id}</p>
                        <p>QR Code: {location.qrCode}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Devices</CardTitle>
              <Dialog open={isDeviceDialogOpen} onOpenChange={setIsDeviceDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Device
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Device</DialogTitle>
                  </DialogHeader>
                  <AddDeviceForm onSuccess={() => setIsDeviceDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.devices.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No devices added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.devices.map((device) => (
                    <Card key={device.id}>
                      <CardHeader>
                        <CardTitle>{device.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>ID: {device.id}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Products</CardTitle>
              <Dialog open={isProductAddDialogOpen} onOpenChange={setIsProductAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <AddProductForm onSuccess={() => setIsProductAddDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {data.products.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No products added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.products.map((product) => (
                    <Card key={product.sku} className="relative">
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>SKU: {product.sku}</p>
                        <p>Size: {product.size}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Cost: ${product.cost.toFixed(2)}</p>
                        <p>Location: {data.shelfLocations.find(loc => loc.id === product.locationId)?.name || 'N/A'}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-4 right-4"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Dialog open={isProductEditDialogOpen} onOpenChange={setIsProductEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              {selectedProduct && (
                <EditProductForm
                  initialData={selectedProduct}
                  onSuccess={() => setIsProductEditDialogOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageData;