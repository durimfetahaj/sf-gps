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
        <h1 className="text-2xl font-semibold">Arbeitsprotokolle</h1>
        {drivers?.length > 0 && <WorkLogCreateDialog vehicles={vehicles} />}
      </div>

      <div className="flex flex-col gap-6">
        {drivers?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">
                  Gesamtzahl der Fahrer
                </p>
                <p className="text-2xl font-bold">{drivers.length || 0}</p>
              </div>

              <div className="bg-white border border-red-500 rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">
                  Fahrer mit Unstimmigkeiten
                </p>
                <p className="text-2xl font-bold">
                  {drivers.filter((d) => d.hasDiscrepancy).length || 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-5 gap-5">
              {vehicles.map((d) => (
                <div key={d.id} className="w-auto max-w-sm">
                  <DriverCard
                    key={d.id}
                    id={d.driver?.id || "N/A"}
                    name={d.driver?.fullName || "N/A"}
                    plate={d.licensePlate}
                    hasDifference={d.driver?.hasDiscrepancy}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No trips available.</p>
        )}
      </div>
    </div>
  );
}
