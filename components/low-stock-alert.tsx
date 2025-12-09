"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InventoryItem } from "@/app/generated/prisma";

interface LowStockAlertProps {
  items: InventoryItem[];
}

export function LowStockAlert({ items }: LowStockAlertProps) {
  const lowStockItems = items.filter((item) => item.quantity <= 10);

  if (lowStockItems.length === 0) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Low Stock Alert</AlertTitle>
      <AlertDescription>
        {lowStockItems.length} item{lowStockItems.length !== 1 ? "s" : ""} need
        {lowStockItems.length === 1 ? "s" : ""} reordering.{" "}
        {lowStockItems
          .map((item) => `${item.name} (${item.quantity})`)
          .join(", ")}
      </AlertDescription>
    </Alert>
  );
}
