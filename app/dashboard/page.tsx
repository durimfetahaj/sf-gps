import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Package, Truck, Users } from "lucide-react";
import { getInventoryStats } from "../actions/inventory";
import { getAvailableVehicles } from "../actions/vehicle";
import { getWorkersStats } from "../actions/workers";
import { DataTable } from "@/components/DataTable";
import { assignmentsColumns } from "./assignments/columns/assignments-columns";
import { getAssignment } from "../actions/assignment";

export const revalidate = 0;

export default async function Home() {
  const workers = await getWorkersStats();
  const availableVehicles = await getAvailableVehicles();
  const inventory = await getInventoryStats();
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
