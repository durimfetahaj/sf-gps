"use client";

import { Vehicle } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Export columns as a named export
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
  },
  {
    accessorKey: "modelType",
    header: "Model",
  },
  {
    accessorKey: "mileage",
    header: "Mileage (km)",
    cell: (info) => info.getValue() ?? "—",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      );
    },
  },
];
