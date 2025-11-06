import { getDriverById } from "@/app/actions/drivers";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { workLogColumns } from "@/components/work-logs/work-log-columns";
import { calculateTotalDifference } from "@/lib/helpers/workLog";
import { AlertTriangleIcon, CalendarIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DriverDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const driver = await getDriverById(id);

  console.log({ driver: driver.workLogs });

  if (!driver) {
    notFound();
  }

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalWorkLogs = driver.workLogs.length;
  const totalVehicles = driver.vehicles.length;
  const weeklyDifferenceMinutes = calculateTotalDifference(
    driver.workLogs,
    "week"
  ).minutes; // "01:30"
  const weeklyDifferenceTime = calculateTotalDifference(
    driver.workLogs,
    "week"
  ).time; // "01:30"
  const monthlyDifferenceTime = calculateTotalDifference(
    driver.workLogs,
    "month"
  ).time; // "01:30"
  const monthlyDifferenceMinutes = calculateTotalDifference(
    driver.workLogs,
    "month"
  ).minutes; // "01:30"

  return (
    <div className="container p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {driver.fullName}
              </h1>
              {driver.hasDiscrepancy && (
                <Badge variant="destructive" className="gap-1.5">
                  <AlertTriangleIcon className="h-3.5 w-3.5" />
                  Weist Unstimmigkeiten auf
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">
                Beschäftigungsbeginn: {formatDate(driver?.employmentStart)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              <TruckIcon className="h-3.5 w-3.5 mr-1.5" />
              {totalVehicles} {totalVehicles === 1 ? "Fahrzeug" : "Fahrzeuge"}
            </Badge>
          </div>
        </div>

        <Separator />
      </div>

      <>
        <h2 className="text-lg mb-3">Zeitverschiebung diese Woche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {driver.vehicles.map((v) => (
            <Link key={v.id} href={`/vehicles/${v.id}`}>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{v.licensePlate}</p>
                  <p className="text-sm text-muted-foreground">
                    {v.manufacturer} {v.model}
                  </p>
                </div>
                {v.nextInspection && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Nächste Inspektion
                    </p>
                    <Badge variant="outline" className="font-mono">
                      {new Date(v.nextInspection).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </>
    </div>
  );
}
