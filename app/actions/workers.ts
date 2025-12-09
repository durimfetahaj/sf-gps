"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getWorkers() {
  return await prisma.worker.findMany();
}

export async function createWorker(data: {
  fullName: string;
  email?: string;
  phone?: string;
  hourlyRate?: number;
  employmentStart?: Date;
}) {
  const newDriver = await prisma.worker.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      hourlyRate: data.hourlyRate,
      employmentStart: data.employmentStart,
    },
  });

  updateTag("workers");

  return newDriver;
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
