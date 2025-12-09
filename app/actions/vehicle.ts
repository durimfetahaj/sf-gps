// app/actions/vehicle.ts
"use server";

import prisma from "@/lib/prisma";
import { vehicleSchema } from "@/lib/validators/vehicle";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

export async function getVehicles() {
  const vehicle = await prisma.vehicle.findMany({ include: { driver: true } });

  return vehicle;
}

export async function getAvailableVehicles() {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      driverId: null,
    },
  });

  return vehicles;
}

export async function createVehicle(data: VehicleFormValues) {
  const parsed = vehicleSchema.parse(data);

  const vehicle = await prisma.vehicle.create({
    data: {
      licensePlate: parsed.licensePlate,
      manufacturer: parsed.manufacturer,
      model: parsed.model,
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
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/assignments");

  return vehicle;
}

export async function getVehicleById(id: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { driver: true },
    });
    return vehicle;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
}
