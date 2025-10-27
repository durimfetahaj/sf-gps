import { DataTable } from "@/components/DataTable";
import { getDrivers } from "../actions/drivers";
import { driverColumns } from "@/components/driver/driver-columns";

export default async function Drivers() {
  const drivers = await getDrivers();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        {/*  <VehicleCreateDialog /> */}
      </div>
      {drivers.length > 0 ? (
        <DataTable
          data={drivers}
          columns={driverColumns}
          searchPlaceholder="Search vehicles..."
        />
      ) : (
        <p>No drivers available.</p>
      )}
    </div>
  );
}
