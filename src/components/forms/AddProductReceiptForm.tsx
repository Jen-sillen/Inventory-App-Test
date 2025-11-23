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
import { ProductReceipt } from "@/types/inventory";

const productReceiptFormSchema = z.object({
  vendorId: z.string().nullable().optional(), // Allow null for optional
  productId: z.string().min(1, { message: "Product is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  employeeId: z.string().nullable().optional(), // Allow null for optional
  toLocationId: z.string().min(1, { message: "Delivery location is required." }),
});

interface AddProductReceiptFormProps {
  onSuccess?: () => void;
}

const AddProductReceiptForm: React.FC<AddProductReceiptFormProps> = ({ onSuccess }) => {
  const { data, addProductReceipt } = useData();
  const form = useForm<z.infer<typeof productReceiptFormSchema>>({
    resolver: zodResolver(productReceiptFormSchema),
    defaultValues: {
      vendorId: undefined, // Set default to undefined for optional field
      productId: "",
      quantity: 1,
      employeeId: undefined, // Set default to undefined for optional field
      toLocationId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productReceiptFormSchema>) => {
    const newProductReceipt: ProductReceipt = {
      id: `RECEIPT-${Date.now()}`, // Simple unique ID
      vendorId: values.vendorId || undefined,
      productId: values.productId,
      quantity: values.quantity,
      date: new Date().toISOString(),
      employeeId: values.employeeId || undefined,
      toLocationId: values.toLocationId,
    };

    try {
      addProductReceipt(newProductReceipt);
      showSuccess("Product delivery tracked successfully!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to track product delivery.");
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
              <FormLabel>Vendor (Optional)</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === "null-vendor" ? undefined : value)}
                value={field.value || "null-vendor"} // Display "No Vendor" if field.value is undefined
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null-vendor">No Vendor</SelectItem> {/* Use non-empty string value */}
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
              <FormLabel>Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.products.map((product) => ( // Show all products
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
              <FormLabel>Quantity Received</FormLabel>
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
              <Select
                onValueChange={(value) => field.onChange(value === "null-employee" ? undefined : value)}
                value={field.value || "null-employee"} // Display "No Employee" if field.value is undefined
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null-employee">No Employee</SelectItem> {/* Use non-empty string value */}
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

        <FormField
          control={form.control}
          name="toLocationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a shelf location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.shelfLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} ({location.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Track Delivery</Button>
      </form>
    </Form>
  );
};

export default AddProductReceiptForm;