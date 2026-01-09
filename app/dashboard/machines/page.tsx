import { PageHeader } from "@/components/page-header";

export default async function MachinesPage() {
  return (
    <main>
      <>
        <div className="flex flex-col mb-9 gap-4 text-xs md:flex-row justify-between">
          <PageHeader
            title="Maschinen"
            description="Verwalten Sie Ihre Fahrzeugmaschinen"
          />
          {/* <VehicleCreateDialog /> */}
        </div>
        {/* {vehicles.length > 0 ? (
          <DataTable
            data={vehicles}
            columns={vehicleColumns}
            searchPlaceholder="Fahrzeuge suchen..."
          />
        ) : (
          <p className="text-center text-muted-foreground">Keine Fahrzeuge.</p>
        )} */}
      </>
    </main>
  );
}
