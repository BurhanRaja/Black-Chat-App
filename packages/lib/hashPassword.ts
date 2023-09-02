import { hash, genSalt } from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await genSalt(10);
  const securePassword = await hash(password, salt);
  return securePassword;
}
