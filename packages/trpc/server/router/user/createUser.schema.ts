import { _userModel } from "database/src/zod/user";
import { userInputVal } from "../../../types";

export const createUserInput = _userModel.omit({
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
