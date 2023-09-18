import { prisma } from "database/src/client";
import z, { string } from "zod";

const updateUserInputValidate = z.object({
  username: z.string().min(5).max(20),
  email: z.string().email(),
  phone: z.string().min(8).max(15),
  phonecode: z.string(),
  country: z.string().min(3).max(20),
});

export type UpdateUserInput = typeof updateUserInputValidate._type;

export const updateUserInput = updateUserInputValidate;
