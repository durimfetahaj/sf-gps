import { PageHeader } from "@/components/page-header";
import { WorkerCreateDialog } from "./components/worker-create-dialog";
import { getVehicles } from "../actions/vehicle";
import { getDrivers } from "../actions/drivers";
import { getWorkers } from "../actions/workers";
import { DataTable } from "@/components/DataTable";
import { workerColumns } from "./columns/worker-columns";

export default async function WorkersPage() {
  const vehicles = await getVehicles();
  const workers = await getWorkers();
  return (
    <div>
      <div className="flex justify-between items-center mb-9">
        <PageHeader title="Workers" description="Manage your workforce" />
        <WorkerCreateDialog vehicles={vehicles} />
      </div>
      {workers.length > 0 ? (
        <DataTable
          data={workers}
          columns={workerColumns}
          searchPlaceholder="Workers suchen..."
        />
      ) : (
        <p>Keine Fahrzeuge verfügbar.</p>
      )}
    </div>
  );
}
