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
      workLogs: true,
    },
  });

  if (!driver) {
    throw new Error(`Driver with ID ${driverId} not found`);
  }

  return driver;
}
