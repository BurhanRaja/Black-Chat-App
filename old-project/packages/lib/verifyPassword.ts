import { compare } from "bcrypt";

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
}