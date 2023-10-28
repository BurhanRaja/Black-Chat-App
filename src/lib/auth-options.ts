import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import createOauthUser from "./create-oauth-user";
import { DefaultJWT } from "next-auth/jwt";
import refreshToken from "./refresh-token";
import { Account } from "@prisma/client";
import { comparePassword } from "./hash-password";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userId: string;
      emailVerified: boolean;
    } & DefaultSession["user"];
    error: string;
  }
  interface User extends DefaultUser {
    userId: string;
    emailVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    emailVerified: boolean;
    imageUrl: string;
    error: "RefreshAccessTokenError";
  }
}

const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET as any,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          console.log("For some reason credentials are missing.");
          throw new Error("missing-credentials.");
        }

        const user = await prisma.profile.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            userId: true,
            email: true,
            password: true,
            username: true,
            imageUrl: true,
            emailVerified: true,
          },
        });
        if (!user) {
          throw new Error("user-not-found.");
        }

        let check = comparePassword(credentials?.password!, user.password);

        if (!check) {
          return Error("invalid-password.");
        }

        return Promise.resolve({
          userId: user?.userId,
          username: user?.username,
          email: user?.email,
          image: user?.imageUrl,
          emailVerified: user?.emailVerified,
        });
      },
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    signIn: async ({ profile, account, user, credentials }) => {
      if (account?.provider === "google") {
        let userProfile = await prisma.profile.findUnique({
          where: {
            email: profile?.email,
          },
        });
        if (!userProfile && profile && account) {
          await createOauthUser({ profile, account, user });
        }
        return Promise.resolve(true);
      }
      // if (credentials) {
      //   return Promise.resolve(true);
      // }
      return Promise.resolve(false);
    },
    jwt: async ({ user, profile, token, account }) => {
      if (user?.userId) {
        token.userId = user.userId;
        token.emailVerified = user.emailVerified as boolean;
        token.imageUrl = user.image!;
      }
      if (profile?.email && account?.access_token) {
        let userProfile = await prisma.profile.findUnique({
          where: {
            email: profile?.email || user?.email!,
          },
        });

        const userAccount = (await prisma.account.findFirst({
          where: {
            userId: userProfile?.userId,
          },
        })) as Account;

        if (userAccount) {
          if (userAccount?.expires_at! * 1000 < Date.now()) {
            let successToken = await refreshToken({ userAccount, token });
            if (successToken) {
              token.userId = userProfile?.userId!;
              token.emailVerified = userProfile?.emailVerified!;
              token.imageUrl = userProfile?.imageUrl!;
            }
          } else {
            token.userId = userProfile?.userId!;
            token.emailVerified = userProfile?.emailVerified!;
            token.imageUrl = userProfile?.imageUrl!;
          }
        }
      }
      // }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user.userId = token.userId;
      session.user.emailVerified = token.emailVerified;
      session.user.image = token.imageUrl;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify", // (used for check email message)
    newUser: "/auth/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
