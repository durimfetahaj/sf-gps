import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { inventoryColumns } from "./columns/inventory-columns";
import { InventoryCreateDialog } from "./components/inventory-create-dialog";
import { getInventory } from "@/app/actions/inventory";

export const revalidate = 0;

export default async function Inventory() {
  const inventory = await getInventory();
  return (
    <main>
      <div className="flex justify-between mb-9">
        <PageHeader
          title="Inventar"
          description="Werkzeuge, Ausrüstung und Vorräte verfolgen"
        />

        <InventoryCreateDialog />
      </div>

      {inventory.length > 0 ? (
        <DataTable
          data={inventory}
          columns={inventoryColumns}
          searchPlaceholder="Workers suchen..."
        />
      ) : (
        <p className="text-center text-muted-foreground">Kein Inventar.</p>
      )}
    </main>
  );
}
