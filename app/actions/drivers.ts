"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDrivers() {
  const drivers = await prisma.driver.findMany({
    include: { vehicles: true, workLogs: true },
  });

  return drivers;
}

export async function getDriverById(driverId: string) {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    include: {
      vehicles: true,
      workLogs: {
        select: {
          id: true,
          vehicleId: true,
          driverId: true,
          gpsStartTime: true,
          gpsEndTime: true,
          reportStartTime: true,
          reportEndTime: true,
          breakTime: true,
          difference: true,
          comment: true,
          km: true,
          date: true,
          createdAt: true,
          updatedAt: true,
          vehicle: {
            select: {
              licensePlate: true, // <-- add this
            },
          },
        },
      },
    },
  });

  if (!driver) {
    throw new Error(`Driver with ID ${driverId} not found`);
  }

  return driver;
}

export async function createDriver(data: {
  fullName: string;
  vehicleId?: string;
  employmentStart?: Date;
}) {
  const newDriver = await prisma.driver.create({
    data: {
      fullName: data.fullName,
      employmentStart: data.employmentStart,
    },
  });

  if (data.vehicleId) {
    await prisma.vehicle.update({
      where: { id: data.vehicleId },
      data: { driverId: newDriver.id },
    });
  }

  revalidatePath("/dashboard");

  return newDriver;
}

export async function deleteDriver(id: string) {
  // check if driver exists
  const driver = await getDriverById(id);

  if (!driver) {
    throw new Error("Driver not found");
  }

  await prisma.driver.delete({
    where: { id },
  });

  revalidatePath("/drivers");
}
