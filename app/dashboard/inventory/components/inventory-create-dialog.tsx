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
          Element hinzufügen
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inventargegenstand hinzufügen</DialogTitle>
          <DialogDescription>
            Fügen Sie einen neuen Gegenstand zu Ihrem Inventar hinzu.
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
