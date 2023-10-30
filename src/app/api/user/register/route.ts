import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import sendEmail, { NewSendEmailOptions } from "@/lib/send-email";
import hashPassword from "@/lib/hash-password";
import z from "zod";
import { encryptToken } from "@/lib/encrypt-decrypt";

const mainURL = process.env.NEXT_APP_URL!;

const schemaBody = z.object({
  username: z
    .string()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z0-9]/),
  email: z.string().email(),
  password: z
    .string()
    .min(5)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./),
  gender: z.number(),
});

type RegisterBodyType = z.infer<typeof schemaBody>;

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;
  try {
    const { username, email, password, gender } =
      req.body as unknown as RegisterBodyType;

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
      let emailSend: NewSendEmailOptions = {
        from: "BlackChat <hello@blackchat.com>",
        to: email as string,
        subject: "Email Verification",
        content:
          "Thank you for registering as our user. Kindly click on the button below to activate your account.",
        link: `http://localhost:3000/verify/login/${encryptedToken}`,
        linkText: "Verify Link",
      };

      sendEmail(emailSend);

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
