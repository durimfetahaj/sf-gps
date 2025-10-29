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
import { DriverCreateForm } from "./driver-create-form";
import { Vehicle } from "@/app/generated/prisma";

export function DriverCreateDialog({ vehicles }: { vehicles: Vehicle[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Driver</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neuen Treiber hinzufügen</DialogTitle>
        </DialogHeader>

        <DriverCreateForm
          onSuccess={() => setOpen(false)}
          vehicles={vehicles}
        />
      </DialogContent>
    </Dialog>
  );
}
