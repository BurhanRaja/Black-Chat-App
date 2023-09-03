import z from "zod";

// User Input Validation
export const userInputVal = {
  username: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(25, "Only 25 characters limit."),
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
  country: z
    .string()
    .min(3, "Min 3 characters are required.")
    .max(30, "Only 30 characters limit."),
  phone: z
    .string()
    .min(8, "Min 8 characters are required.")
    .max(15, "Only 15 characters limit."),
};
