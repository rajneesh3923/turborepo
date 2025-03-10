import { z } from "zod";

export const userRole = z.enum(["User", "Agent"]);

// export type UserRole = z.infer<typeof userRole>;

export const userRow = z.object({
  id: z.string(),
  email: z.string(),
  role: userRole,
  name: z.string(),
  phone_number: z.string(),
  profilePicURL: z.string(),
});

export type UserRow = z.infer<typeof userRow>;
