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
  locationId: z.string().optional(),
});

interface AddProductFormProps {
  onSuccess?: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSuccess }) => {
  const { addProduct, data } = useData();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      sku: "",
      name: "",
      size: "",
      isBulk: false,
      quantity: 0,
      locationId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    if (data.products.some(product => product.sku === values.sku)) {
      showError("Product with this SKU already exists.");
      return;
    }
    const newProduct: Product = {
      sku: values.sku,
      name: values.name,
      size: values.size,
      isBulk: values.isBulk,
      quantity: values.quantity,
      locationId: values.locationId || undefined,
    };
    addProduct(newProduct);
    showSuccess("Product added successfully!");
    form.reset();
    onSuccess?.();
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
              <FormLabel>Initial Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
              <FormLabel>Initial Location ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="S001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Product</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;