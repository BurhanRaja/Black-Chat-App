import { prisma } from "database/src/client";
import { TrpcSessionUser } from "../../createContext";
import { UpdateUserInput } from "./updateUser.schema";
import { TRPCError } from "@trpc/server";

type UpdateUserParams = {
  input: UpdateUserInput;
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const updateUser = async ({ input, ctx }: UpdateUserParams) => {
  const { username, email, phonecode, phone, country } = input;
  const { user } = ctx;

  let checkEmail;
  let checkUsername;
  let checkPhone;

  if (user.email !== email) {
    checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists.",
      });
    }
  }

  if (user.username !== username) {
    checkUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (checkUsername) {
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "Username already exists.",
      });
    }
  }

  if (user.phone !== phonecode! + phone!) {
    checkPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (checkPhone) {
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "Phone number already exists.",
      });
    }
  }

  await prisma.user.update({
    data: {
      username,
      email,
      phone: phonecode + phone,
      country,
    },
    where: {
      uniqueId: user.uniqueId,
    },
  });

  return {
    success: true,
    message: "Profile updated successfully.",
  };
};
