import { Account } from "@prisma/client";
import axios from "axios";
import { Session, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";

const googleTokenApi = process.env.NEXT_GOOGLE_TOKEN_API!;
const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET!;

interface RefreshTokenParams {
  userAccount: Account;
  token: JWT;
}

const refreshToken = async ({ userAccount, token }: RefreshTokenParams) => {
  try {
    const response = await axios.post(
      googleTokenApi,
      new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        grant_type: "refresh_token",
        refresh_token: userAccount.refresh_token!,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
      }
    );

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
      where: { id: userAccount.id },
    });
    return true;
  } catch (err) {
    console.log(err);
    token.error = "RefreshAccessTokenError";
    return false;
  }
};

export default refreshToken;
