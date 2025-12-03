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
  const [mode, setMode] = useState<"worker" | "vehicle">("worker");
  const [vehicleChoice, setVehicleChoice] = useState<
    "worker" | "inventory" | null
  >(null);
  const [selectedItems, setSelectedItems] = useState<
    Record<string, { quantity: number; assignedTo: "worker" | "vehicle" }>
  >({});

  const form = useForm<AssignmentValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { workerId: null, vehicleId: null, items: [] },
  });

  const handleItemToggle = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => ({
        ...prev,
        [itemId]: {
          quantity: 1,
          assignedTo: mode === "worker" ? "worker" : "vehicle",
        },
      }));
    } else {
      setSelectedItems((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantity },
    }));
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-6">
          <div>
            <Label>Assign To</Label>
            <div className="flex gap-4 mt-2">
              {["worker", "vehicle"].map((m) => (
                <div
                  key={m}
                  className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
                    mode === m
                      ? "border-primary bg-orange-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setMode(m as "worker" | "vehicle");
                    setVehicleChoice(null);
                    setSelectedItems({});
                    form.reset();
                  }}
                >
                  {m === "worker" ? "Worker" : "Vehicle"}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Vehicle secondary choice */}
          {mode === "vehicle" && (
            <div>
              <Label>Assign Vehicle To</Label>
              <div className="flex gap-4 mt-2">
                {["worker", "inventory"].map((choice) => (
                  <div
                    key={choice}
                    className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
                      vehicleChoice === choice
                        ? "border-primary bg-orange-50"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setVehicleChoice(choice as "worker" | "inventory")
                    }
                  >
                    {choice === "worker" ? "Worker" : "Inventory Items"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Worker Mode */}
          {mode === "worker" && (
            /*  <div className="space-y-2">
            <Label htmlFor="worker">Worker</Label>
            <Select value={workerId} onValueChange={setWorkerId} required>
              <SelectTrigger id="worker">
                <SelectValue placeholder="Select worker" />
              </SelectTrigger>
              <SelectContent>
                {workers.map((worker) => (
                  <SelectItem key={worker.id} value={worker.id}>
                    {worker.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="workerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Worker</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a worker" />
                        </SelectTrigger>
                        <SelectContent>
                          {workers.map((worker) => (
                            <SelectItem key={worker.id} value={worker.id}>
                              {worker.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Inventory Items</Label>
                <div className="border border-border rounded-md p-3 space-y-3 max-h-48 overflow-y-auto">
                  {inventory.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.id in selectedItems}
                          onCheckedChange={(checked) =>
                            handleItemToggle(item.id, checked as boolean)
                          }
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`item-${item.id}`}
                            className="text-sm cursor-pointer block"
                          >
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              ({item.quantity} available)
                            </span>
                            {/* {item.isConsumable && (
                            <span className="ml-2 text-xs bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded">
                              Consumable
                            </span>
                          )} */}
                          </label>
                        </div>
                        {item.id in selectedItems && (
                          <Input
                            type="number"
                            min="1"
                            max={item.quantity}
                            value={selectedItems[item.id].quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            className="w-20 h-8"
                          />
                        )}
                      </div>

                      {/* {item.id in selectedItems && assignmentMode === "both" && (
                      <div className="ml-8 space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Assign to:
                        </Label>
                        <RadioGroup
                          value={selectedItems[item.id].assignedTo}
                          onValueChange={(value) =>
                            handleAssignedToChange(
                              item.id,
                              value as "worker" | "vehicle" | "both"
                            )
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="worker"
                              id={`${item.id}-worker`}
                            />
                            <Label
                              htmlFor={`${item.id}-worker`}
                              className="cursor-pointer font-normal text-xs"
                            >
                              Worker
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="vehicle"
                              id={`${item.id}-vehicle`}
                            />
                            <Label
                              htmlFor={`${item.id}-vehicle`}
                              className="cursor-pointer font-normal text-xs"
                            >
                              Vehicle
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="both"
                              id={`${item.id}-both`}
                            />
                            <Label
                              htmlFor={`${item.id}-both`}
                              className="cursor-pointer font-normal text-xs"
                            >
                              Both
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )} */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === "vehicle" && vehicleChoice === "worker" && (
            <div className="mt-4">
              <FormField
                control={form.control}
                name="workerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Worker for Vehicle</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select worker" />
                        </SelectTrigger>
                        <SelectContent>
                          {workers.map((w) => (
                            <SelectItem key={w.id} value={w.id}>
                              {w.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
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

        <div className="flex justify-end gap-2.5 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Item</Button>
        </div>
      </form>
    </Form>
  );
}
