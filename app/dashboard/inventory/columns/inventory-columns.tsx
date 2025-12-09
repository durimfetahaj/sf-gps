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
    cell: ({ getValue }) => {
      const quantity = getValue() as number;

      return (
        <span
          style={{
            color: quantity <= 10 ? "red" : "inherit",
            fontWeight: quantity <= 10 ? "bold" : "normal",
          }}
        >
          {quantity}
        </span>
      );
    },
  },
];
