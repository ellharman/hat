const InquiryForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/post-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto max-w-xl bg-secondary">
      <div>
        <h1 className="text-2xl text-surface font-semibold text-center">
          Contact
        </h1>
        <div>
          <label className="text-sm text-neutral-400 font-medium mb-2 block">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral  focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-400 font-medium mb-2 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral  focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-400 font-medium mb-2 block">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            required
            className="w-full py-2.5 px-4 text-surface bg-neutral  focus:border-ring focus:bg-neutral text-sm outline-0 transition-all"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-400 font-medium mb-2 block">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Enter Message"
            rows={4}
            required
            className="w-full px-4 text-surface bg-neutral  focus:border-ring focus:bg-neutral text-sm pt-3 outline-0 transition-all"
          ></textarea>
        </div>
        <button
          type="submit"
          className="!mt-8 text-background bg-primary hover:bg-primary/90 tracking-wide text-[15px] px-4 py-2 w-full outline-0 cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default InquiryForm;
