"use client";

import { Prisma } from "@/app/generated/prisma";
import { InventoryDialog } from "@/components/inventory-item-dialog";
import { ColumnDef } from "@tanstack/react-table";

type WorkerWithAssignments = Prisma.WorkerGetPayload<{
  include: {
    assignments: {
      include: {
        items: {
          include: {
            item: true;
          };
        };
      };
    };
  };
}>;

export const workerColumns: ColumnDef<WorkerWithAssignments>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    /* cell: ({ row }) => (
      <Link
        className={`text-blue-600 hover:underline hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 cursor-pointer`}
        href={`/dashboard/workers/${row.original.id}`}
      >
        {row.original.fullName}
      </Link>
    ), */
  },
  {
    header: "Inventory",
    cell: ({ row }) => {
      const assignments = row.original.assignments ?? [];

      const itemCount = assignments.reduce(
        (sum, a) => sum + (a.items?.length ?? 0),
        0
      );

      return itemCount ? (
        <InventoryDialog assignments={assignments} />
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
];
