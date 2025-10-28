// src/app/actions/drivers/getDrivers.ts
"use server";

import prisma from "@/lib/prisma";

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
