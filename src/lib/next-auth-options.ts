import { DefaultSession, NextAuthOptions, DefaultUser } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/db/client";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "~/lib";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      uniqueId: any;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    uniqueId: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      authorize: async (credentials): Promise<any> => {
        if (!credentials) {
          console.log("For some reason credentials are missing.");
          throw new Error("internal-server-error.");
        }

        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          select: {
            id: true,
            username: true,
            password: true,
            email: true,
            phone: true,
            uniqueId: true,
            emailVerified: true,
            disable: true,
          },
        });

        if (!user) {
          throw new Error("user-not-found.");
        }

        let checkPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("password-incorrect.");
        }

        return Promise.resolve({
          id: user?.id,
          uniqueId: user?.uniqueId,
          username: user?.username,
          email: user?.email,
        });
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, session, trigger }) => {
      if (trigger === "update") {
        return {
          ...token,
          username: session?.username ?? token.username,
          email: session?.email ?? token.email,
        };
      }
      const autoMergeIdentities = async () => {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
          select: {
            uniqueId: true,
            email: true,
            username: true,
          },
        });

        if (!existingUser) {
          return token;
        }

        return {
          ...token,
          user: existingUser,
        };
      };

      if (!user) {
        return await autoMergeIdentities();
      }

      return { ...token, ...user };
    },
    session: async ({ user, session, token }) => {
      if (session.user) {
        session.user.uniqueId = token.uniqueId;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};
