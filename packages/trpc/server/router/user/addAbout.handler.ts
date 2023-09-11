import { TrpcSessionUser } from "../../createContext";
import { AboutInputType } from "./addAbout.schema";
import { prisma } from "database/src/client";

type AboutInputParams = {
  input: AboutInputType;
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const addAbout = async ({ input, ctx }: AboutInputParams) => {
  const { about } = input;
  const { user } = ctx;
  await prisma?.user.update({
    data: {
      about,
    },
    where: {
      uniqueId: user.uniqueId,
    },
  });

  return {
    success: true,
    message: "About successfully added.",
  };
};
