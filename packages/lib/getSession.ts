import {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth";

export type SessionOptions = {
  req: NextApiRequest | GetServerSidePropsContext["req"];
  res?: NextApiResponse | GetServerSidePropsContext["res"];
};

export const getSession = async (options: SessionOptions) => {
  const { req, res } = options;
  if (req !== undefined && res !== undefined) {
    const session = await getServerSession(req, res, {});
    return session;
  } else {
    return null;
  }
};
