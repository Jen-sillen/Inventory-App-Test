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
import { Dealer } from "@/types/inventory";

const dealerFormSchema = z.object({
  id: z.string().min(1, { message: "Dealer ID is required." }),
  passcode: z.string().min(4, { message: "Passcode must be at least 4 characters." }),
  name: z.string().min(1, { message: "Dealer name is required." }),
});

interface AddDealerFormProps {
  onSuccess?: () => void;
}

const AddDealerForm: React.FC<AddDealerFormProps> = ({ onSuccess }) => {
  const { addDealer, data } = useData();
  const form = useForm<z.infer<typeof dealerFormSchema>>({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      id: "",
      passcode: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof dealerFormSchema>) => {
    if (data.dealers.some(dealer => dealer.id === values.id)) {
      showError("Dealer with this ID already exists.");
      return;
    }
    const newDealer: Dealer = {
      id: values.id,
      passcode: values.passcode,
      name: values.name,
    };
    addDealer(newDealer);
    showSuccess("Dealer added successfully!");
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
              <FormLabel>Dealer ID</FormLabel>
              <FormControl>
                <Input placeholder="D001" {...field} />
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
              <FormLabel>Dealer Name</FormLabel>
              <FormControl>
                <Input placeholder="Wholesale Customer Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Dealer</Button>
      </form>
    </Form>
  );
};

export default AddDealerForm;