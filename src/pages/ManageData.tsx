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
  console.log("ManageData component is rendering!"); // Diagnostic log

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

  // Temporarily simplified render for debugging
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-500">Manage Data Test</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">If you see this, the component is rendering!</p>
    </div>
  );
};

export default ManageData;