import { Maybe, TRPCError } from "@trpc/server";
import { TRPCInnerContext } from "../createContext";
import { Session } from "next-auth";
import { getServerSession } from "auth/ensureSession";
import { middlewares } from "../trpc";

export const getUserFromSession = async (
  ctx: TRPCInnerContext,
  session: Maybe<Session>
) => {
  const user = await ctx?.prisma.user.findUnique({
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
      twoFactorEnable: true,
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
export const getSession = async (ctx: TRPCInnerContext) => {
  return ctx?.req
    ? await getServerSession({ req: ctx?.req, res: ctx?.res })
    : null;
};

export type UserFromSession = Awaited<ReturnType<typeof getUserFromSession>>;

export const getUserSession = async (ctx: TRPCInnerContext) => {
  const session = ctx.session || (await getSession(ctx));
  const user = session ? await getUserFromSession(ctx, session) : null;
  return { user, session };
};

export const isAuthed = middlewares(async ({ ctx, next }) => {
  const { user, session } = await getUserSession(ctx);
  if (!user || !session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { user, session },
  });
});
