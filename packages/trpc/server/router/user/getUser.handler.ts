// Get user
// Get User from session and return
import { prisma } from "database/src/client";
import { TrpcSessionUser } from "../../createContext";

type UserDetailsParams = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const getUserDetails = async ({ ctx }: UserDetailsParams) => {
  const { user } = ctx;

  const userDetails = await prisma.user.findUnique({
    where: {
      uniqueId: user.uniqueId,
    },
  });

  return userDetails;
};
