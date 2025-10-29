"use client";

import { Prisma } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type DriverWithVehicles = Prisma.DriverGetPayload<{
  include: { vehicles: true; workLogs: true };
}>;

export const driverColumns: ColumnDef<DriverWithVehicles>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
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
    accessorKey: "employmentStart",
    header: "Employment Start",
    cell: ({ getValue }) => {
      const date = getValue() as Date | string | null;
      if (!date) return "—";

      const d = new Date(date);
      return d.toLocaleDateString("en-US");
    },
  },

  {
    header: "Vehicles",
    cell: ({ row }) => {
      const vehicles = row.original.vehicles;
      if (!vehicles || vehicles.length === 0) return "—";

      return vehicles.map((v) => v.licensePlate).join(", ");
    },
  },
];
