import { GetServerSidePropsContext } from "next";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession as $getServerSession } from "next-auth";
import { authOptions } from "auth/auth-options";

export const getServerSession = async (options: {
  req: NextApiRequest | GetServerSidePropsContext["req"] | undefined;
  res: NextApiResponse | GetServerSidePropsContext["res"] | undefined;
}) => {
  const { req, res } = options;
  if (req !== undefined && res !== undefined) {
    return $getServerSession(req, res, authOptions);
  } else {
    return null;
  }
};
