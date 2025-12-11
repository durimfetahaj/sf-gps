import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { inventoryColumns } from "./columns/inventory-columns";
import { InventoryCreateDialog } from "./components/inventory-create-dialog";
import { getInventory } from "@/app/actions/inventory";
import { LowStockAlert } from "@/components/low-stock-alert";

export const revalidate = 0;

export default async function Inventory() {
  const inventory = await getInventory();
  return (
    <main className="space-y-5">
      <div className="flex flex-col mb-9 gap-4 text-xs md:flex-row justify-between">
        <PageHeader
          title="Inventar"
          description="Werkzeuge, Ausrüstung und Vorräte verfolgen"
        />

        <InventoryCreateDialog />
      </div>

      <LowStockAlert items={inventory} />

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
