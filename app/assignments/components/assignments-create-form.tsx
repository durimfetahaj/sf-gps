"use client";

import { createInventoryItem } from "@/app/actions/inventory";
import { InventoryItem, Vehicle, Worker } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Box,
  Check,
  ChevronsUpDown,
  Package,
  Users,
  Users2,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  assignmentSchema,
  AssignmentValues,
} from "@/lib/validators/assignment";
import {
  InventoryItemValues,
  inventoryItemSchema,
} from "@/lib/validators/inventory-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
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
  const [value, setValue] = useState("");

  const form = useForm<AssignmentValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { workerId: undefined, vehicleId: undefined, items: [] },
  });

  console.log({ values: form.getValues() });

  async function onSubmit(values: AssignmentValues) {
    try {
      console.log({ values });
      /*  await createInventoryItem(values); */
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
          <Tabs
            defaultValue="assign-inventory-item"
            className="w-full space-y-4"
          >
            <TabsList className="w-full">
              <TabsTrigger value="assign-inventory-item">
                <Package className="mr-2 h-4 w-4" />
                Assign Inventory Item
              </TabsTrigger>
              <TabsTrigger value="worker-to-vehicle">
                <Users className="mr-2 h-4 w-4" />
                Assign Worker to Vehicle
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assign-inventory-item" className="space-y-7">
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Inventory Item(s) & Quantities</FormLabel>
                    <FormControl>
                      <MultiSelectWithQuantity
                        options={inventory}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Search and select items..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <RadioGroup
                  value={selectedType} // controlled value
                  onValueChange={setSelectedType} // updates state
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
                                  ? workers.find(
                                      (worker) => worker.id === field.value
                                    )?.fullName
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
                                        onSelect={(currentValue) => {
                                          field.onChange(
                                            currentValue === field.value
                                              ? ""
                                              : currentValue
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        {worker.fullName}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value === worker.fullName
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
                                  ? vehicles.find(
                                      (vehicle) =>
                                        vehicle.licensePlate === field.value
                                    )?.licensePlate
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
                                        onSelect={(currentValue) => {
                                          field.onChange(
                                            currentValue === field.value
                                              ? ""
                                              : currentValue
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
            </TabsContent>
            <TabsContent value="worker-to-vehicle">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Current password</Label>
                    <Input id="tabs-demo-current" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">New password</Label>
                    <Input id="tabs-demo-new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

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
