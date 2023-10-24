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

const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.profile.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            userId: true,
            email: true,
            username: true,
          },
        });
        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, profile, account, credentials }) => {
      if (credentials) {
        let userProfile = await prisma.profile.findUnique({
          where: {
            email: user.email!,
            userId: user.userId,
          },
        });
        if (!userProfile) {
          return false;
        } else {
          return true;
        }
      }

      let userProfile = await prisma.profile.findUnique({
        where: {
          email: profile?.email,
        },
      });

      if (!userProfile) {
        await createOauthUser({ profile, account });
      }
      return true;
    },
  },
  pages: {},
};
