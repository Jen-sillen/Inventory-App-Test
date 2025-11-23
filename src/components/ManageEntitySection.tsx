"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit } from 'lucide-react';

interface ManageEntitySectionProps<T> {
  title: string; // e.g., "Employees", "Products"
  data: T[];
  AddForm: React.ComponentType<{ onSuccess?: () => void }>;
  EditForm?: React.ComponentType<{ initialData: T; onSuccess?: () => void }>;
  renderItemCard: (item: T, handleEdit?: (item: T) => void) => React.ReactNode;
  emptyMessage: string;
  selectedItem: T | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Using a generic function component to allow type inference for T
function ManageEntitySection<T extends { id?: string; sku?: string }>(
  {
    title,
    data,
    AddForm,
    EditForm,
    renderItemCard,
    emptyMessage,
    selectedItem,
    setSelectedItem,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
  }: ManageEntitySectionProps<T>
) {
  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const singularTitle = title.endsWith('s') ? title.slice(0, -1) : title; // Simple plural to singular

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add {singularTitle}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New {singularTitle}</DialogTitle>
            </DialogHeader>
            <AddForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => renderItemCard(item, EditForm ? handleEdit : undefined))}
          </div>
        )}
      </CardContent>
      {EditForm && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {singularTitle}</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <EditForm
                initialData={selectedItem}
                onSuccess={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default ManageEntitySection;