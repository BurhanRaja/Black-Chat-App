import { hash, genSalt } from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};
