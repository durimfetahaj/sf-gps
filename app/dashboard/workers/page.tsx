import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { workerColumns } from "./columns/worker-columns";
import { WorkerCreateDialog } from "./components/worker-create-dialog";
import { getVehicles } from "@/app/actions/vehicle";
import { getWorkers } from "@/app/actions/workers";

export const revalidate = 0;

export default async function WorkersPage() {
  const vehicles = await getVehicles();
  const workers = await getWorkers();
  return (
    <div>
      <div className="flex justify-between items-center mb-9">
        <PageHeader
          title="Arbeiter"
          description="Verwalten Sie Ihre Belegschaft"
        />
        <WorkerCreateDialog vehicles={vehicles} />
      </div>
      {workers.length > 0 ? (
        <DataTable
          data={workers}
          columns={workerColumns}
          searchPlaceholder="Arbeiter suchen..."
        />
      ) : (
        <p className="text-center text-muted-foreground">Keine Mitarbeiter.</p>
      )}
    </div>
  );
}
