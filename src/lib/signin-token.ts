import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/db/client";

const secretKey = process.env.NEXT_JWT_SECRET_KEY!;

interface SignInParams {
  email: string;
  userId?: string;
  password?: string;
}

const signInToken = async (data: SignInParams) => {
  let user = await prisma.profile.findUnique({
    where: {
      email: data.email,
      userId: data.userId,
    },
  });

  if (user) {
    const token = jsonwebtoken.sign(data, secretKey);
    return token;
  }
};

export default signInToken;
