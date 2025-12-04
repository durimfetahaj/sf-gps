import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { getAssignment } from "../actions/assignment";
import { getInventory } from "../actions/inventory";
import { getVehicles } from "../actions/vehicle";
import { getWorkers } from "../actions/workers";
import { assignmentsColumns } from "./columns/assignments-columns";
import { AssignmentsCreateDialog } from "./components/assignments-create-dialog";

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
