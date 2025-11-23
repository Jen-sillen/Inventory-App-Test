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
import { useData } from "@/context/DataContext";
import { showSuccess, showError } from "@/utils/toast";
import { Vendor } from "@/types/inventory";

const vendorFormSchema = z.object({
  id: z.string().min(1, { message: "Vendor ID is required." }),
  name: z.string().min(1, { message: "Vendor name is required." }),
});

interface AddVendorFormProps {
  onSuccess?: () => void;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({ onSuccess }) => {
  const { addVendor, data } = useData();
  const form = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof vendorFormSchema>) => {
    if (data.vendors.some(vendor => vendor.id === values.id)) {
      showError("Vendor with this ID already exists.");
      return;
    }
    const newVendor: Vendor = {
      id: values.id,
      name: values.name,
    };
    addVendor(newVendor);
    showSuccess("Vendor added successfully!");
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor ID</FormLabel>
              <FormControl>
                <Input placeholder="V001" {...field} />
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
              <FormLabel>Vendor Name</FormLabel>
              <FormControl>
                <Input placeholder="Supplier Co." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Vendor</Button>
      </form>
    </Form>
  );
};

export default AddVendorForm;