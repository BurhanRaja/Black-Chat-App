import { TrpcSessionUser } from "../../createContext";
import { prisma } from "database/src/client";

type DeleteUserInputParams = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const deleteUser = async ({ ctx }: DeleteUserInputParams) => {
  const { user } = ctx;

  await prisma.user.delete({
    where: {
      uniqueId: user.uniqueId,
    },
  });

  return {
    success: true,
    message: "User successfully deleted.",
  };
};
