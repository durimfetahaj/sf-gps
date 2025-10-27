import { notFound } from "next/navigation";
import Link from "next/link";
import { WorkLogsTable } from "@/app/drivers/components/WorkLogsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TruckIcon,
  UserIcon,
  ClipboardCheckIcon,
  AlertCircleIcon,
  MapPinIcon,
  GaugeIcon,
  StickyNoteIcon,
  ChevronRightIcon,
  CalendarClockIcon,
  WrenchIcon,
  ShieldCheckIcon,
  CakeIcon as CraneIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getVehicleById } from "@/app/actions/vehicle";

export default async function VehicleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
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

  const getInspectionStatus = (date: string | Date | null | undefined) => {
    if (!date)
      return {
        status: "unknown",
        label: "Not Scheduled",
        variant: "secondary" as const,
      };
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const daysUntil = Math.ceil(
      (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil < 0) {
      return {
        status: "overdue",
        label: "Overdue",
        variant: "destructive" as const,
      };
    } else if (daysUntil <= 30) {
      return {
        status: "upcoming",
        label: "Due Soon",
        variant: "default" as const,
      };
    } else {
      return {
        status: "scheduled",
        label: "Scheduled",
        variant: "secondary" as const,
      };
    }
  };

  const inspections = [
    {
      name: "Next Inspection",
      date: vehicle.nextInspection,
      icon: ClipboardCheckIcon,
    },
    { name: "SP Check", date: vehicle.spCheck, icon: ShieldCheckIcon },
    { name: "UVV Check", date: vehicle.uvvCheck, icon: WrenchIcon },
    {
      name: "Crane Inspection",
      date: vehicle.craneInspection,
      icon: CraneIcon,
    },
  ];

  const totalWorkLogs = vehicle.workLogs.length;
  const totalDrivers = vehicle.drivers.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TruckIcon className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {vehicle.licensePlate}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-lg">
                {vehicle.manufacturer || "Unknown"} {vehicle.modelType || ""}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              <UserIcon className="h-3.5 w-3.5 mr-1.5" />
              {totalDrivers} {totalDrivers === 1 ? "Driver" : "Drivers"}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5">
              {totalWorkLogs} Work {totalWorkLogs === 1 ? "Log" : "Logs"}
            </Badge>
            {vehicle.hasGps && (
              <Badge variant="default" className="px-3 py-1.5 bg-green-600">
                <MapPinIcon className="h-3.5 w-3.5 mr-1.5" />
                GPS Enabled
              </Badge>
            )}
          </div>
        </div>

        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              Serial Number
            </CardDescription>
            <CardTitle className="text-lg font-mono">
              {vehicle.serialNumber || "N/A"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              Chassis Number
            </CardDescription>
            <CardTitle className="text-lg font-mono">
              {vehicle.chassisNumber || "N/A"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide flex items-center gap-1.5">
              <GaugeIcon className="h-3.5 w-3.5" />
              Mileage
            </CardDescription>
            <CardTitle className="text-2xl">
              {vehicle.mileage
                ? `${vehicle.mileage.toLocaleString()} km`
                : "N/A"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide flex items-center gap-1.5">
              <MapPinIcon className="h-3.5 w-3.5" />
              GPS Status
            </CardDescription>
            <CardTitle className="text-lg">
              {vehicle.hasGps === true ? (
                <Badge variant="default" className="bg-green-600">
                  Active
                </Badge>
              ) : vehicle.hasGps === false ? (
                <Badge variant="secondary">Inactive</Badge>
              ) : (
                <span className="text-muted-foreground text-base">Unknown</span>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClockIcon className="h-5 w-5" />
            Inspection Schedule
          </CardTitle>
          <CardDescription>
            Upcoming and scheduled vehicle inspections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspections.map((inspection) => {
              const status = getInspectionStatus(inspection.date);
              const Icon = inspection.icon;
              return (
                <div
                  key={inspection.name}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{inspection.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(inspection.date)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {vehicle.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNoteIcon className="h-5 w-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {vehicle.notes}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Assigned Drivers
          </CardTitle>
          <CardDescription>
            Drivers currently assigned to this vehicle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vehicle.drivers.length > 0 ? (
            <div className="space-y-3">
              {vehicle.drivers.map((driver) => (
                <Link key={driver.id} href={`/drivers/${driver.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {driver.fullName}
                        </p>
                        {driver.hasDiscrepancy && (
                          <div className="flex items-center gap-1.5 text-xs text-destructive">
                            <AlertCircleIcon className="h-3 w-3" />
                            Has Discrepancies
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <UserIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No drivers assigned to this vehicle</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Logs</CardTitle>
          <CardDescription>
            Complete history of work logs for this vehicle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkLogsTable workLogs={vehicle.workLogs} vehicles={[vehicle]} />
        </CardContent>
      </Card>
    </div>
  );
}
