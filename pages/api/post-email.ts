export interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function sendEmail(req, res): Promise<void> {
  "use server";
  console.log("I should be private")
  console.log(process.env);
  console.log("Processing email submission...");
  console.log(req.body);
}
