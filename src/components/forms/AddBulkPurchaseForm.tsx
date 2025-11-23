"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import { showSuccess, showError } from "@/utils/toast";
import { BulkDelivery } from "@/types/inventory";

const bulkPurchaseFormSchema = z.object({
  vendorId: z.string().min(1, { message: "Vendor is required." }),
  productId: z.string().min(1, { message: "Bulk Product is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  employeeId: z.string().optional(),
});

interface AddBulkPurchaseFormProps {
  onSuccess?: () => void;
}

const AddBulkPurchaseForm: React.FC<AddBulkPurchaseFormProps> = ({ onSuccess }) => {
  const { data, addBulkDelivery } = useData();
  const form = useForm<z.infer<typeof bulkPurchaseFormSchema>>({
    resolver: zodResolver(bulkPurchaseFormSchema),
    defaultValues: {
      vendorId: "",
      productId: "",
      quantity: 1,
      employeeId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof bulkPurchaseFormSchema>) => {
    const newBulkDelivery: BulkDelivery = {
      id: `BULKDEL-${Date.now()}`, // Simple unique ID
      vendorId: values.vendorId,
      productId: values.productId,
      quantity: values.quantity,
      date: new Date().toISOString(),
      employeeId: values.employeeId || undefined,
    };

    try {
      addBulkDelivery(newBulkDelivery);
      showSuccess("Bulk purchase recorded successfully!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to record bulk purchase.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name} ({vendor.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bulk Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bulk product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.products.filter(p => p.isBulk).map((product) => ( // Only show bulk products
                    <SelectItem key={product.sku} value={product.sku}>
                      {product.name} ({product.sku}) - Current Qty: {product.quantity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity Purchased</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} ({employee.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Record Bulk Purchase</Button>
      </form>
    </Form>
  );
};

export default AddBulkPurchaseForm;