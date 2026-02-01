import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@repo/db";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  eventDate: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { name, email, message, eventDate } = result.data;

    // 1. Save to DB
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        message,
        eventDate: eventDate ? new Date(eventDate) : null,
      },
    });

    // 2. Send Email (if API key exists)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", // Update with verified domain
        to: process.env.CONTACT_TO_EMAIL || "admin@example.com",
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nDate: ${eventDate || "N/A"}\n\nMessage:\n${message}`,
      });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
