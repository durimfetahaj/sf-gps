"use client";

import { InventoryItem } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryEditDialog } from "../components/inventory-edit-dialog";

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
  {
    accessorKey: "actions",
    header: () => <div className="text-right mr-16">Actions</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right mr-10">
          <InventoryEditDialog item={item} />
        </div>
      );
    },
  },
];
