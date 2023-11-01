import { hash, genSalt, compare } from "bcryptjs";

export default async (password: string) => {
  const salt = await genSalt(10);
  const securePassword = await hash(password, salt);
  return securePassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
