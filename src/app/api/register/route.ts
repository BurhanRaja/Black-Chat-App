import { prisma } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { username, email, password, imageUrl, bio } = await req.json();
    
  } catch (err) {}
}
