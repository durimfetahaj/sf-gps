"use client";

import { WorkerFormValues, workerSchema } from "@/lib/validators/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createWorker } from "@/app/actions/workers";
import { Vehicle } from "@/app/generated/prisma";
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
import { toast } from "sonner";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export function WorkerCreateForm({
  onSuccess,
  vehicles,
}: {
  onSuccess?: () => void;
  vehicles: Vehicle[];
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<WorkerFormValues>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      fullName: "",
      vehicleId: undefined,
    },
  });

  const isPending = form.formState.isSubmitting;

  async function onSubmit(values: WorkerFormValues) {
    try {
      await createWorker(values);
      toast.success("Driver created successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);

      alert("Failed to create vehicle");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vollständiger Name</FormLabel>
              <FormControl>
                <Input placeholder="Maximilian Müller" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ziel-Fahrzeug auswählen</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      {field.value
                        ? vehicles.find((v) => v.id === field.value)
                            ?.licensePlate
                        : "Fahrzeug auswählen..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Fahrzeug suchen..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Kein Fahrzeug gefunden.</CommandEmpty>
                        <CommandGroup>
                          {vehicles.map((vehicle) => (
                            <CommandItem
                              key={vehicle.id}
                              value={vehicle.licensePlate}
                              onSelect={() => {
                                form.setValue("vehicleId", undefined);
                                field.onChange(
                                  field.value === vehicle.id ? "" : vehicle.id
                                );
                                setOpen(false);
                              }}
                            >
                              {vehicle.licensePlate}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value === vehicle.licensePlate
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-2" />}
            {isPending ? "Hinzufügen..." : "Neu hinzufügen"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
