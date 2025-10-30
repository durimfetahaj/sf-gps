"use client";

import { Vehicle } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import Link from "next/link";

const defaultCell =
  (fallback = "—") =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ getValue }: any) => {
    const value = getValue();
    return value && value.trim() !== "" ? value : fallback;
  };

export const vehicleColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "licensePlate",
    header: "Kennzeichen",
    cell: ({ row }) => (
      <Link
        className={`text-blue-600 hover:underline hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 cursor-pointer`}
        href={`/vehicles/${row.original.id}`}
      >
        {row.original.licensePlate}
      </Link>
    ),
  },
  {
    accessorKey: "hasGps",
    header: "Hat GPS",
    cell: ({ row }) => {
      const hasGps = row.original.hasGps;
      return hasGps ? (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          Yes
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-200"
        >
          No
        </Badge>
      );
    },
  },
  {
    accessorKey: "manufacturer",
    header: "Hersteller",
    cell: defaultCell("N/A"),
  },
  {
    accessorKey: "model",
    header: "Modell",
    cell: defaultCell("N/A"),
  },
  {
    accessorKey: "mileage",
    header: () => <div className="text-center">Kilometerstand (km)</div>,
    cell: (info) => {
      const value = info.getValue() as number | null | undefined;

      if (!value) {
        // Handles null, undefined, or 0
        return <div className="text-center">N/A</div>;
      }

      return (
        <div className="text-center">
          {new Intl.NumberFormat("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value)}
        </div>
      );
    },
  },
];
