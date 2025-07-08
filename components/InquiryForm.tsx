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
      className="p-4 mx-auto max-w-xl bg-secondary"
    >
      <div>
        <h1 className="text-2xl font-semibold text-center">Contact</h1>
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral rounded-md focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral rounded-md focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral rounded-md focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Message</label>
          <textarea
            name="message"
            placeholder="Enter Message"
            rows={4}
            required
            className="w-full px-4 text-surface bg-neutral rounded-md focus:border-ring focus:bg-neutral text-sm pt-3 outline-0 transition-all"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-accent-50 bg-secondary-900 rounded-md hover:bg-secondary/90 tracking-wide text-[15px] px-4 py-2 w-full outline-0 cursor-pointer"
        >
          Send
        </button>
        {success && (
          <div className="flex justify-center items-center my-4">
            <span className="ml-2 text-lg">Message sent!</span>
          </div>
        )}
      </div>
    </form>
  );
};
export default InquiryForm;
