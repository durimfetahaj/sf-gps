import { VehicleCreateDialog } from "@/components/vehicles/vehicle-create-dialog";
import { getVehicles } from "../actions/vehicle";
import { vehicleColumns } from "@/components/vehicles/vehicle-columns";
import { DataTable } from "@/components/DataTable";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        <VehicleCreateDialog />
      </div>
      {vehicles.length > 0 ? (
        <DataTable
          data={vehicles}
          columns={vehicleColumns}
          searchPlaceholder="Search vehicles..."
        />
      ) : (
        <p>No vehicles available.</p>
      )}
    </div>
  );
}
