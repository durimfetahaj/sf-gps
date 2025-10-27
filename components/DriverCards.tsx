"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface DriverCardProps {
  id: string;
  name: string;
  plate: string;
  hasDifference?: boolean;
}

export function DriverCard({
  id,
  name,
  plate,
  hasDifference = false,
}: DriverCardProps) {
  const router = useRouter();
  const cardStyle = hasDifference
    ? "border-red-500 hover:shadow-lg"
    : "border-gray-200 hover:shadow-lg";

  return (
    <Card
      onClick={() => router.push(`/drivers/${id}`)}
      className={`cursor-pointer transition-shadow rounded-2xl border ${cardStyle}`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Truck Plate:</p>
        <p className="text-base font-medium">{plate}</p>
        {hasDifference && (
          <p className="mt-2 font-semibold text-red-600">Has discrepancies</p>
        )}
      </CardContent>
    </Card>
  );
}