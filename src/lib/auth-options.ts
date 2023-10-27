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
    } & DefaultSession["user"];
    error: "RefreshAccessTokenError";
  }
  interface User extends DefaultUser {
    userId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
  }
}

const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as any,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  session: {
    strategy: "jwt",
  },
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
            username: true,
            password: true,
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
        });
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.log(code);
      console.log(metadata);
    },
    warn(code) {
      console.log(code);
    },
  },
  callbacks: {
    signIn: async ({ profile, account, credentials }) => {
      if (account?.provider === "google") {
        let userProfile = await prisma.profile.findUnique({
          where: {
            email: profile?.email,
          },
        });
        if (!userProfile && profile && account) {
          await createOauthUser({ profile, account });
        }
        return true;
      }
      if (credentials) {
        return true;
      }
      return false;
    },
    jwt: async ({ user, profile, token }) => {
      console.log("hello");
      if (user.userId) {
        token.userId = user.userId;
        return token;
      } else {
        let userProfile = await prisma.profile.findUnique({
          where: {
            email: profile?.email,
          },
        });
        token.userId = userProfile?.userId!;
        return token;
      }
    },
    session: async ({ session, token }) => {
      const userAccount = (await prisma.account.findFirst({
        where: {
          userId: token.userId,
        },
      })) as Account;
      if (userAccount) {
        if (userAccount?.expires_at! * 1000 < Date.now()) {
          let successToken = await refreshToken({ userAccount, session });
          if (!successToken) {
            return session;
          }
        }
      }
      session.user.userId = token.userId;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
