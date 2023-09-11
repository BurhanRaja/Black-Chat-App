import z from "zod";

const forgetPasswordInputValidate = z.object({
  newpassword: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
  token: z.string(),
});

export type ForgetPasswordInput = typeof forgetPasswordInputValidate._type;

export const ForgetPasswordInput = forgetPasswordInputValidate;
