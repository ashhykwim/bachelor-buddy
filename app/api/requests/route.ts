import { NextResponse } from "next/server";
import { createServiceRequest } from "@/lib/db";

type Body = {
  name?: string;
  phone?: string;
  category?: string;
  area?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const requiredFields = ["name", "phone", "category", "area", "message"] as const;

  for (const field of requiredFields) {
    if (!body[field]?.trim()) {
      return NextResponse.json(
        { message: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (body.phone && !/^[0-9+()\-\s]{8,18}$/.test(body.phone.trim())) {
    return NextResponse.json({ message: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    const created = await createServiceRequest({
      name: body.name!.trim(),
      phone: body.phone!.trim(),
      category: body.category!.trim(),
      area: body.area!.trim(),
      message: body.message!.trim()
    });

    return NextResponse.json(
      {
        message: "Enquiry saved successfully.",
        request: created
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to save enquiry." },
      { status: 500 }
    );
  }
}
