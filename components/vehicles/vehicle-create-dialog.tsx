import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VehicleCreateForm } from "./vehicle-create-form";

export function VehicleCreateDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add Vehicle</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Neues Fahrzeug hinzufügen</DialogTitle>
          </DialogHeader>
          <VehicleCreateForm />
        </DialogContent>
      </form>
    </Dialog>
  );
}
