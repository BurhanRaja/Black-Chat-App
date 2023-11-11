import { prisma } from "@/db/client";
import { randomBytes } from "crypto";
import { Account, Profile, User } from "next-auth";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import { AdapterUser } from "next-auth/adapters";
import { encryptToken } from "./encrypt-decrypt";

interface CreateOauthUserParams {
  profile: Profile;
  account: Account;
  user: User | AdapterUser;
}

const createOauthUser = async ({
  profile,
  account,
  user,
}: CreateOauthUserParams) => {
  let displayname =
    profile.name?.split(" ")[0] + randomBytes(3).toString("hex");

  // Generate User ID
  let uniqueId = randomBytes(6).toString("hex");
  let userProf = await prisma.profile.findUnique({
    where: {
      userId: uniqueId,
    },
  });
  if (userProf) {
    uniqueId += randomBytes(4).toString("hex");
  }

  let userData = {
    email: profile.email as string,
    imageUrl: profile.image ? profile.image : user.image!,
    displayname,
    username: displayname.toLowerCase(),
    password: "",
    userId: uniqueId,
  };

  userProf = await prisma.profile.create({
    data: userData,
  });

  if (userProf.userId) {
    const userData = userProf.userId + "-" + userProf.email;
    const encryptedToken = encryptToken(userData);

    let emailSend: NewSendEmailOptions = {
      from: "BlackChat <hello@blackchat.com>",
      to: profile.email as string,
      subject: "Email Verification",
      content:
        "Thank you for registering as our user. Kindly click on the button below to activate your account.",
      link: `http://localhost:3000/verify/login/${encryptToken}`,
      linkText: "Verify Link",
    };
    sendEmail(emailSend);
  }

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

  await prisma.account.create({
    data: accountData,
  });

  return true;
};

export default createOauthUser;
