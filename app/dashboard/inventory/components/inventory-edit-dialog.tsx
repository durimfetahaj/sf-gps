"use client";

import { InventoryItem } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { InventoryEditForm } from "./inventory-edit-form";
import { Pencil } from "lucide-react";

export function InventoryEditDialog({ item }: { item: InventoryItem }) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inventargegenstand hinzufügen</DialogTitle>
          <DialogDescription>
            Fügen Sie einen neuen Gegenstand zu Ihrem Inventar hinzu.
          </DialogDescription>
        </DialogHeader>

        <InventoryEditForm
          onSuccess={() => onClose()}
          onCancel={() => onClose()}
          item={item}
        />
      </DialogContent>
    </Dialog>
  );
}
