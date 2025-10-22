"use client";

import { Vehicle } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

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
    header: "License Plate",
  },
  {
    accessorKey: "hasGps",
    header: "Has GPS",
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
    header: "Manufacturer",
    cell: defaultCell("N/A"),
  },
  {
    accessorKey: "modelType",
    header: "Model",
    cell: defaultCell("N/A"),
  },
  {
    accessorKey: "mileage",
    header: () => <div className="text-center">Mileage (km)</div>,
    cell: (info) => {
      const rawValue = info.getValue();
      const value = Number(rawValue);

      if (isNaN(value) || value === 0)
        return <div className="text-center">N/A</div>;

      return (
        <div className="text-center">
          {new Intl.NumberFormat("en-US").format(value)}
        </div>
      );
    },
  },
];
