import { z } from "zod";

export const inventoryItemSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  quantity: z.number().min(1, "Die Menge muss mindestens 1 betragen."),
  workerId: z.string().optional(),
  vehicleId: z.string().optional(),
});

export type InventoryItemValues = z.infer<typeof inventoryItemSchema>;
