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
import { WorkLogCreateForm } from "./work-log-create-form";
import { Vehicle } from "@/app/generated/prisma";

export function WorkLogCreateDialog({ vehicles }: { vehicles: Vehicle[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Work Log</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neues Arbeitsprotokoll</DialogTitle>
        </DialogHeader>

        <WorkLogCreateForm
          onSuccess={() => setOpen(false)}
          vehicles={vehicles}
        />
      </DialogContent>
    </Dialog>
  );
}
