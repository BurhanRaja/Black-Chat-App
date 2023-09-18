import { prisma } from "~/db/client";
import { User } from ".prisma/client";
import { type Session } from "next-auth";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { inferAsyncReturnType } from "@trpc/server";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "~/lib";
import { UserFromSession } from "./server/middleware/index";

type CreateContextOptions =
  | CreateNextContextOptions
  | GetServerSidePropsContext;

export type CreateInnerContextOptions = {
  session: Session | null;
  user?: User;
} & Partial<CreateContextOptions>;

export async function createInnerContext(opts: CreateInnerContextOptions) {
  return {
    prisma,
    ...opts,
  };
}

export async function createContext(opts: CreateContextOptions) {
  const session = await getServerSession(opts);
  const innerContext = await createInnerContext({ session });
  return {
    ...innerContext,
    req: opts.req,
    res: opts.res,
    session,
  };
}

export type TRPCInnerContext = inferAsyncReturnType<typeof createInnerContext>;
export type TRPCContext = inferAsyncReturnType<typeof createContext>;
export type TrpcSessionUser = UserFromSession;
