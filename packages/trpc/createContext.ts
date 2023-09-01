import { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { prisma, IPrismaClient, User } from "prisma";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type CreateContextOptions = GetServerSidePropsContext;

type CreateInnerContext = {
  session: Session | null;
  user?: Omit<User, "emailVerified" | "twoFactorEnable" | "phoneVerified">;
} & Partial<CreateContextOptions>;

type ContextInnerReturn = {
  prisma: IPrismaClient;
} & Partial<CreateInnerContext>;

// Create Inner Context can be used in procedures
export function createContextInner(
  opts: CreateInnerContext
): ContextInnerReturn {
  return {
    prisma,
    ...opts,
  };
}

// Getting Session Function
export type GetSessionFn =
  | ((_options: {
      req: GetServerSidePropsContext["req"] | NextApiRequest;
      res: GetServerSidePropsContext["res"] | NextApiResponse;
    }) => Promise<Session | null>)
  | (() => Promise<Session | null>);

// Creating a Context
export async function createContext(
  opts: CreateContextOptions,
  sessionGetter?: GetSessionFn
) {
  const { req, res } = opts;
  const session = sessionGetter ? await sessionGetter({ req, res }) : null;
  const contextInner = createContextInner({ session });
  return {
    ...contextInner,
    req,
    res,
    session,
  };
}

export type TRPCContext = inferAsyncReturnType<typeof createContext>;
export type TRPCInnerContext = inferAsyncReturnType<typeof createContextInner>;
