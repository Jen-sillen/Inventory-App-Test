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

const editBulkPurchaseFormSchema = z.object({
  vendorId: z.string().min(1, { message: "Vendor is required." }),
  productId: z.string().min(1, { message: "Bulk Product is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  totalAmount: z.coerce.number().min(0.01, { message: "Total amount must be greater than 0." }),
  employeeId: z.string().optional(),
});

interface EditBulkPurchaseFormProps {
  initialData: BulkDelivery;
  onSuccess?: () => void;
}

const EditBulkPurchaseForm: React.FC<EditBulkPurchaseFormProps> = ({ initialData, onSuccess }) => {
  const { data, updateBulkDelivery } = useData();
  const form = useForm<z.infer<typeof editBulkPurchaseFormSchema>>({
    resolver: zodResolver(editBulkPurchaseFormSchema),
    defaultValues: {
      vendorId: initialData.vendorId,
      productId: initialData.productId,
      quantity: initialData.quantity,
      totalAmount: initialData.totalAmount,
      employeeId: initialData.employeeId,
    },
  });

  const onSubmit = (values: z.infer<typeof editBulkPurchaseFormSchema>) => {
    const updatedBulkDelivery: BulkDelivery = {
      ...initialData, // Keep original ID and date
      vendorId: values.vendorId,
      productId: values.productId,
      quantity: values.quantity,
      totalAmount: values.totalAmount,
      employeeId: values.employeeId || undefined,
    };

    try {
      updateBulkDelivery(initialData.id, updatedBulkDelivery);
      showSuccess("Bulk purchase updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to update bulk purchase.");
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
                  {data.products.filter(p => p.isBulk).map((product) => (
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
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Purchase Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
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

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
};

export default EditBulkPurchaseForm;