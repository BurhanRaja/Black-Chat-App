import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import hashPassword from "@/lib/hash-password";

const mainURL = process.env.NEXT_APP_URL!;

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
      displayname: username,
      username: username.toLowerCase(),
      email,
      password: securePassword,
      imageUrl:
        gender == 0
          ? mainURL + `male-profile.png`
          : mainURL + "female-profile.png",
      gender,
    };

    user = await prisma.profile.create({
      data,
    });

    if (user.id) {
      let emailSend: NewSendEmailOptions = {
        from: "BlackChat <hello@blackchat.com>",
        to: email as string,
        subject: "Email Verification",
        content:
          "Thank you for registering as our user. Kindly click on the button below to activate your account.",
        link: "http://localhost:3000/verify/login",
        linkText: "Verify Link",
      };

      const emailCheck = sendEmail(emailSend);

      if (!emailCheck) {
        return NextResponse.json(
          {
            success,
            message: "User Registered successfully. But email not sent.",
          },
          { status: 200 }
        );
      }

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
