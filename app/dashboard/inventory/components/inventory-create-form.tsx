"use client";

import { createInventoryItem } from "@/app/actions/inventory";
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
import {
  InventoryItemValues,
  inventoryItemSchema,
} from "@/lib/validators/inventory-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function InventoryCreateForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm<InventoryItemValues>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });

  async function onSubmit(values: InventoryItemValues) {
    try {
      await createInventoryItem(values);
      toast.success("Inventargegenstand erfolgreich hinzugefügt!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Inventargegenstand konnte nicht hinzugefügt werden!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Handschuhe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menge des Gegenstands</FormLabel>
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
        />

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
