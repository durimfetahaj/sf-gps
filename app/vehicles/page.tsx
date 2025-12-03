import { VehicleCreateDialog } from "@/components/vehicles/vehicle-create-dialog";
import { getVehicles } from "../actions/vehicle";
import { vehicleColumns } from "@/components/vehicles/vehicle-columns";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return (
    <main>
      <>
        <div className="flex justify-between items-center mb-6">
          <PageHeader
            title="Vehicles"
            description="Manage your vehicle fleet"
          />
          <VehicleCreateDialog />
        </div>
        {vehicles.length > 0 ? (
          <DataTable
            data={vehicles}
            columns={vehicleColumns}
            searchPlaceholder="Fahrzeuge suchen..."
          />
        ) : (
          <p>Keine Fahrzeuge verfügbar.</p>
        )}
      </>
    </main>
  );
}
