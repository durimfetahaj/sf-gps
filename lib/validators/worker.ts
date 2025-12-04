import { z } from "zod";

export const workerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address").optional(),
  phone: z.string().optional(),
});

export type WorkerFormValues = z.infer<typeof workerSchema>;
