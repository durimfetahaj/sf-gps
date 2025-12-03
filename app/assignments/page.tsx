import { PageHeader } from "@/components/page-header";
import { AssignmentsCreateDialog } from "./components/assignments-create-dialog";
import { getVehicles } from "../actions/vehicle";
import { getWorkers } from "../actions/workers";
import { getInventory } from "../actions/inventory";
import AssignmentCardExample from "./test";

export default async function AssingmentsPage() {
  const vehicles = await getVehicles();
  const workers = await getWorkers();
  const inventory = await getInventory();
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

      {/*   {vehicles.length > 0 ? (
        <DataTable
          data={vehicles}
          columns={vehicleColumns}
          searchPlaceholder="Fahrzeuge suchen..."
        />
      ) : (
        <p>Keine Fahrzeuge verfügbar.</p>
      )} */}
    </main>
  );
}
