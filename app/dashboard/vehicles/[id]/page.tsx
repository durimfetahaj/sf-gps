import { getVehicleById } from "@/app/actions/vehicle";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GaugeIcon, MapPinIcon, TruckIcon } from "lucide-react";
import { notFound } from "next/navigation";

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
                {vehicle.manufacturer || "Unknown"} {vehicle.model || ""}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
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

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-4",
          vehicle.serialNumber ? "lg:grid-cols-3" : "lg:grid-cols-2"
        )}
      >
        {vehicle.serialNumber && (
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
        )}

        <Card className="shadow-none">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              Chassis Number
            </CardDescription>
            <CardTitle className="text-lg font-mono">
              {vehicle.chassisNumber || "N/A"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="shadow-none">
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
      </div>

      {/* <Card>
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
      </Card> */}
    </div>
  );
}
