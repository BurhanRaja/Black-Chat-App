import { prisma } from "prisma";
import { Maybe, TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import { TRPCContextInner } from "../creatContext";
import { getServerSession } from "auth/ensureSession";
import { middleware } from "../trpc";

// Get User and Check for correct session of user.
export const getUserFromSession = async (
  ctx: TRPCContextInner,
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
export const getSession = async (ctx: TRPCContextInner) => {
  const { req, res } = ctx;
  return req ? await getServerSession({ req, res }) : null;
};

// If user is already have session or user
export const getUserSession = async (ctx: TRPCContextInner) => {
  const session = ctx.session || (await getSession(ctx));
  const user = session ? await getUserFromSession(ctx, session) : null;
  return { user, session };
};

// Session Middleware
export const sessionMiddleware = middleware(async ({ ctx, next }) => {
  const { user, session } = await getUserSession(ctx);
  return next({ ctx: { user, session } });
});

// Check If user is authenticated;
export const isAuthed = middleware(async ({ ctx, next }) => {
  const { user, session } = await getUserSession(ctx);
  if (!user || !session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { user, session },
  });
});
