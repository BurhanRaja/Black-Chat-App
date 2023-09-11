// Forget Password Email
// input email
// Send Email for forget password with a token

import { prisma } from "database/src/client";
import { ForgetPasswordEmailInput } from "./forgetPasswordEmail.schema";
import { TRPCError } from "@trpc/server";
import { randomIdGenerator, sendEmail } from "lib";

type ForgetPasswordEmailParams = {
  input: ForgetPasswordEmailInput;
};

export const forgetPasswordEmail = async ({
  input,
}: ForgetPasswordEmailParams) => {
  const { email } = input;

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    new TRPCError({
      code: "NOT_FOUND",
      message: "Invalid Email. User not found.",
    });
  }

  let forgetToken = randomIdGenerator(20);

  let userCheck = await prisma.user.findUnique({
    where: {
      forgetPasswordToken: forgetToken,
      email,
    },
  });

  if (userCheck) {
    forgetToken += randomIdGenerator(5);
  }

  await prisma.user.update({
    data: {
      forgetPasswordToken: forgetToken,
    },
    where: {
      email,
    },
  });

  const html = `Head to Create a new Password by Clicking <a href="http://localhost:3000/login/forgetpassword/?${forgetToken}">HERE</a>`;
  await sendEmail(email, "Blackchat - Forget Password", html);

  return {
    success: true,
    message: "Forget-Password Email successfully sent.",
  };
};
