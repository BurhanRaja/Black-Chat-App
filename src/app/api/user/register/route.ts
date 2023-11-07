import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import hashPassword from "@/lib/hash-password";
import { encryptToken } from "@/lib/encrypt-decrypt";

const mainURL = process.env.NEXT_APP_URL!;
const appName = process.env.NEXT_APP_NAME!;
const appEmail = process.env.NEXT_APP_EMAIL!;

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;
  try {
    const { username, email, password, gender } = await req.json();

    // Email Check
    let user = await prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json(
        { success, message: "User Already Exists." },
        { status: 400 }
      );
    }

    // Generate User ID
    let uniqueId = randomBytes(6).toString("hex");
    user = await prisma.profile.findUnique({
      where: {
        userId: uniqueId,
      },
    });
    if (user) {
      uniqueId += randomBytes(4).toString("hex");
    }

    // Hash Password
    const securePassword = await hashPassword(password as string);

    // Create User
    let data = {
      userId: uniqueId,
      displayname: username.charAt(0).toUpperCase() + username.slice(1),
      username: username.toLowerCase(),
      email,
      password: securePassword,
      imageUrl:
        gender == 0
          ? mainURL + "/male-profile.png"
          : mainURL + "/female-profile.png",
      gender,
    };

    user = await prisma.profile.create({
      data,
    });

    const userData = user.userId + "-" + user.email;
    const encryptedToken = encryptToken(userData);

    if (user.id) {
      let mailData: NewSendEmailOptions = {
        from: `${appName} <${appEmail}>`,
        to: email as string,
        subject: "Email Verification",
        content:
          "Thank you for registering as our user. Kindly click on the button below to activate your account.",
        link: `${mainURL}/verify/login/${encryptedToken}`,
        linkText: "Verify Link",
      };

      await sendEmail(mailData);

      success = true;
      return NextResponse.json(
        {
          success,
          message: "User Registered successfully. Please verify your email.",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
