"use server";

import { getTrend } from "@/lib/helpers/trend";
import prisma from "@/lib/prisma";
import { InventoryEditItemValues } from "@/lib/validators/inventory-edit-item";
import { InventoryItemValues } from "@/lib/validators/inventory-item";
import { revalidatePath } from "next/cache";

export async function getInventory() {
  return await prisma.inventoryItem.findMany();
}

export async function createInventoryItem(data: InventoryItemValues) {
  const existing = await prisma.inventoryItem.findUnique({
    where: { name: data.name },
  });

  let item;

  if (existing) {
    // Item exists → add to quantity
    item = await prisma.inventoryItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + (data.quantity ?? 0),
      },
    });
  } else {
    // Item does not exist → create new
    item = await prisma.inventoryItem.create({
      data: {
        name: data.name,
        quantity: data.quantity ?? 0,
      },
    });
  }

  revalidatePath("/dashboard");

  return item;
}

export async function getInventoryStats() {
  // Current inventory count
  const currentCount = await prisma.inventoryItem.count();

  // Previous inventory count (e.g., 1 month ago)
  const previousCount = await prisma.inventoryItem.count({
    where: {
      updatedAt: {
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

export async function getLowQuantityInventoryCount() {
  try {
    const count = await prisma.inventoryItem.count({
      where: {
        quantity: {
          lt: 5, // less than 10
        },
      },
    });

    return count;
  } catch (error) {
    console.error("Error fetching low quantity inventory count:", error);
    return 0; // return 0 on error
  }
}

export async function updateInventoryItem(
  id: string,
  data: InventoryEditItemValues
) {
  const existing = await prisma.inventoryItem.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Inventory item not found.");
  }

  const updated = await prisma.inventoryItem.update({
    where: { id },
    data: {
      name: data.name ?? existing.name,
      quantity: data.quantity !== undefined ? data.quantity : existing.quantity,
    },
  });

  revalidatePath("/inventory");
  return updated;
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
