import { VehicleCreateDialog } from "@/components/vehicles/vehicle-create-dialog";

export default async function WorkersPage() {
  /*   const vehicles = await getVehicles(); */
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Workers</h1>
        {/*   <VehicleCreateDialog /> */}
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
    </div>
  );
}
