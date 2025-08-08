import React, { useRef, useState } from "react";

const InquiryForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/post-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok && formRef.current) {
      formRef.current.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-4 mx-auto max-w-xl bg-white rounded-xl shadow-lg border border-neutral-200 font-serif overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary-900 text-center">
          Get in Touch
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            required
            className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows={6}
            required
            className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none bg-white text-neutral-900 font-serif resize-none transition-all"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => {
            // Since we can't use a form in the artifact, this would need to be handled differently
            // In your actual implementation, you'd keep the form element and this handleSubmit logic
            console.log("Form submission would be handled here");
          }}
          className="w-full bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform active:scale-95"
        >
          Send Message
        </button>

        {success && (
          <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-200 text-center">
            <span className="text-accent-700 font-medium">
              Message sent successfully!
            </span>
          </div>
        )}
      </div>
    </form>
  );
};

export default InquiryForm;
