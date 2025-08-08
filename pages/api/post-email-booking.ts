export const runtime = "edge";
import { Resend } from "resend";

export interface BookingData {
  name: string;
  email: string;
  birthPlace: string;
  birthDate: string;
  birthTime: string;
  focus: string;
}

export default async function sendEmail(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: BookingData;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, birthPlace, birthDate, birthTime, focus } = body;

  if (!name || !email || !birthPlace || !birthDate || !birthTime || !focus) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_RECIPIENT_EMAIL) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const doSendEmails = !!Number(process.env.DO_SEND_EMAILS);

    if (!doSendEmails) {
      return new Response(
        JSON.stringify({
          success: true,
          message:
            "Email sending is disabled in the environment configuration.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await resend.emails.send({
      from: `datura@resend.dev`,
      to: process.env.INQUIRY_RECIPIENT_EMAIL,
      subject: `New Booking from ${name} ${email}`,
      text: `Name: ${name}\nEmail: ${email}\nBirth Place: ${birthPlace}\nBirth Date: ${birthDate} ${birthTime}\nFocus: ${focus}`,
    });

    if (result.error) {
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        result: result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
