// Forget Password
// input newpassword
// check if user exists.
// change password

import { prisma } from "database/src/client";
import { ForgetPasswordInput } from "./forgetPassword.schema";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "lib";

type ForgetPasswordInputParams = {
  input: ForgetPasswordInput;
};

export const forgetPassword = async ({ input }: ForgetPasswordInputParams) => {
  const { newpassword, token } = input;
  const user = await prisma.user.findFirst({
    where: {
      forgetPasswordToken: token,
    },
    select: {
      forgetPasswordToken: true,
      email: true,
    },
  });

  if (!user) {
    new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid Forget Password Token.",
    });
  }

  const securePassword = await hashPassword(newpassword);

  await prisma.user.update({
    data: {
      password: securePassword,
      forgetPasswordToken: "",
    },
    where: {
      email: user?.email!,
    },
  });

  return {
    success: true,
    message: "Password successfully changed.",
  };
};
