import { VehicleCreateDialog } from "@/components/vehicles/vehicle-create-dialog";
import { VehicleDataTable } from "@/components/vehicles/vehicle-data-table";
import { getVehicles } from "../actions/vehicle";
import { vehicleColumns } from "@/components/vehicles/vehicle-columns";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        <VehicleCreateDialog />
      </div>
      {vehicles.length > 0 ? (
        <VehicleDataTable data={vehicles} columns={vehicleColumns} />
      ) : (
        <p>No vehicles available.</p>
      )}
    </div>
  );
}
