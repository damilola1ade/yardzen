/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// Zod schema for form validation
export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Form values type inferred from Zod schema
export type SignUpFormValues = z.infer<typeof signUpSchema>;

export interface SignInValues {
  email: string;
  password: string;
}
