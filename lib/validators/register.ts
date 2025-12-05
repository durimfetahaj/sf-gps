import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("A valid email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword", "password"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
