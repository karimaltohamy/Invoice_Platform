import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(2, { message: "First name is too short" }),
  lastName: z
    .string({ message: "Last name is required" })
    .min(2, { message: "Last name is too short" }),
  address: z
    .string({ message: "Address is required" })
    .min(2, { message: "Address is too short" }),
});
