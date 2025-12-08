"use server";

import prisma from "@/lib/prisma";
import { AssignmentValues } from "@/lib/validators/assignment";
import { revalidatePath } from "next/cache";

export async function getAssignment() {
  return await prisma.assignment.findMany({
    include: {
      worker: true,
      vehicle: true,
      items: {
        include: {
          item: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function createAssignment(data: AssignmentValues) {
  if (!data.workerId && !data.vehicleId) {
    throw new Error("workerId is required");
  }

  if (!data.items || data.items.length === 0) {
    throw new Error("At least one item must be assigned.");
  }

  const newAssignment = await prisma.assignment.create({
    data: {
      workerId: data.workerId ?? null,
      vehicleId: data.vehicleId ?? null,
      items: {
        create: data.items,
      },
      assignedAt: data.assignedAt,
    },
  });

  // 2️⃣ Update inventory for each item

  for (const item of data.items) {
    await prisma.inventoryItem.update({
      where: { id: item.itemId },
      data: {
        quantity: {
          decrement: item.quantity,
        },
      },
    });
  }

  revalidatePath("/dashboard/assignments");
  revalidatePath("/dashboard/inventory");

  return newAssignment;
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
