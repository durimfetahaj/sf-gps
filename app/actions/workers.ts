"use server";

import { getTrend } from "@/lib/helpers/trend";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getWorkers() {
  return await prisma.worker.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createWorker(data: {
  fullName: string;
  hourlyRate?: number;
  employmentStart?: Date;
  vehicleId?: string;
}) {
  const newDriver = await prisma.worker.create({
    data: {
      fullName: data.fullName,
      hourlyRate: data.hourlyRate,
      employmentStart: data.employmentStart,
      vehicles: data.vehicleId
        ? {
            connect: { id: data.vehicleId },
          }
        : undefined,
    },
  });

  revalidatePath("workers");

  return newDriver;
}

export async function getWorkerById(id: string) {
  try {
    const worker = await prisma.worker.findUnique({
      where: { id },
      include: { vehicles: true },
    });
    return worker;
  } catch (error) {
    console.error("Error fetching worker:", error);
    return null;
  }
}

export async function getWorkersStats() {
  // Current workers count
  const currentCount = await prisma.worker.count();

  // Previous workers count (e.g., 1 month ago)
  const previousCount = await prisma.worker.count({
    where: {
      createdAt: {
        lte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  // Calculate trend
  const trend = getTrend(currentCount, previousCount);

  // Return count and trend
  return {
    count: currentCount,
    trend,
  };
}

/* export async function deleteDriver(id: string) {
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
 */
