import { _userModel } from "database/src/zod/user";
import z from "zod";

// Create User
export const userInputVal = z.object({
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
});

export const createUserInput = _userModel.omit({
  id: true,
  uniqueId: true,
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnable: true,
  about: true,
  disable: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserInputType = typeof createUserInput._type;

export const userInputValidation = userInputVal;
