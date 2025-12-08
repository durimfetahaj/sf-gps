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
          Arbeiter hinzufügen
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Arbeiter hinzufügen</DialogTitle>
          <DialogDescription>
            Fügen Sie einen neuen Mitarbeiter zu Ihrem Team hinzu.
          </DialogDescription>
        </DialogHeader>

        <WorkerCreateForm
          onSuccess={() => setOpen(false)}
          vehicles={vehicles}
        />
      </DialogContent>
    </Dialog>
  );
}
