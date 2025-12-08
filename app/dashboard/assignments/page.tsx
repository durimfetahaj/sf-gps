import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { assignmentsColumns } from "./columns/assignments-columns";
import { AssignmentsCreateDialog } from "./components/assignments-create-dialog";
import { getVehicles } from "@/app/actions/vehicle";
import { getWorkers } from "@/app/actions/workers";
import { getInventory } from "@/app/actions/inventory";
import { getAssignment } from "@/app/actions/assignment";

export default async function AssingmentsPage() {
  const vehicles = await getVehicles();
  const workers = await getWorkers();
  const inventory = await getInventory();
  const assignments = await getAssignment();

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          title="Assignments"
          description="Assign vehicles and items to workers"
        />
        <AssignmentsCreateDialog
          vehicles={vehicles}
          workers={workers}
          inventory={inventory}
        />
      </div>

      {assignments.length > 0 ? (
        <DataTable
          data={assignments}
          columns={assignmentsColumns}
          searchPlaceholder="Fahrzeuge suchen..."
        />
      ) : (
        <p className="text-center text-muted-foreground">No assignments.</p>
      )}
    </main>
  );
}
