// components/vehicles/vehicle-create-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { WorkLogFormValues, workLogSchema } from "@/lib/validators/work-log";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createWorkLog } from "@/app/actions/workLog";

export function WorkLogCreateForm({
  onSuccess,
  vehicles,
}: {
  onSuccess?: () => void;
  vehicles: Vehicle[];
}) {
  const form = useForm<WorkLogFormValues>({
    resolver: zodResolver(workLogSchema),
    defaultValues: {
      vehicleId: "",
      gpsStartTime: "07:30",
      gpsEndTime: "17:00",
      breakTime: "01:00",
      reportStartTime: "07:30",
      reportEndTime: "17:00",
      date: new Date(),
      comment: "",
      km: "",
    },
  });

  async function onSubmit(values: WorkLogFormValues) {
    const selectedVehicle = vehicles.find((v) => v.id === values.vehicleId);

    if (!selectedVehicle) {
      alert("Selected vehicle not found");
      return;
    }

    try {
      const data = {
        ...values,
        driverId: selectedVehicle.driverId,
      };

      await createWorkLog(data);
      toast.success("Work log created successfully!");
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
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum des Arbeitsprotokolls</FormLabel>
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
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fahrzeug</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wählen Sie ein Fahrzeug aus" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.licensePlate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 ">
          <FormField
            control={form.control}
            name="gpsStartTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>GPS-Startzeit</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    id="gps-start-time-picker"
                    step="60"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gpsEndTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>GPS-Endzeit</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    id="gps-end-time-picker"
                    step="60"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 ">
          <FormField
            control={form.control}
            name="reportStartTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tagesbericht Startzeit</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    id="report-start-time-picker"
                    step="60"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportEndTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tagesbericht Endzeit</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    id="report-end-time-picker"
                    step="60"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="breakTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Pausenzeit</FormLabel>
              <FormControl>
                <Input id="break-time-picker" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="km"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Kilometerstand</FormLabel>
              <FormControl>
                <Input
                  /*   type="number"
                  inputMode="numeric"
                  min={0}
                  step={1} */
                  type="text" // allows commas/dots
                  inputMode="numeric" // numeric keyboard
                  className="w-full"
                  placeholder="Kilometerstand"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*   <FormField
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
 */}
        {/*  <FormField
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
        /> */}

        {/* <FormField
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
        /> */}

        {/* <FormField
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
        /> */}

        {/*  <FormField
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
 */}
        <div className="flex justify-end pt-4">
          <Button type="submit">Fahrzeug erstellen</Button>
        </div>
      </form>
    </Form>
  );
}
