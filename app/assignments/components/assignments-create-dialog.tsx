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
import { AssignmentsCreateForm } from "./assignments-create-form";
import { InventoryItem, Vehicle, Worker } from "@/app/generated/prisma";
import { Test } from "./test";

export function AssignmentsCreateDialog({
  vehicles,
  workers,
  inventory,
}: {
  vehicles: Vehicle[];
  workers: Worker[];
  inventory: InventoryItem[];
}) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New Assignment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Assignment</DialogTitle>
          <DialogDescription>
            Assign items to a worker, vehicle, or both.
          </DialogDescription>
        </DialogHeader>

        <AssignmentsCreateForm
          onSuccess={() => onClose()}
          onCancel={() => onClose()}
          vehicles={vehicles}
          workers={workers}
          inventory={inventory}
        />
      </DialogContent>
    </Dialog>
  );
}
