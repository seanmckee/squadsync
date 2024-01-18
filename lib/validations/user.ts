import * as z from "zod";

export const OnboardingSchema = z.object({
  clerkID: z.string(),
  email: z.string().email(),
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  bio: z.string().max(160),
});
