import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AssignmentWithItems } from "@/lib/types/assignments";

export function InventoryDialog({
  assignments,
}: {
  assignments: AssignmentWithItems[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">View ({assignments.length})</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zugewiesenes Inventar</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className="rounded-lg border p-3">
              <p className="text-sm font-medium">
                Assignment • {new Date(a.assignedAt).toLocaleDateString()}
              </p>

              <div className="mt-2 space-y-1">
                {a.items.map((ai) => (
                  <div
                    key={ai.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span>{ai.item.name}</span>
                    <span>×{ai.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
