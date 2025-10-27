import { DriverCard } from "@/components/DriverCards";
import { getDrivers } from "./actions/drivers";

export default async function Home() {
  const drivers = await getDrivers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Trips</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {drivers?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <VehicleCreateDialog /> */}
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">Total Drivers</p>
                <p className="text-2xl font-bold">{drivers.length || 0}</p>
              </div>
              {/* <div className="bg-white border border-red-500 rounded-2xl p-4 shadow-sm flex flex-col">
                <p className="text-gray-500 font-medium">Drivers with Issues</p>
              </div> */}
            </div>

            {drivers.map((d) => (
              <DriverCard
                key={d.id}
                id={d.id}
                name={d.fullName}
                plate={d.vehicles[0]?.licensePlate || "N/A"}
                hasDifference={d.hasDiscrepancy}
              />
            ))}
          </>
        ) : (
          <p>No trips available.</p>
        )}
      </div>
    </div>
  );
}
