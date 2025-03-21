
import { z } from "zod";

export const jobApplicationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  position: z.string().min(2, { message: "Position must be at least 2 characters" }),
  message: z.string().optional().nullable(),
});

export type JobApplicationFormValues = z.infer<typeof jobApplicationFormSchema>;
