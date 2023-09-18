import { prisma } from "database/src/client";
import { TrpcSessionUser } from "../../createContext";
import { ChangePasswordInput } from "./changePassword.schema";
import { verifyPassword, hashPassword } from "lib";
import { TRPCError } from "@trpc/server";

type ChangePasswordInputParams = {
  input: ChangePasswordInput;
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const changePassword = async ({
  input,
  ctx,
}: ChangePasswordInputParams) => {
  const { oldpassword, newpassword } = input;
  const { user: userData } = ctx;

  let user = await prisma.user.findUnique({
    where: {
      uniqueId: userData.uniqueId,
    },
    select: {
      password: true,
    },
  });

  const checkPassword = await verifyPassword(oldpassword, user?.password!);

  if (!checkPassword) {
    new TRPCError({
      code: "BAD_REQUEST",
      message: "Incorrect Old Password",
    });
  }

  const securePassword = await hashPassword(newpassword);

  await prisma.user.update({
    data: {
      password: securePassword,
    },
    where: {
      uniqueId: userData.uniqueId,
    },
  });

  return {
    success: true,
    message: "Password changed successfully.",
  };
};
