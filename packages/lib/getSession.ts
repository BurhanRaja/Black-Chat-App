import {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./next-auth-options";

export type SessionOptions = {
  req: NextApiRequest | GetServerSidePropsContext["req"];
  res?: NextApiResponse | GetServerSidePropsContext["res"];
};

export const getSession = async (options: SessionOptions) => {
  const { req, res } = options;
  if (req !== undefined && res !== undefined) {
    return await getServerSession(req, res, authOptions);
  } else {
    return null;
  }
};
