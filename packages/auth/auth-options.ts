import { prisma } from "../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./verifyPassword";
import { JWT, encode } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

function isNumber(n: string) {
  return !isNaN(parseFloat(n)) && !isNaN(+n);
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: any;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.error("For some reason credentials are missing.");
          throw new Error("internal-server-error.");
        }

        const user = await prisma.user.findUnique({
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
          },
        });

        if (!user) {
        }

        if (!user?.disable) {
        }

        if (!user?.emailVerified) {
        }

        const checkPassword = await verifyPassword(
          credentials.password.toString(),
          user?.password!
        );

        if (!checkPassword) {
        }

        return {
          id: user?.id,
          uniqueId: user?.uniqueId,
          username: user?.username,
          email: user?.email,
          emailVerified: user?.emailVerified,
          phoneVerified: user?.phoneVerified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 7 * 24 * 30 * 60, // 7 days
  },
  pages: {
    signIn: "/",
    newUser: "/signup",
  },
};
