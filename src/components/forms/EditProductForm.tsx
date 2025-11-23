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
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/context/DataContext";
import { showSuccess, showError } from "@/utils/toast";
import { Product } from "@/types/inventory";

const productFormSchema = z.object({
  sku: z.string().min(1, { message: "Product SKU is required." }),
  name: z.string().min(1, { message: "Product name is required." }),
  size: z.string().min(1, { message: "Product size is required." }),
  isBulk: z.boolean().default(false),
  quantity: z.coerce.number().min(0, { message: "Quantity cannot be negative." }).default(0),
  cost: z.coerce.number().min(0, { message: "Cost cannot be negative." }).default(0),
  locationId: z.string().optional(),
});

interface EditProductFormProps {
  initialData: Product;
  onSuccess?: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ initialData, onSuccess }) => {
  const { updateProduct, data } = useData();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    // Check if new SKU conflicts with existing products (excluding the current one)
    if (values.sku !== initialData.sku && data.products.some(prod => prod.sku === values.sku)) {
      showError("Product with this new SKU already exists.");
      return;
    }

    const updatedProduct: Product = {
      sku: values.sku,
      name: values.name,
      size: values.size,
      isBulk: values.isBulk,
      quantity: values.quantity,
      cost: values.cost,
      locationId: values.locationId || undefined,
    };

    try {
      updateProduct(initialData.sku, updatedProduct);
      showSuccess("Product updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to update product.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product SKU</FormLabel>
              <FormControl>
                <Input placeholder="PROD001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Widget A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size/Package Type</FormLabel>
              <FormControl>
                <Input placeholder="Small Package" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isBulk"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Bulk Product?</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Check if this product is a bulk item that can be broken down.
                </p>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost per Unit</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="S001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
};

export default EditProductForm;