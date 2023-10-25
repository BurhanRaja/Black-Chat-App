import { Account } from "@prisma/client";
import axios from "axios";
import { Session, TokenSet } from "next-auth";

const googleTokenApi = process.env.NEXT_GOOGLE_TOKEN_API!;
const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET!;

interface RefreshTokenParams {
  userAccount: Account;
  session: Session;
}

const refreshToken = async ({ userAccount, session }: RefreshTokenParams) => {
  try {
    const response = await axios.post(googleTokenApi, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        grant_type: "refresh_token",
        refresh_token: userAccount.refresh_token!,
      }),
      method: "POST",
    });

    const token: TokenSet = await response.data;

    if (!response.data.ok) {
      throw token;
    }

    let data = {
      access_token: token.access_token!,
      expires_at: Math.floor(Date.now() / 1000 + token.expires_at!),
      refresh_token: token.refresh_token ?? userAccount.refresh_token,
    };

    await prisma?.account.update({
      data,
      where: {
        provider: userAccount.provider,
        providerAccountId: userAccount.providerAccountId,
      },
    });
    return true;
  } catch (err) {
    session.error = "RefreshAccessTokenError";
    return false;
  }
};

export default refreshToken;
