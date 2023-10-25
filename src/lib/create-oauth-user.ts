import { prisma } from "@/db/client";
import { randomBytes } from "crypto";
import { Account, Profile } from "next-auth";

interface CreateOauthUserParams {
  profile: Profile;
  account: Account;
}

const createOauthUser = async ({ profile, account }: CreateOauthUserParams) => {
  let displayname = profile.name + "#" + randomBytes(3).toString("hex");

  // Generate User ID
  let uniqueId = randomBytes(6).toString("hex");
  let user = await prisma.profile.findUnique({
    where: {
      userId: uniqueId,
    },
  });
  if (user) {
    uniqueId += randomBytes(4).toString("hex");
  }

  let userData = {
    email: profile.email as string,
    imageUrl: profile.image,
    displayname,
    username: displayname.toLowerCase(),
    password: "",
    userId: uniqueId,
  };

  user = await prisma.profile.create({
    data: userData,
  });

  let accountData = {
    type: account.type,
    provider: account.provider,
    providerAccountId: account.providerAccountId,
    refresh_token: account.refresh_token,
    access_token: account.access_token,
    expires_at: account.expires_at,
    token_type: account.token_type,
    scope: account.scope,
    id_token: account.id_token,
    session_state: account.session_state,
    userId: uniqueId,
  };

  let accountCreate = await prisma.account.create({
    data: accountData,
  });

  return true;
};

export default createOauthUser;
