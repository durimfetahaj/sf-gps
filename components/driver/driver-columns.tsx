"use client";

import { Prisma } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ColumnDeleteButton } from "../column-delete-btn";
import { deleteDriver } from "@/app/actions/drivers";

type DriverWithVehicles = Prisma.DriverGetPayload<{
  include: { vehicles: true; workLogs: true };
}>;

export const driverColumns: ColumnDef<DriverWithVehicles>[] = [
  {
    accessorKey: "fullName",
    header: "Vollständiger Name",
    cell: ({ row }) => (
      <Link
        className={`text-blue-600 hover:underline hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 cursor-pointer`}
        href={`/drivers/${row.original.id}`}
      >
        {row.original.fullName}
      </Link>
    ),
  },
  {
    accessorFn: (row) =>
      row.employmentStart
        ? new Date(row.employmentStart).toLocaleDateString("en-US")
        : "—",
    id: "employmentStart",
    header: "Beschäftigungsbeginn",
    cell: ({ getValue }) => getValue(), // already formatted string
  },

  {
    accessorFn: (row) =>
      row.vehicles?.map((v) => v.licensePlate).join(", ") ?? "—",
    id: "vehicles",
    header: "Kennzeichen",
    cell: ({ getValue }) => getValue(), // no need to re-map, already formatted
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <ColumnDeleteButton id={row.original.id} deleteAction={deleteDriver} />
    ),
  },
];
