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
import { Device } from "@/types/inventory";

const deviceFormSchema = z.object({
  id: z.string().min(1, { message: "Device ID is required." }),
  name: z.string().min(1, { message: "Device name is required." }),
});

interface AddDeviceFormProps {
  onSuccess?: () => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSuccess }) => {
  const { addDevice, data } = useData();
  const form = useForm<z.infer<typeof deviceFormSchema>>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof deviceFormSchema>) => {
    if (data.devices.some(device => device.id === values.id)) {
      showError("Device with this ID already exists.");
      return;
    }
    const newDevice: Device = {
      id: values.id,
      name: values.name,
    };
    addDevice(newDevice);
    showSuccess("Device added successfully!");
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
              <FormLabel>Device ID</FormLabel>
              <FormControl>
                <Input placeholder="DEV001" {...field} />
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
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="Scanner 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Device</Button>
      </form>
    </Form>
  );
};

export default AddDeviceForm;