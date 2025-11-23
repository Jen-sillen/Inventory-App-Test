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
import { SaleTransaction } from "@/types/inventory";
import { PlusCircle, Trash2 } from "lucide-react";

const productSaleSchema = z.object({
  sku: z.string().min(1, { message: "Product SKU is required." }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
});

const editSaleFormSchema = z.object({
  dealerId: z.string().min(1, { message: "Dealer is required." }),
  employeeId: z.string().min(1, { message: "Employee is required." }),
  productsSold: z.array(productSaleSchema).min(1, { message: "At least one product must be added." }),
});

interface EditSaleFormProps {
  initialData: SaleTransaction;
  onSuccess?: () => void;
}

const EditSaleForm: React.FC<EditSaleFormProps> = ({ initialData, onSuccess }) => {
  const { data, updateSaleTransaction } = useData();
  const form = useForm<z.infer<typeof editSaleFormSchema>>({
    resolver: zodResolver(editSaleFormSchema),
    defaultValues: {
      dealerId: initialData.dealerId,
      employeeId: initialData.employeeId,
      productsSold: initialData.productsSold,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productsSold",
  });

  const onSubmit = (values: z.infer<typeof editSaleFormSchema>) => {
    const totalAmount = values.productsSold.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const updatedSale: SaleTransaction = {
      ...initialData, // Keep original ID and date
      dealerId: values.dealerId,
      employeeId: values.employeeId,
      productsSold: values.productsSold,
      totalAmount: totalAmount,
    };

    try {
      updateSaleTransaction(initialData.id, updatedSale);
      showSuccess("Sale updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to update sale.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="dealerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dealer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dealer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.name} ({dealer.id})
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

        <div className="space-y-4 border p-4 rounded-md">
          <h3 className="text-lg font-semibold">Products Sold</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <FormField
                control={form.control}
                name={`productsSold.${index}.sku`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product SKU</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.products.filter(p => !p.isBulk).map((product) => (
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
                name={`productsSold.${index}.quantity`}
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
              <FormField
                control={form.control}
                name={`productsSold.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per unit</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
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
            onClick={() => append({ sku: "", quantity: 1, price: 0 })}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
};

export default EditSaleForm;