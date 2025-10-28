"use client";

import { Driver, Prisma } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

type EnrichedWorkLog = Prisma.WorkLogGetPayload<{
  include: { vehicle: { select: { licensePlate: true } } };
}>;

export const workLogColumns: ColumnDef<EnrichedWorkLog>[] = [
  {
    header: "Vehicle",
    accessorFn: (log) => log.vehicle?.licensePlate ?? log.vehicleId,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) => {
      const date = getValue() as Date | string;
      const d = typeof date === "string" ? new Date(date) : date;

      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    header: "Difference",
    accessorKey: "difference",
    cell: ({ getValue }) => {
      const diff = getValue() as string;
      return (
        <span
          className={
            diff && diff !== "00:00" ? "text-red-600" : "text-green-600"
          }
        >
          {diff} min
        </span>
      );
    },
  },
  {
    header: "Comment",
    accessorFn: (log) => log.comment || "N/A",
  },

  {
    header: "Comment",
    accessorFn: (log) => (log.km as string) || "N/A",
  },
];
