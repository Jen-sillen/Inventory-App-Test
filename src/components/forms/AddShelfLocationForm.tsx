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
import { ShelfLocation } from "@/types/inventory";

const shelfLocationFormSchema = z.object({
  id: z.string().min(1, { message: "Shelf Location ID is required." }),
  name: z.string().min(1, { message: "Shelf Location name is required." }),
  qrCode: z.string().min(1, { message: "QR Code is required." }),
});

interface AddShelfLocationFormProps {
  onSuccess?: () => void;
}

const AddShelfLocationForm: React.FC<AddShelfLocationFormProps> = ({ onSuccess }) => {
  const { addShelfLocation, data } = useData();
  const form = useForm<z.infer<typeof shelfLocationFormSchema>>({
    resolver: zodResolver(shelfLocationFormSchema),
    defaultValues: {
      id: "",
      name: "",
      qrCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof shelfLocationFormSchema>) => {
    if (data.shelfLocations.some(loc => loc.id === values.id)) {
      showError("Shelf Location with this ID already exists.");
      return;
    }
    const newShelfLocation: ShelfLocation = {
      id: values.id,
      name: values.name,
      qrCode: values.qrCode,
    };
    addShelfLocation(newShelfLocation);
    showSuccess("Shelf Location added successfully!");
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
              <FormLabel>Shelf Location ID</FormLabel>
              <FormControl>
                <Input placeholder="S001" {...field} />
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
              <FormLabel>Shelf Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Warehouse A - Shelf 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qrCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>QR Code</FormLabel>
              <FormControl>
                <Input placeholder="QR12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Shelf Location</Button>
      </form>
    </Form>
  );
};

export default AddShelfLocationForm;