import { z } from "zod";

export const workerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address").optional(),
  phone: z.string().optional(),
  hourlyRate: z.number().min(0, "Hourly rate must be at least 0").optional(),
  employmentStart: z.date({ error: "Employment start date is required" }),
});

export type WorkerFormValues = z.infer<typeof workerSchema>;
