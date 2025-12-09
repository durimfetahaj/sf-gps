"use client";

import { InventoryItem } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Menge",
  },
];
