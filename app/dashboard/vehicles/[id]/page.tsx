import { getVehicleById } from "@/app/actions/vehicle";
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
