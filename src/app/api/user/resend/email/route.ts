import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import { encryptToken } from "@/lib/encrypt-decrypt";
import { resendEmail } from "@/types";

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
    const bodyData = await req.json();
    const validation = resendEmail.safeParse(bodyData);
    if (!validation.success) {
      const { errors } = validation.error;
      return NextResponse.json(
        { success, message: errors[0]?.message },
        { status: 400 }
      );
    }

    const email = bodyData.email;
    const userId = bodyData.userId;

    // Email Check
    let user = await prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 400 }
      );
    }

    const userData = userId + "-" + email;
    const encryptedToken = encryptToken(userData);

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
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
