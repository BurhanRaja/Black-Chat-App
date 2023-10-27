"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface IAuthProvider {
  children: React.ReactNode;
  session: Session | null;
}

const AuthSessionProvider = ({ children, session }: IAuthProvider) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthSessionProvider;
