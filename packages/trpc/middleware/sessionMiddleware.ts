import { prisma } from "prisma";
import { Maybe } from "@trpc/server";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "auth/ensureSession";

type TempContext = {
  prisma: typeof prisma;
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session;
};

// Get User and Check for correct session of user.
export const getUserFromSession = async (
  ctx: TempContext,
  session: Maybe<Session>
) => {
  const { prisma } = ctx;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
      emailVerified: true,
      phoneVerified: true,
      uniqueId: true,
      disable: true,
    },
  });

  if (!user) {
    return null;
  }

  if (!user.email || !user.id || user.uniqueId) {
    return null;
  }

  if (user.disable) {
    return null;
  }

  if (!user.emailVerified) {
    return null;
  }

  return user;
};

// Getting Session for the Authentication
export const getSession = async (ctx: TempContext) => {
  const { req, res } = ctx;
  return req ? await getServerSession({ req, res }) : null;
};

// If user is already have session or user
export const getUserSession = async (ctx: TempContext) => {
  const session = ctx.session || (await getSession(ctx));
  const user = session ? await getUserFromSession(ctx, session) : null;
  return { user, session };
};

// Session Middleware
// const sessionMiddleware = middleware(async ({ ctx, next }) => {});
