import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  "use server";
  const { name, email, subject, message }: InquiryData = req.body;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_RECIPIENT_EMAIL) {
    res.status(500).json({ error: "Server configuration error" });
    return;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Sending email with the following data:", {
      name,
      email,
      subject,
      message,
    });

    const doSendEmails = !!Number(process.env.DO_SEND_EMAILS);

    let result;
    if (!doSendEmails) {
      console.log(
        "Email sending is disabled in the environment configuration."
      );
      res.status(200).json({
        success: true,
        message: "Email sending is disabled in the environment configuration.",
      });
      return;
    }

    result = await resend.emails.send({
      from: `datura@resend.dev`,
      to: process.env.INQUIRY_RECIPIENT_EMAIL,
      subject: `New Inquiry from ${name}: ${subject}`,
      text: message,
    });

    if (result.error) {
      console.error("Error sending email:", result.error.message);
      res.status(500).json({ error: "Failed to send email" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
