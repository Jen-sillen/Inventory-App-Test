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
import { InventoryMovement } from "@/types/inventory";

const moveInventoryFormSchema = z.object({
  productId: z.string().min(1, { message: "Product is required." }),
  fromLocationId: z.string().optional(), // Can be empty if product has no current location
  toLocationId: z.string().min(1, { message: "Destination location is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  employeeId: z.string().min(1, { message: "Employee is required." }),
});

interface MoveInventoryFormProps {
  onSuccess?: () => void;
}

const MoveInventoryForm: React.FC<MoveInventoryFormProps> = ({ onSuccess }) => {
  const { data, addInventoryMovement } = useData();
  const form = useForm<z.infer<typeof moveInventoryFormSchema>>({
    resolver: zodResolver(moveInventoryFormSchema),
    defaultValues: {
      productId: "",
      fromLocationId: "",
      toLocationId: "",
      quantity: 1,
      employeeId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof moveInventoryFormSchema>) => {
    const newMovement: InventoryMovement = {
      id: `MOVE-${Date.now()}`, // Simple unique ID
      productId: values.productId,
      fromLocationId: values.fromLocationId || undefined,
      toLocationId: values.toLocationId,
      quantity: values.quantity,
      date: new Date().toISOString(),
      employeeId: values.employeeId,
    };

    try {
      addInventoryMovement(newMovement);
      showSuccess("Inventory moved successfully!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to move inventory.");
    }
  };

  // Filter products that have a location or are generally available
  const availableProducts = data.products.filter(p => p.quantity > 0);

  // Get current location of selected product for 'fromLocationId' default
  const selectedProduct = form.watch('productId');
  const productCurrentLocation = data.products.find(p => p.sku === selectedProduct)?.locationId;

  React.useEffect(() => {
    if (selectedProduct && productCurrentLocation) {
      form.setValue('fromLocationId', productCurrentLocation);
    } else if (selectedProduct && !productCurrentLocation) {
      form.setValue('fromLocationId', ''); // Clear if product has no location
    }
  }, [selectedProduct, productCurrentLocation, form]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  {availableProducts.map((product) => (
                    <SelectItem key={product.sku} value={product.sku}>
                      {product.name} ({product.sku}) - Qty: {product.quantity}
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
              <FormLabel>Quantity to Move</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fromLocationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From Location (Current)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current location (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">No specific location</SelectItem> {/* Option for products without a set location */}
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

        <FormField
          control={form.control}
          name="toLocationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To Location (Destination)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination location" />
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

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
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

        <Button type="submit" className="w-full">Record Inventory Movement</Button>
      </form>
    </Form>
  );
};

export default MoveInventoryForm;