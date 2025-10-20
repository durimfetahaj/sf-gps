import { getDrivers } from "./actions/drivers";
import { DriverCard } from "@/components/ui/DriverCard";

export default async function Home() {
  const drivers = await getDrivers();
  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
            SF
          </div>
          <div>
            <h1 className="text-3xl font-bold">SF-Bau GmbH</h1>
            <p className="text-gray-500">Bad Salzuflen</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col">
          <p className="text-gray-500 font-medium">Total Drivers</p>
          <p className="text-2xl font-bold">{drivers.length}</p>
        </div>
        <div className="bg-white border border-red-500 rounded-2xl p-4 shadow-sm flex flex-col">
          <p className="text-gray-500 font-medium">Drivers with Issues</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {drivers.map((d) => (
          <DriverCard
            key={d.id}
            id={d.id}
            name={d.fullName}
            plate={d.vehicles[0]?.plate}
            hasDifference={d.hasDiscrepancy}
          />
        ))}
      </div>
    </div>
  );
}
