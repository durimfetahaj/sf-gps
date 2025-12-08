import { DataTable } from "@/components/DataTable";
import { getDrivers } from "../../actions/drivers";
import { driverColumns } from "@/components/driver/driver-columns";
import { DriverCreateDialog } from "./components/driver-create-dialog";
import { getVehicles } from "../../actions/vehicle";

export default async function Drivers() {
  const drivers = await getDrivers();
  const vehicles = await getVehicles();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Treiber</h1>
        <DriverCreateDialog vehicles={vehicles} />
      </div>
      {drivers.length > 0 ? (
        <DataTable
          data={drivers}
          columns={driverColumns}
          searchPlaceholder="Treiber suchen..."
        />
      ) : (
        <p>Keine Treiber verfügbar.</p>
      )}
    </div>
  );
}
