import { _userModel } from "database/src/zod/user";
import z from "zod";

// Create User
export const userInputVal = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z]+$/, "No special characters allowed.")
    .min(5, "Min 5 characters are required.")
    .max(25, "Only 25 characters limit."),
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
  country: z
    .string()
    .min(3, "Please Select your Country.")
    .max(30, "Please Select your Country."),
  phone: z
    .string()
    .regex(/^[0-9+]+$/, "No characters allowed.")
    .min(8, "Invalid Phone Number.")
    .max(15, "Invalid Phone Number."),
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
  image: true,
  forgetPasswordToken: true,
});

export type CreateUserInputType = typeof createUserInput._type;

export const userInputValidation = userInputVal;
