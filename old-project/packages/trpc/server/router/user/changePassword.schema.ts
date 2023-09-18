import z from "zod";

const changePasswordInputValidate = z.object({
  oldpassword: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
  newpassword: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
});

export type ChangePasswordInput = typeof changePasswordInputValidate._type;

export const changePasswordInput = changePasswordInputValidate;
