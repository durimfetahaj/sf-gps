"use server";

import prisma from "@/lib/prisma";
import { InventoryItemValues } from "@/lib/validators/inventory-item";
import { revalidatePath } from "next/cache";

export async function getInventory() {
  return await prisma.inventoryItem.findMany();
}

export async function createInventoryItem(data: InventoryItemValues) {
  const newDriver = await prisma.inventoryItem.create({
    data: {
      name: data.name,
      quantity: data.quantity ?? 0,
    },
  });

  revalidatePath("/inventory");

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
