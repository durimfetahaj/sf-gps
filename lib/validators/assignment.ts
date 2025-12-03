import { z } from "zod";

// Schema for a single assigned item
export const assignmentSchema = z
  .object({
    workerId: z.string().optional(),
    vehicleId: z.string().optional(),
    items: z
      .array(
        z.object({
          itemId: z.string(),
          quantity: z.number().min(1),
          assignedTo: z.enum(["worker", "vehicle"]),
        })
      )
      .optional(),
  })
  .refine((data) => data.workerId || data.vehicleId, {
    message: "At least a worker or vehicle must be selected",
    path: ["workerId"],
  });

export type AssignmentValues = z.infer<typeof assignmentSchema>;
