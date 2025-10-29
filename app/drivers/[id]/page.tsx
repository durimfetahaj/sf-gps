import { getDriverById } from "@/app/actions/drivers";
import { notFound } from "next/navigation";
import { WorkLogsTable } from "../components/WorkLogsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  TruckIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { DataTable } from "@/components/DataTable";
import { workLogColumns } from "@/components/work-logs/work-log-columns";

export default async function DriverDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const driver = await getDriverById(id);

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

  // Calculate weekly/monthly differences
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const weeklyDifference = 0;

  const monthlyDifference = 0;

  const totalWorkLogs = driver.workLogs.length;
  const totalVehicles = driver.vehicles.length;

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
                  Has Discrepancies
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">
                Employment Start: {formatDate(driver?.employmentStart)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              <TruckIcon className="h-3.5 w-3.5 mr-1.5" />
              {totalVehicles} {totalVehicles === 1 ? "Vehicle" : "Vehicles"}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5">
              {totalWorkLogs} Work {totalWorkLogs === 1 ? "Log" : "Logs"}
            </Badge>
          </div>
        </div>

        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-chart-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              Time Difference This Week
            </CardDescription>
            <CardTitle className="flex items-center gap-2">
              <span
                className={`text-3xl font-bold ${
                  weeklyDifference > 0
                    ? "text-destructive"
                    : weeklyDifference < 0
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {weeklyDifference > 0 ? "+" : ""}
                {weeklyDifference} min
              </span>
              {weeklyDifference > 0 ? (
                <TrendingUpIcon className="h-5 w-5 text-destructive" />
              ) : weeklyDifference < 0 ? (
                <TrendingDownIcon className="h-5 w-5 text-green-600" />
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {weeklyDifference > 0
                ? "Driver is over scheduled hours"
                : weeklyDifference < 0
                ? "Driver is under scheduled hours"
                : "Driver is on schedule"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              Time Difference This Month
            </CardDescription>
            <CardTitle className="flex items-center gap-2">
              <span
                className={`text-3xl font-bold ${
                  monthlyDifference > 0
                    ? "text-destructive"
                    : monthlyDifference < 0
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {monthlyDifference > 0 ? "+" : ""}
                {monthlyDifference} min
              </span>
              {monthlyDifference > 0 ? (
                <TrendingUpIcon className="h-5 w-5 text-destructive" />
              ) : monthlyDifference < 0 ? (
                <TrendingDownIcon className="h-5 w-5 text-green-600" />
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {monthlyDifference > 0
                ? "Driver is over scheduled hours"
                : monthlyDifference < 0
                ? "Driver is under scheduled hours"
                : "Driver is on schedule"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TruckIcon className="h-5 w-5" />
            Assigned Vehicles
          </CardTitle>
          <CardDescription>
            Vehicles currently assigned to this driver
          </CardDescription>
        </CardHeader>
        <CardContent>
          {driver.vehicles.length > 0 ? (
            <div className="space-y-3">
              {driver.vehicles.map((v) => (
                <Link key={v.id} href={`/vehicles/${v.id}`}>
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors mb-4"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-lg">{v.licensePlate}</p>
                      <p className="text-sm text-muted-foreground">
                        {v.manufacturer} {v.model}
                      </p>
                    </div>
                    {v.nextInspection && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">
                          Next Inspection
                        </p>
                        <Badge variant="outline" className="font-mono">
                          {new Date(v.nextInspection).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <TruckIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No vehicles assigned to this driver</p>
            </div>
          )}
        </CardContent>
      </Card>

      {driver.workLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Logs</CardTitle>
            <CardDescription>
              Complete history of work logs and time tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkLogsTable
              workLogs={driver.workLogs}
              vehicles={driver.vehicles}
            />
            <DataTable columns={workLogColumns} data={driver.workLogs} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
