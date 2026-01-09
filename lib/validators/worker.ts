import { z } from "zod";

export const workerSchema = z.object({
  fullName: z.string().min(1, "Der vollständige Name ist erforderlich"),
  vehicleId: z.string().optional(),
});

export type WorkerFormValues = z.infer<typeof workerSchema>;
