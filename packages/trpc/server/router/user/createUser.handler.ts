import { prisma } from "prisma";
import { CreateUser } from "./createUser.schema";
import { TRPCError } from "@trpc/server";
import { hashPassword, randomIdGenerator } from "lib";
import { TRPCInnerContext } from "../../createContext";

type CreateUserHandlerParams = {
  input: CreateUser;
  ctx: TRPCInnerContext;
};

export const createUserHandler = async ({
  input,
  ctx,
}: CreateUserHandlerParams): Promise<any> => {
  let user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User Already Exists.",
    });
  }

  const securePassword = await hashPassword(input.password);

  let randomId = randomIdGenerator();
  user = await prisma.user.findUnique({
    where: {
      uniqueId: randomId,
    },
  });

  if (user) {
    randomId += randomIdGenerator(3);
  }

  let data = {
    username: input.username,
    email: input.email,
    phone: input.phone,
    password: securePassword,
    uniqueId: randomId,
    about: "",
    country: input.country ? input.country : "India",
  };

  await prisma.user.create({ data });

  return {
    success: true,
    message: "User created successfully.",
  };
};
