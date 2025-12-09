"use client";

import { Worker } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const defaultCell =
  (fallback = "—") =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ getValue }: any) => {
    const value = getValue();
    return value && value.trim() !== "" ? value : fallback;
  };

export const workerColumns: ColumnDef<Worker>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <Link
        className={`text-blue-600 hover:underline hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-150 cursor-pointer`}
        href={`/dashboard/workers/${row.original.id}`}
      >
        {row.original.fullName}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: defaultCell("N/A"),
  },
];
