import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession as $getServerSession, AuthOptions } from "next-auth";

type GetServerSessionContext = {
  req?: NextApiRequest | GetServerSidePropsContext["req"];
  res?: NextApiResponse | GetServerSidePropsContext["res"];
  authOptions?: AuthOptions;
};

export const getServerSession = async (ctx: GetServerSessionContext) => {
  return $getServerSession(ctx.req, ctx.res, ctx.authOptions);
};
