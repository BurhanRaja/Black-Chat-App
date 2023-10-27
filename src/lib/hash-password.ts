import { hash, genSalt, compare } from "bcrypt";

export default async (password: string) => {
  const salt = await genSalt(10);
  const securePassword = await hash(password, salt);
  return securePassword;
};

export const comparePassword = async (
  passwordOut: string,
  passwordIn: string
) => {
  const comparison = await compare(passwordOut, passwordIn);
  return comparison;
};
