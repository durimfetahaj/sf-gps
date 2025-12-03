"use client";

import { WorkerFormValues, workerSchema } from "@/lib/validators/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createWorker } from "@/app/actions/workers";
import { Vehicle } from "@/app/generated/prisma";
import { DatePicker } from "@/components/date-picker";
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

export function WorkerCreateForm({
  onSuccess,
}: {
  onSuccess?: () => void;
  vehicles: Vehicle[];
}) {
  const form = useForm<WorkerFormValues>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      hourlyRate: 0,
      employmentStart: new Date(),
    },
  });

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vollständiger Name</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="maximilian@sfbaugmbh.de"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="number" placeholder="123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="25"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum des Beschäftigungsbeginns</FormLabel>
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

        <div className="flex justify-end pt-4">
          <Button type="submit">Treiber erstellen</Button>
        </div>
      </form>
    </Form>
  );
}
