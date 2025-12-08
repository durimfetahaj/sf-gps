"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { InventoryCreateForm } from "./inventory-create-form";

export function InventoryCreateDialog() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Inventory Item</DialogTitle>
          <DialogDescription>
            Add a new item to your inventory.
          </DialogDescription>
        </DialogHeader>

        <InventoryCreateForm
          onSuccess={() => onClose()}
          onCancel={() => onClose()}
        />
      </DialogContent>
    </Dialog>
  );
}
