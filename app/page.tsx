import { DriverCard } from "@/components/DriverCards";
import { getDrivers } from "./actions/drivers";
import { WorkLogCreateDialog } from "@/components/work-logs/work-log-create-dialog";
import { getVehicles } from "./actions/vehicle";

export default async function Home() {
  const drivers = await getDrivers();
  const vehicles = await getVehicles();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Trips</h1>
        {drivers?.length > 0 && <WorkLogCreateDialog vehicles={vehicles} />}
      </div>

      <div className="flex flex-col gap-6">
        {drivers?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">Total Drivers</p>
                <p className="text-2xl font-bold">{drivers.length || 0}</p>
              </div>

              <div className="bg-white border border-red-500 rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">Drivers with Issues</p>
              </div>
              {/* <VehicleCreateDialog /> */}
            </div>

            {drivers.map((d) => (
              <div key={d.id} className="w-auto max-w-sm">
                <DriverCard
                  key={d.id}
                  id={d.id}
                  name={d.fullName}
                  plate={d.vehicles[0]?.licensePlate || "N/A"}
                  hasDifference={d.hasDiscrepancy}
                />
              </div>
            ))}
          </>
        ) : (
          <p>No trips available.</p>
        )}
      </div>
    </div>
  );
}
