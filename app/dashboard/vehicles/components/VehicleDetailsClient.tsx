"use client";

import { Vehicle, Worker } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPinIcon,
  MapPinOff,
  TruckIcon,
  User,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";

type VehicleWithDriver = Vehicle & {
  driver: Worker | null;
};

export default function VehiclesDetailsClient({
  vehicle,
}: {
  vehicle: VehicleWithDriver;
}) {
  const router = useRouter();

  return (
    <div className="container mx-auto space-y-6">
      <Button
        className="gap-2 cursor-pointer"
        variant="outline"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
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

          <div className="flex items-center gap-4">
            {vehicle.hasGps ? (
              <Badge className="px-3 py-1.5 " variant="default">
                <MapPinIcon className="h-3.5 w-3.5 mr-1.5" />
                GPS Enabled
              </Badge>
            ) : (
              <Badge className="px-3 py-1.5 " variant="destructive">
                <MapPinOff />
                Kein GPS
              </Badge>
            )}

            <div className="flex items-center gap-2">
              {vehicle.driver ? (
                <Badge variant="outline" className="px-3 py-1.5">
                  <User className="h-4 w-4" />
                  <span>{vehicle.driver.fullName}</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="px-3 py-1.5">
                  <UserX className="h-4 w-4" />
                  <span>Frei / Verfügbar</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 lg:col-span-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vehicle.serialNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Serial Number</p>
                <p className="text-foreground font-medium">
                  {vehicle.serialNumber || "N/A"}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground"> Mark</p>
              <p className="text-foreground font-medium">
                {vehicle.manufacturer || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground"> Model</p>
              <p className="text-foreground font-medium">
                {vehicle.model || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">License Plate</p>
              <p className="text-foreground font-medium">
                {vehicle.licensePlate}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="text-foreground font-medium">
                {vehicle.model || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground"> Chassis Number</p>
              <p className="text-foreground font-medium">
                {vehicle.chassisNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground"> Mileage</p>
              <p className="text-foreground font-medium">
                {vehicle.mileage
                  ? `${vehicle.mileage.toLocaleString()} km`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Assignments
        </h3>
        {/*  {vehicle.assignments.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <p className="text-muted-foreground">No assignments.</p>
          </div>
        ) : (
          <DataTable
            data={vehicle.assignments}
            columns={vehicleDetailsClientColumns}
          />
        )} */}
      </div>
    </div>
  );
}
