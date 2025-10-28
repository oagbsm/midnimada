import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      fullName,
      phone,
      state,
      education,
      faculty,
      works,
      worksInField,
      salary,
    } = await req.json();

    // Basic validation
    if (!fullName || !phone || !state || !education) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

 const user = await prisma.user.create({
  data: {
    fullName,
    phone,
    state,
    education,
    faculty: faculty || null,
    works: works === "Yes",
    worksInField: worksInField ? worksInField === "Yes" : null,
    salary: salary || null,
  },
});


    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
