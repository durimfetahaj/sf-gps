"use client";

import { Assignment, Worker } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

const defaultCell =
  (fallback = "—") =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ getValue }: any) => {
    const value = getValue();
    return value && value.trim() !== "" ? value : fallback;
  };

export const assignmentsColumns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "workerId",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "",
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
