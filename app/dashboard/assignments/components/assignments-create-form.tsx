"use client";

import { createAssignment } from "@/app/actions/assignment";
import { InventoryItem, Vehicle, Worker } from "@/app/generated/prisma";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  assignmentSchema,
  AssignmentValues,
} from "@/lib/validators/assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MultiSelectWithQuantity } from "./multi-select-with-quantity";

export function AssignmentsCreateForm({
  onSuccess,
  onCancel,
  vehicles,
  workers,
  inventory,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
  vehicles: Vehicle[];
  workers: Worker[];
  inventory: InventoryItem[];
}) {
  const [selectedType, setSelectedType] = useState<"worker" | "vehicle">(
    "worker"
  );

  const [open, setOpen] = useState(false);

  const form = useForm<AssignmentValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      assignedAt: new Date(),
      workerId: undefined,
      vehicleId: undefined,
      items: [],
    },
  });

  async function onSubmit(values: AssignmentValues) {
    try {
      await createAssignment(values);
      toast.success("Assignment Added successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to create Assignment");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="assignedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignation Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Wählen Sie ein Datum aus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <MultiSelectWithQuantity
                options={inventory}
                value={field.value ?? []}
                onValueChange={field.onChange}
                placeholder="Search and select items..."
              />
            )}
          />

          <div className="space-y-4">
            <RadioGroup
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as "worker" | "vehicle")
              }
              className="flex"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="worker" id="r1" />
                <Label htmlFor="r1">Worker</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="vehicle" id="r3" />
                <Label htmlFor="r3">Vehicle</Label>
              </div>
            </RadioGroup>

            {/* Example: Conditional UI based on selected radio */}
            {selectedType === "worker" && (
              <FormField
                control={form.control}
                name="workerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Target Worker</FormLabel>
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
                              ? workers.find((w) => w.id === field.value)
                                  ?.fullName
                              : "Select Worker"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start">
                          <Command>
                            <CommandInput
                              placeholder="Search workers..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No worker found.</CommandEmpty>
                              <CommandGroup>
                                {workers.map((worker) => (
                                  <CommandItem
                                    key={worker.id}
                                    value={worker.fullName}
                                    onSelect={() => {
                                      form.setValue("vehicleId", undefined);
                                      field.onChange(
                                        field.value === worker.id
                                          ? ""
                                          : worker.id
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    {worker.fullName}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value === worker.id
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
            )}

            {selectedType === "vehicle" && (
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Target Vehicle</FormLabel>
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
                              : "Select Vehicle..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start">
                          <Command>
                            <CommandInput
                              placeholder="Search vehicle..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No vehicle found.</CommandEmpty>
                              <CommandGroup>
                                {vehicles.map((vehicle) => (
                                  <CommandItem
                                    key={vehicle.id}
                                    value={vehicle.licensePlate}
                                    onSelect={() => {
                                      form.setValue("workerId", undefined);
                                      field.onChange(
                                        field.value === vehicle.id
                                          ? ""
                                          : vehicle.id
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
            )}
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="10"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
}
