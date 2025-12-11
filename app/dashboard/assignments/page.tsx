import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { assignmentsColumns } from "./columns/assignments-columns";
import { AssignmentsCreateDialog } from "./components/assignments-create-dialog";
import { getVehicles } from "@/app/actions/vehicle";
import { getWorkers } from "@/app/actions/workers";
import { getInventory } from "@/app/actions/inventory";
import { getAssignment } from "@/app/actions/assignment";

export const revalidate = 0;

export default async function AssingmentsPage() {
  const vehicles = await getVehicles();
  const workers = await getWorkers();
  const inventory = await getInventory();
  const assignments = await getAssignment();

  return (
    <main>
      <div className="flex flex-col mb-9 gap-4 text-xs md:flex-row justify-between">
        <PageHeader
          title="Aufgaben/Zuweisungen"
          description="Fahrzeuge und Gegenstände Mitarbeitern zuweisen"
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
        <p className="text-center text-muted-foreground">
          Keine Aufgaben/Zuweisungen.
        </p>
      )}
    </main>
  );
}
