import z from "zod";

const forgetPasswordEmailInputValidate = z.object({
  email: z.string().email("Please Enter a valid Email."),
});

export type ForgetPasswordEmailInput =
  typeof forgetPasswordEmailInputValidate._type;

export const forgetPasswordEmailInput = forgetPasswordEmailInputValidate;
