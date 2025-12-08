"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface WorkLogsTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workLogs: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vehicles: any[];
}

export function WorkLogsTable({ workLogs, vehicles }: WorkLogsTableProps) {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<(typeof workLogs)[number]>[] = [
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
      header: "Vehicle",
      accessorFn: (log) =>
        vehicles.find((v) => v.id === log.vehicleId)?.licensePlate ?? "N/A",
    },
    {
      header: "Foreman",
      accessorKey: "foreman",
    },
    {
      header: "Difference",
      accessorKey: "difference",
      cell: ({ getValue }) => {
        const diff = getValue() as number | null;
        return (
          <span
            className={diff && diff > 0 ? "text-red-600" : "text-green-600"}
          >
            {diff ?? 0} min
          </span>
        );
      },
    },
    {
      header: "Comment",
      accessorKey: "comment",
      cell: ({ getValue }) => getValue() ?? "-",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={workLogs}
      searchPlaceholder="Search work logs..."
      noResultsText="No work logs found"
    />
  );
}
