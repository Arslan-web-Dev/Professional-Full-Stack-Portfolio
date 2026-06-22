import { NextRequest, NextResponse } from "next/server";

// Simple helper to sanitize HTML input
function sanitizeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // Simple server-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Sanitize values to prevent HTML injection/XSS in email client
    const cleanName = sanitizeHtml(name.trim());
    const cleanEmail = sanitizeHtml(email.trim());
    const cleanMessage = sanitizeHtml(message.trim()).replace(/\n/g, "<br>");

    // Option A: Use Resend to send email
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key_here") {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "arslan@example.com",
        subject: `Portfolio Contact: ${cleanName}`,
        html: `<p><strong>Name:</strong> ${cleanName}</p><p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Message:</strong><br>${cleanMessage}</p>`,
      });
    } else {
      console.warn("RESEND_API_KEY is not configured. Email not sent.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
