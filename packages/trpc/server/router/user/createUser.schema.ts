import { createUserInput } from "prisma/zod-utils";
import { _userModel } from "prisma/zod/user";

export const createUser = _userModel.omit({
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

const CreateUserType = _userModel.omit({
  id: true,
  uniqueId: true,
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnable: true,
  about: true,
  disable: true,
  createdAt: true,
  updatedAt: true,
})._type;

export const userInput = createUserInput;

export type CreateUser = typeof CreateUserType;
