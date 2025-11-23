"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { BulkBreaking } from "@/types/inventory";
import { PlusCircle, Trash2 } from "lucide-react";

const brokenIntoProductSchema = z.object({
  sku: z.string().min(1, { message: "Product SKU is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
});

const breakBulkProductFormSchema = z.object({
  bulkProductId: z.string().min(1, { message: "Bulk product is required." }),
  quantityToBreak: z.coerce.number().min(1, { message: "Quantity to break must be at least 1." }),
  brokenIntoProducts: z.array(brokenIntoProductSchema).min(1, { message: "At least one resulting product must be added." }),
  employeeId: z.string().min(1, { message: "Employee is required." }),
});

interface BreakBulkProductFormProps {
  onSuccess?: () => void;
}

const BreakBulkProductForm: React.FC<BreakBulkProductFormProps> = ({ onSuccess }) => {
  const { data, addBulkBreaking } = useData();
  const form = useForm<z.infer<typeof breakBulkProductFormSchema>>({
    resolver: zodResolver(breakBulkProductFormSchema),
    defaultValues: {
      bulkProductId: "",
      quantityToBreak: 1,
      brokenIntoProducts: [{ sku: "", quantity: 1 }],
      employeeId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "brokenIntoProducts",
  });

  const onSubmit = (values: z.infer<typeof breakBulkProductFormSchema>) => {
    const newBulkBreaking: BulkBreaking = {
      id: `BREAK-${Date.now()}`, // Simple unique ID
      bulkProductId: values.bulkProductId,
      brokenIntoProducts: values.brokenIntoProducts,
      date: new Date().toISOString(),
      employeeId: values.employeeId,
    };

    try {
      addBulkBreaking(newBulkBreaking);
      showSuccess("Bulk product broken down successfully!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to break down bulk product.");
    }
  };

  // Filter for bulk products only
  const bulkProducts = data.products.filter(p => p.isBulk);
  // Filter for non-bulk products only (for the resulting items)
  const sellableProducts = data.products.filter(p => !p.isBulk);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bulkProductId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bulk Product to Break</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bulk product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bulkProducts.map((product) => (
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
          name="quantityToBreak"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity of Bulk Product to Break</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 border p-4 rounded-md">
          <h3 className="text-lg font-semibold">Resulting Sellable Products</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <FormField
                control={form.control}
                name={`brokenIntoProducts.${index}.sku`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product SKU</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sellable product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sellableProducts.map((product) => (
                          <SelectItem key={product.sku} value={product.sku}>
                            {product.name} ({product.sku})
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
                name={`brokenIntoProducts.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="self-end"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ sku: "", quantity: 1 })}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Resulting Product
          </Button>
        </div>

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

        <Button type="submit" className="w-full">Break Down Product</Button>
      </form>
    </Form>
  );
};

export default BreakBulkProductForm;