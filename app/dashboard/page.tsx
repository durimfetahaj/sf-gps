import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { AlertCircle, Package, Truck, Users } from "lucide-react";
import { getAssignment } from "../actions/assignment";
import {
  getInventoryStats,
  getLowQuantityInventoryCount,
} from "../actions/inventory";
import { getAvailableVehicles } from "../actions/vehicle";
import { getWorkersStats } from "../actions/workers";
import { assignmentsColumns } from "./assignments/columns/assignments-columns";

export const revalidate = 0;

export default async function Home() {
  const workers = await getWorkersStats();
  const availableVehicles = await getAvailableVehicles();
  const inventory = await getInventoryStats();
  const lowQuantityItemsCount = await getLowQuantityInventoryCount();
  const assignments = await getAssignment();

  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-6">
        <div className="">
          <PageHeader
            title="Dashboard"
            description="Übersicht über Ihre Mitarbeiteraktivitäten"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Gesamtzahl der Mitarbeiter"
            value={workers.count}
            icon={Users}
            trend={workers.trend}
          />
          <StatCard
            title="Verfügbare Fahrzeuge"
            value={availableVehicles.length}
            icon={Truck}
            subtitle="Bereit zur Zuweisung"
          />

          <StatCard
            title="Inventargegenstände"
            value={inventory.count}
            icon={Package}
            trend={inventory.trend}
          />

          <StatCard
            title="Artikel knapp vorrätig"
            value={lowQuantityItemsCount}
            icon={AlertCircle}
            subtitle={
              lowQuantityItemsCount > 0
                ? "Artikel mit niedrigem Lagerbestand"
                : "Alles gut"
            }
            variant={lowQuantityItemsCount > 0 ? "alert" : "default"}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Aktive Aufgaben/Zuweisungen
          </h2>
          <DataTable
            data={assignments}
            columns={assignmentsColumns}
            searchPlaceholder="Fahrzeuge suchen..."
          />
        </div>
      </main>
    </div>
  );
}
