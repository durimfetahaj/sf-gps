import { z } from "zod";

export const workLogSchema = z.object({
  driverId: z.string().min(1, "Driver is required"),
  vehicleId: z.string().optional(),
  foreman: z.string().min(1, "Foreman is required"),
  gpsStartTime: z.string().min(1, "GPS start time is required"), // ISO string
  gpsEndTime: z.string().min(1, "GPS end time is required"), // ISO string
  breakTime: z.number().int().nonnegative("Break time must be >= 0"),
  reportStartTime: z.string().min(1, "Report start time is required"), // ISO string
  reportEndTime: z.string().min(1, "Report end time is required"), // ISO string
  reportBreak: z.number().int().nonnegative("Report break must be >= 0"),
  comment: z.string().optional(),
  km: z.number().positive("KM must be positive").optional(),
  date: z.string().min(1, "Date is required"), // ISO string
});

export type WorkLogFormValues = z.infer<typeof workLogSchema>;
