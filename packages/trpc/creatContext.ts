import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { User } from "prisma";
import { Session } from "next-auth";
import { prisma } from "prisma/client";
import type { inferAsyncReturnType } from "@trpc/server";

type CreateContextOptions = CreateNextContextOptions | GetServerSidePropsContext;

export type CreateInnerContextOptions = {
  session: Session | null;
  user?: Omit<
    User,
    "emailVerified" | "password" | "phoneVerified" | "twoFactorEnable"
  >;
} & Partial<CreateContextOptions>

type GetServerSessionFn =
  | ((_options: {
      req: GetServerSidePropsContext["req"] | NextApiRequest;
      res: GetServerSidePropsContext["res"] | NextApiResponse;
    }) => Promise<Session | null>)
  | (() => Promise<Session | null>);

export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    prisma,
    ...opts,
  };
}

export async function createContext(
  { req, res }: CreateContextOptions,
  sessionGetter?: GetServerSessionFn
) {
  const session = sessionGetter ? await sessionGetter({ req, res }) : null;
  const contextInner = createContextInner({ session });

  return {
    ...contextInner,
    req,
    res,
  };
}

export type TRPCContext = inferAsyncReturnType<typeof createContext>;
export type TRPCContextInner = inferAsyncReturnType<typeof createContextInner>;
