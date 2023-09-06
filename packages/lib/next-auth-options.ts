import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database/src/client";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./verifyPassword";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      uniqueId: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    uniqueId: string;
  }
}

//   interface User {
//     uniqueId: string;
//     id?: any;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     uniqueId: string;
//     id: number;
//     token: string;
//   }
// }

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
    jwt: async ({ token, user }) => {
      console.log(token);
      console.log(user);
      return { ...token, ...user };
    },
    session: async ({ user, session }) => {
      // console.log(session);
      console.log(user);
      if (session.user) {
        session.user.uniqueId = user?.uniqueId;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};
