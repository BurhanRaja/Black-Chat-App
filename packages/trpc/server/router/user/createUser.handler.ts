import { CreateUserInputType } from "./createUser.schema";
import { prisma } from "database/src/client";
import { TRPCError } from "@trpc/server";
import { hashPassword, randomIdGenerator, encodeHex, sendEmail } from "lib";

export const createUserHandler = async ({
  input,
}: {
  input: CreateUserInputType;
}) => {
  const { username, email, password, phone, country } = input;

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User already exists.",
    });
  }

  let randomId = randomIdGenerator();

  user = await prisma.user.findUnique({
    where: {
      uniqueId: randomId,
    },
  });

  if (user) {
    randomId += randomIdGenerator(3);
  }

  const securePassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      username,
      email,
      phone,
      country,
      password: securePassword,
      uniqueId: randomId,
    },
  });

  // Send Email
  const tokenCombine = user?.uniqueId + ":" + user?.email;
  const token = encodeHex(tokenCombine);
  const html = `Login by Clicking <a href="http://localhost:3000/login/verify?${token}"></a>`;
  await sendEmail(user?.email, "Blackchat - Login Verify", html);

  return {
    success: true,
    message: "User created successfully.",
  };
};
