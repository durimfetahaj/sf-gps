import { z } from "zod";

export const driverSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  vehicleId: z.string().min(1, "Driver ID is required"),
  employmentStart: z.date({ error: "Employment start date is required" }),
});

export type DriverFormValues = z.infer<typeof driverSchema>;
