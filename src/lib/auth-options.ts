import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      userId: any;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    userId: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [],
  callbacks: {},
};
