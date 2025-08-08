export const runtime = "edge";
import { Resend } from "resend";

export interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function sendEmail(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: InquiryData;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_RECIPIENT_EMAIL) {
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const doSendEmails = !!Number(process.env.DO_SEND_EMAILS);

    if (!doSendEmails) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Email sending is disabled in the environment configuration.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await resend.emails.send({
      from: `hello@inquiries.datura.uk`,
      to: process.env.INQUIRY_RECIPIENT_EMAIL,
      subject: `New Inquiry from ${name}: ${subject}`,
      text: message,
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
