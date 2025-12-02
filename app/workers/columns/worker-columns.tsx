"use client";

import { Worker } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: defaultCell("N/A"),
  },
  {
    accessorKey: "employmentStart",
    header: "Employment Start",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return new Date(date).toLocaleDateString("en-US");
    },
  },
];
