import { VehicleCreateDialog } from "@/components/vehicles/vehicle-create-dialog";
import { vehicleColumns } from "@/components/vehicles/vehicle-columns";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { getVehicles } from "@/app/actions/vehicle";

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
          <p className="text-center text-muted-foreground">No vehicles.</p>
        )}
      </>
    </main>
  );
}
