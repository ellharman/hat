"use server";
export async function sendBookingInquiryEmail(formData: FormData) {
  "use server";
  // turn formData into an object
  const data = Object.fromEntries(formData.entries());
  console.log("Form Data:", data);
}
