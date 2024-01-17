import * as z from "zod";

export const OnboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
});
