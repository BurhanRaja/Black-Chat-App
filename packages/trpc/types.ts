import * as z from "zod";

// Validation Types
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(15),
});

export const singupSchema = loginSchema.extend({
  username: z.string().min(4).max(25),
});

export type Ilogin = z.infer<typeof loginSchema>;
export type ISignup = z.infer<typeof singupSchema>;
