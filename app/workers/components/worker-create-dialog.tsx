"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Vehicle } from "@/app/generated/prisma";
import { WorkerCreateForm } from "./worker-create-form";
import { Plus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export function WorkerCreateDialog({ vehicles }: { vehicles: Vehicle[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Worker
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Worker</DialogTitle>
          <DialogDescription>Add a new worker to your team.</DialogDescription>
        </DialogHeader>

        <WorkerCreateForm
          onSuccess={() => setOpen(false)}
          vehicles={vehicles}
        />
      </DialogContent>
    </Dialog>
  );
}
