"use client";

import {
  Assignment,
  AssignmentItem,
  Vehicle,
  Worker,
} from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { ItemBadges } from "./components/item-badges";

type AssignmentWithRelations = Assignment & {
  worker?: Worker | null;
  vehicle?: Vehicle | null;
  items?: (AssignmentItem & { item: { name: string } })[];
};

export const assignmentsColumns: ColumnDef<AssignmentWithRelations>[] = [
  {
    accessorKey: "assignedTo",
    header: "Zugewiesen an",
    cell: ({ row }) => {
      const assignment = row.original;

      if (assignment.worker) {
        return (
          <div>
            <div>{assignment.worker.fullName}</div>
            <div className="text-sm text-muted-foreground">
              {assignment.worker.email}
            </div>
          </div>
        );
      }

      if (assignment.vehicle) {
        return (
          <div>
            <div>{assignment.vehicle.licensePlate}</div>
            <div className="text-sm text-muted-foreground">
              {assignment.vehicle.model}
            </div>
          </div>
        );
      }

      return <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    header: "Artikel",
    accessorKey: "items",
    cell: ({ getValue }) => {
      const items = getValue<AssignmentWithRelations["items"]>() ?? [];
      return <ItemBadges items={items} />;
    },
  },
  {
    accessorKey: "assignedAt",
    header: "Zugewiesen am",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return new Date(date).toLocaleDateString("en-US");
    },
  },
];
