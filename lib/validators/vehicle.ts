import { z } from "zod";

export const vehicleSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required"),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
  nextInspection: z.string().optional(),
  spCheck: z.string().optional(),
  uvvCheck: z.string().optional(),
  craneInspection: z.string().optional(),
  mileage: z.number().optional(),
  hasGps: z.boolean().optional(),
  notes: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;
