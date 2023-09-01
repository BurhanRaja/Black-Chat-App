import { GetServerSidePropsContext } from "next";
import { getServerSession as $getServerSession } from "next-auth";
import { authOptions } from "auth/auth-options";

export const getServerSession = async (options: {
  req: GetServerSidePropsContext["req"] | undefined;
  res: GetServerSidePropsContext["res"] | undefined;
}) => {
  const { req, res } = options;
  if (req !== undefined && res !== undefined) {
    return $getServerSession(req, res, authOptions);
  } else {
    return null;
  }
};
