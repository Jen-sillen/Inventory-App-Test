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

interface AddEmployeeFormProps {
  onSuccess?: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onSuccess }) => {
  const { addEmployee, data } = useData();
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      id: "",
      passcode: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof employeeFormSchema>) => {
    if (data.employees.some(emp => emp.id === values.id)) {
      showError("Employee with this ID already exists.");
      return;
    }
    const newEmployee: Employee = {
      id: values.id,
      passcode: values.passcode,
      name: values.name,
    };
    addEmployee(newEmployee);
    showSuccess("Employee added successfully!");
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
        <Button type="submit" className="w-full">Add Employee</Button>
      </form>
    </Form>
  );
};

export default AddEmployeeForm;