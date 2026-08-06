import { z } from "zod";

// Admin-only login. Terrashop20 has no customer accounts or
// registration — shoppers use cart/wishlist/checkout as guests.
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
