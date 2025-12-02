import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { getVehicles } from "../actions/vehicle";
import { getWorkers } from "../actions/workers";
import { workerColumns } from "./columns/worker-columns";
import { WorkerCreateDialog } from "./components/worker-create-dialog";

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
