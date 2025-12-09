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
import { ArrowLeft, GaugeIcon, MapPinIcon, TruckIcon } from "lucide-react";
import { notFound } from "next/navigation";
import VehiclesDetailsClient from "../components/VehicleDetailsClient";

export default async function VehicleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <main>
      <VehiclesDetailsClient vehicle={vehicle} />
    </main>
  );
}
