import { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database/src/client";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./verifyPassword";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: any;
      uniqueId: any;
    } & DefaultSession["user"];
  }

  interface User {
    uniqueId: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      uniqueId: any;
      id: any;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
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
            phoneVerified: true,
            disable: true,
            twoFactorEnable: true,
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

        return {
          id: user?.id,
          uniqueId: user?.uniqueId,
          username: user?.username,
          email: user?.email,
          emailVerified: user?.emailVerified,
          phoneVerified: user?.phoneVerified,
          disable: user?.disable,
          twoFactorEnable: user?.twoFactorEnable,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user !== undefined) {
        console.log(user?.id);
        token.id = user?.id;
        token.uniqueId = user?.uniqueId;
      }

      return token;
    },
    session: async ({ token, session, user }) => {
      if (token && session.user) {
        session.user.id = user.id;
        session.user.uniqueId = user.uniqueId;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 7 * 24 * 30 * 60, // 7 days
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};
