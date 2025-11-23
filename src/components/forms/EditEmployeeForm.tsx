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
import { Employee } from "@/types/inventory";

const employeeFormSchema = z.object({
  id: z.string().min(1, { message: "Employee ID is required." }),
  passcode: z.string().min(4, { message: "Passcode must be at least 4 characters." }),
  name: z.string().min(1, { message: "Employee name is required." }),
});

interface EditEmployeeFormProps {
  initialData: Employee;
  onSuccess?: () => void;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ initialData, onSuccess }) => {
  const { updateEmployee, data } = useData();
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: z.infer<typeof employeeFormSchema>) => {
    // Check if new ID conflicts with existing employees (excluding the current one)
    if (values.id !== initialData.id && data.employees.some(emp => emp.id === values.id)) {
      showError("Employee with this new ID already exists.");
      return;
    }
    
    const updatedEmployee: Employee = {
      id: values.id,
      passcode: values.passcode,
      name: values.name,
    };
    
    try {
      updateEmployee(initialData.id, updatedEmployee);
      showSuccess("Employee updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      showError(error.message || "Failed to update employee.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="E001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
              <FormControl>
                <Input type="password" placeholder="****" {...field} />
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
              <FormLabel>Employee Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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

export default EditEmployeeForm;