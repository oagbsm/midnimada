import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all users
export async function GET(req) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
