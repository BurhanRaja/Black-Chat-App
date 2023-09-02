import z from "zod";

export const createUserInput = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().min(5).max(30),
  phone: z.string().min(8).max(18),
  country: z.string().min(3).max(30),
});
