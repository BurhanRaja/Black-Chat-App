import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";

const mainURL = process.env.NEXT_APP_URL!;

export async function POST(req: NextRequest) {
  let success = false;
  try {
    const { username, email, password, gender, imageUrl } = await req.json();

    console.log(await prisma.profile.findMany({}));

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

    let uniqueId = crypto.randomBytes(6).toString("hex");

    user = await prisma.profile.findUnique({
      where: {
        userId: uniqueId,
      },
    });

    if (user) {
      uniqueId += crypto.randomBytes(4).toString("hex");
    }

    let data = {
      userId: uniqueId,
      displayname: username,
      username: username.toLowerCase(),
      email,
      password,
      imageUrl: imageUrl
        ? imageUrl
        : gender == 0
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
        link: "Verify Link",
        linkText: "",
      };

      sendEmail(emailSend);
      success = true;
      return NextResponse.json(
        { success, message: "User Registered successfully." },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
