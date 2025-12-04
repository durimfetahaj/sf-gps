"use client";

import {
  Assignment,
  AssignmentItem,
  Vehicle,
  Worker,
} from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

type AssignmentWithRelations = Assignment & {
  worker?: Worker | null;
  vehicle?: Vehicle | null;
  items?: (AssignmentItem & { item: { name: string } })[];
};

export const assignmentsColumns: ColumnDef<AssignmentWithRelations>[] = [
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
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
    header: "Items",
    accessorKey: "items",
    cell: ({ getValue }) => {
      const items = getValue<AssignmentWithRelations["items"]>();
      if (!items || items.length === 0)
        return <span className="text-muted-foreground">None</span>;
      return (
        <ul className="list-disc ml-4">
          {items.map(({ item, quantity }, i) => (
            <li key={i}>
              {item.name} x{quantity}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "assignedAt",
    header: "Employment Start",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return new Date(date).toLocaleDateString("en-US");
    },
  },
];
