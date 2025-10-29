import { z } from "zod";

export const workLogSchema = z.object({
  vehicleId: z.string().nonempty("Vehicle is required"),
  driverId: z.string().optional(),
  gpsStartTime: z.string().min(1, "GPS start time is required"), // ISO string
  gpsEndTime: z.string().min(1, "GPS end time is required"), // ISO string
  breakTime: z.string().optional(),
  reportStartTime: z.string().min(1, "Report start time is required"), // ISO string
  reportEndTime: z.string().min(1, "Report end time is required"), // ISO string
  comment: z.string().optional(),
  km: z.number().optional(),
  date: z.date().min(1, "Date is required"), // ISO string
});

export type WorkLogFormValues = z.infer<typeof workLogSchema>;
