// app/actions/vehicle.ts
"use server";

import prisma from "@/lib/prisma";
import { vehicleSchema } from "@/lib/validators/vehicle";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

export async function getVehicles() {
  const vehicle = await prisma.vehicle.findMany();

  return vehicle;
}

export async function createVehicle(data: VehicleFormValues) {
  const parsed = vehicleSchema.parse(data);

  const vehicle = await prisma.vehicle.create({
    data: {
      licensePlate: parsed.licensePlate,
      manufacturer: parsed.manufacturer,
      modelType: parsed.modelType,
      serialNumber: parsed.serialNumber,
      chassisNumber: parsed.chassisNumber,
      nextInspection: parsed.nextInspection
        ? new Date(parsed.nextInspection)
        : undefined,
      spCheck: parsed.spCheck ? new Date(parsed.spCheck) : undefined,
      uvvCheck: parsed.uvvCheck ? new Date(parsed.uvvCheck) : undefined,
      craneInspection: parsed.craneInspection
        ? new Date(parsed.craneInspection)
        : undefined,
      mileage: parsed.mileage,
      hasGps: parsed.hasGps,
      notes: parsed.notes,
    },
  });

  revalidatePath("/posts");

  return vehicle;
}
