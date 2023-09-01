import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { User } from "prisma";
import { Session } from "next-auth";
import { prisma } from "prisma/client";

export interface CreateInnerContextOptions
  extends Partial<CreateNextContextOptions> {
  session: Session | null;
  user?: Omit<
    User,
    "emailVerified" | "password" | "phoneVerified" | "twoFactorEnable"
  >;
}

export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    prisma,
    ...opts,
  };
}

export async function createContext(opts: CreateNextContextOptions) {}
