import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { v4 as uuid } from "uuid";
import { randomBytes } from "crypto";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import emailTemplate from "@/lib/email-template";

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
    const { email } = await req.json();

    let profile = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success, message: "User Profile not found." },
        { status: 404 }
      );
    }

    let token = uuid();

    profile = await prisma.profile.findFirst({
      where: {
        forgetPasswordToken: token,
      },
    });

    if (profile) {
      token = uuid();
    }

    await prisma.profile.update({
      data: {
        forgetPasswordToken: token,
      },
      where: {
        email,
      },
    });

    let mailData: NewSendEmailOptions = {
      from: `${appName} <${appEmail}>`,
      to: email,
      subject: `Reset your password for ${appName}`,
      text: ``,
      content: `<p>Click on the following link to reset your password.</p>`,
      link: `${mainURL}/forgetpassword/${token}`,
      linkText: "Forget Password",
    };

    let emailSend = await sendEmail(mailData);

    if (emailSend) {
      success = true;
      return NextResponse.json(
        {
          success,
          message: "Email Successfully sent. Please check your inbox.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success,
          message: "Some Error Occurred. Please try again.",
        },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
}
