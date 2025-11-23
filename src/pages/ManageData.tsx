"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';
import { useData } from '@/context/DataContext';
import AddEmployeeForm from '@/components/forms/AddEmployeeForm';
import AddVendorForm from '@/components/forms/AddVendorForm';
import AddDealerForm from '@/components/forms/AddDealerForm';
import AddShelfLocationForm from '@/components/forms/AddShelfLocationForm';
import AddDeviceForm from '@/components/forms/AddDeviceForm';
import AddProductForm from '@/components/forms/AddProductForm';
import EditEmployeeForm from '@/components/forms/EditEmployeeForm';
import EditProductForm from '@/components/forms/EditProductForm';
import ManageEntitySection from '@/components/ManageEntitySection'; // New import
import { Employee, Product, Dealer, Vendor, ShelfLocation, Device } from '@/types/inventory';

const ManageData: React.FC = () => {
  const { data } = useData();

  // State for Employees
  const [isEmployeeAddDialogOpen, setIsEmployeeAddDialogOpen] = useState(false);
  const [isEmployeeEditDialogOpen, setIsEmployeeEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // State for Dealers
  const [isDealerAddDialogOpen, setIsDealerAddDialogOpen] = useState(false);
  const [isDealerEditDialogOpen, setIsDealerEditDialogOpen] = useState(false); // Not used, but kept for consistency
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null); // Not used, but kept for consistency

  // State for Vendors
  const [isVendorAddDialogOpen, setIsVendorAddDialogOpen] = useState(false);
  const [isVendorEditDialogOpen, setIsVendorEditDialogOpen] = useState(false); // Not used, but kept for consistency
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null); // Not used, but kept for consistency

  // State for Shelf Locations
  const [isShelfLocationAddDialogOpen, setIsShelfLocationAddDialogOpen] = useState(false);
  const [isShelfLocationEditDialogOpen, setIsShelfLocationEditDialogOpen] = useState(false); // Not used, but kept for consistency
  const [selectedShelfLocation, setSelectedShelfLocation] = useState<ShelfLocation | null>(null); // Not used, but kept for consistency

  // State for Devices
  const [isDeviceAddDialogOpen, setIsDeviceAddDialogOpen] = useState(false);
  const [isDeviceEditDialogOpen, setIsDeviceEditDialogOpen] = useState(false); // Not used, but kept for consistency
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null); // Not used, but kept for consistency

  // State for Products
  const [isProductAddDialogOpen, setIsProductAddDialogOpen] = useState(false);
  const [isProductEditDialogOpen, setIsProductEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Render functions for each entity's card
  const renderEmployeeCard = (employee: Employee, handleEdit?: (item: Employee) => void) => (
    <Card key={employee.id} className="relative">
      <CardHeader>
        <CardTitle>{employee.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>ID: {employee.id}</p>
        {handleEdit && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => handleEdit(employee)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const renderDealerCard = (dealer: Dealer) => (
    <Card key={dealer.id}>
      <CardHeader>
        <CardTitle>{dealer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>ID: {dealer.id}</p>
      </CardContent>
    </Card>
  );

  const renderVendorCard = (vendor: Vendor) => (
    <Card key={vendor.id}>
      <CardHeader>
        <CardTitle>{vendor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>ID: {vendor.id}</p>
      </CardContent>
    </Card>
  );

  const renderShelfLocationCard = (location: ShelfLocation) => (
    <Card key={location.id}>
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>ID: {location.id}</p>
        <p>QR Code: {location.qrCode}</p>
      </CardContent>
    </Card>
  );

  const renderDeviceCard = (device: Device) => (
    <Card key={device.id}>
      <CardHeader>
        <CardTitle>{device.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>ID: {device.id}</p>
      </CardContent>
    </Card>
  );

  const renderProductCard = (product: Product, handleEdit?: (item: Product) => void) => (
    <Card key={product.sku} className="relative">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>SKU: {product.sku}</p>
        <p>Size: {product.size}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Cost: ${(product.cost ?? 0).toFixed(2)}</p>
        <p>Location: {data.shelfLocations.find(loc => loc.id === product.locationId)?.name || 'N/A'}</p>
        {handleEdit && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => handleEdit(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );

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
          <ManageEntitySection<Employee>
            title="Employees"
            data={data.employees}
            AddForm={AddEmployeeForm}
            EditForm={EditEmployeeForm}
            renderItemCard={renderEmployeeCard}
            emptyMessage="No employees added yet."
            selectedItem={selectedEmployee}
            setSelectedItem={setSelectedEmployee}
            isAddDialogOpen={isEmployeeAddDialogOpen}
            setIsAddDialogOpen={setIsEmployeeAddDialogOpen}
            isEditDialogOpen={isEmployeeEditDialogOpen}
            setIsEditDialogOpen={setIsEmployeeEditDialogOpen}
          />
        </TabsContent>

        <TabsContent value="dealers" className="mt-4">
          <ManageEntitySection<Dealer>
            title="Dealers"
            data={data.dealers}
            AddForm={AddDealerForm}
            renderItemCard={renderDealerCard}
            emptyMessage="No dealers added yet."
            selectedItem={selectedDealer}
            setSelectedItem={setSelectedDealer}
            isAddDialogOpen={isDealerAddDialogOpen}
            setIsAddDialogOpen={setIsDealerAddDialogOpen}
            isEditDialogOpen={isDealerEditDialogOpen}
            setIsEditDialogOpen={setIsDealerEditDialogOpen}
          />
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <ManageEntitySection<Vendor>
            title="Vendors"
            data={data.vendors}
            AddForm={AddVendorForm}
            renderItemCard={renderVendorCard}
            emptyMessage="No vendors added yet."
            selectedItem={selectedVendor}
            setSelectedItem={setSelectedVendor}
            isAddDialogOpen={isVendorAddDialogOpen}
            setIsAddDialogOpen={setIsVendorAddDialogOpen}
            isEditDialogOpen={isVendorEditDialogOpen}
            setIsEditDialogOpen={setIsVendorEditDialogOpen}
          />
        </TabsContent>

        <TabsContent value="shelf-locations" className="mt-4">
          <ManageEntitySection<ShelfLocation>
            title="Shelf Locations"
            data={data.shelfLocations}
            AddForm={AddShelfLocationForm}
            renderItemCard={renderShelfLocationCard}
            emptyMessage="No shelf locations added yet."
            selectedItem={selectedShelfLocation}
            setSelectedItem={setSelectedShelfLocation}
            isAddDialogOpen={isShelfLocationAddDialogOpen}
            setIsAddDialogOpen={setIsShelfLocationAddDialogOpen}
            isEditDialogOpen={isShelfLocationEditDialogOpen}
            setIsEditDialogOpen={setIsShelfLocationEditDialogOpen}
          />
        </TabsContent>

        <TabsContent value="devices" className="mt-4">
          <ManageEntitySection<Device>
            title="Devices"
            data={data.devices}
            AddForm={AddDeviceForm}
            renderItemCard={renderDeviceCard}
            emptyMessage="No devices added yet."
            selectedItem={selectedDevice}
            setSelectedItem={setSelectedDevice}
            isAddDialogOpen={isDeviceAddDialogOpen}
            setIsAddDialogOpen={setIsDeviceAddDialogOpen}
            isEditDialogOpen={isDeviceEditDialogOpen}
            setIsEditDialogOpen={isDeviceEditDialogOpen}
          />
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <ManageEntitySection<Product>
            title="Products"
            data={data.products}
            AddForm={AddProductForm}
            EditForm={EditProductForm}
            renderItemCard={renderProductCard}
            emptyMessage="No products added yet."
            selectedItem={selectedProduct}
            setSelectedItem={setSelectedProduct}
            isAddDialogOpen={isProductAddDialogOpen}
            setIsAddDialogOpen={setIsProductAddDialogOpen}
            isEditDialogOpen={isProductEditDialogOpen}
            setIsEditDialogOpen={isProductEditDialogOpen}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageData;