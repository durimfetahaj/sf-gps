// components/vehicles/vehicle-create-form.tsx
"use client";

import { VehicleFormValues, vehicleSchema } from "@/lib/validators/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createVehicle } from "@/app/actions/vehicle";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function VehicleCreateForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      licensePlate: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      chassisNumber: "",
      mileage: 0,
      hasGps: false,
      notes: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  async function onSubmit(values: VehicleFormValues) {
    try {
      await createVehicle(values);
      toast.success("Vehicle created successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);

      toast.error("Failed to create vehicle");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kennzeichen</FormLabel>
              <FormControl>
                <Input placeholder="LIP-SF 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Herstellerin</FormLabel>
              <FormControl>
                <Input placeholder="Mercedes, Volvo..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelltyp</FormLabel>
              <FormControl>
                <Input placeholder="Actros, FH16..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seriennummer</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Seriennumer" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chassisNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fahrgestellnummer (FIN)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="FIN" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilometerstand (km)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="100,000"
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasGps"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Hat GPS?</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notizen</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional remarks..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-2" />}
            {isPending ? "Hinzufügen..." : "Fahrzeug erstellen"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
