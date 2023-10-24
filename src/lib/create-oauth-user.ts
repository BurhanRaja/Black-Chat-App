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

  let = {
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

  return true;
  // let accountData = {
  //   type: "GOOGLE",
  //   provider: account.provider,
  //   providerAccountId: account.providerAccountId
  // }

  // let account = await prisma.account.create({

  // })
};
