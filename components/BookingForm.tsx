import React, { useState } from "react";

const BookingForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [focus, setFocus] = useState("");

  // Helper to count words
  const wordCount = focus.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send an email to the user with the booking details
    const response = await fetch("/api/post-email-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        birthDate,
        birthTime,
        focus,
      }),
    });
    if (response.ok) {
      alert("Booking submitted! (Payment integration coming soon)");
    } else {
      alert("Failed to submit booking");
    }
  };

  // Format date for display
  const formatDateForDisplay = (dateStr: string, timeStr: string) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    let formatted = date.toLocaleDateString("en-GB", options);

    if (!unknownTime && timeStr) {
      const [hours, minutes] = timeStr.split(":");
      const timeDate = new Date();
      timeDate.setHours(parseInt(hours), parseInt(minutes));
      const timeFormatted = timeDate.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      formatted += ` at ${timeFormatted}`;
    }

    return formatted;
  };

  const isValidDate = () => {
    if (!birthDate) return false;
    if (!unknownTime && !birthTime) return false;

    // Check if date is not in the future
    const selectedDate = new Date(
      birthDate + (birthTime ? `T${birthTime}` : "")
    );
    return selectedDate <= new Date();
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-neutral-200 font-serif overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary-900 text-center">
            Book a 90-Minute Session
          </h2>
          {/* <div className="text-center mb-8">
            <span className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-lg font-semibold">
              £85
            </span>
          </div> */}
          <div className="mb-8">
            <label className="block mb-3 font-medium text-primary-800 text-lg">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-medium text-primary-800 text-lg">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-medium text-primary-800 text-lg">
              Birth Place
            </label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-medium text-primary-800 text-lg">
              Birth Date & Time
            </label>

            <label className="flex items-center gap-3 mb-4 text-neutral-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={unknownTime}
                onChange={(e) => {
                  setUnknownTime(e.target.checked);
                  if (e.target.checked) {
                    setBirthTime("");
                  }
                }}
                className="w-5 h-5 accent-accent-700 border-2 border-neutral-300 rounded"
              />
              <span className="text-base">I don't know the exact time</span>
            </label>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
                  required
                />
              </div>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  unknownTime
                    ? "max-h-0 opacity-0 pointer-events-none"
                    : "max-h-24 opacity-100"
                }`}
              >
                <div className="pt-0">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all bg-white"
                    required={!unknownTime}
                  />
                </div>
              </div>
            </div>

            {(birthDate || birthTime) && (
              <div className="mt-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <div className="text-sm text-primary-700 font-medium">
                  Selected: {formatDateForDisplay(birthDate, birthTime)}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-medium text-primary-800 text-lg">
              Session Focus
            </label>
            <textarea
              value={focus}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/);
                if (words.length <= 250) setFocus(e.target.value);
              }}
              className="w-full border-2 border-neutral-300 rounded-lg px-4 py-3 text-base focus:border-primary-700 focus:ring-2 focus:ring-primary-200 focus:outline-none bg-white text-neutral-900 font-serif resize-none transition-all"
              rows={6}
              placeholder="Tell us what you'd like to focus on in your session..."
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-neutral-500">
                Share your goals, questions, or areas of interest
              </span>
              <span className="text-sm font-medium text-neutral-600">
                {wordCount} / 250 words
              </span>
            </div>
          </div>

          <div className="mb-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-primary-800 text-lg">
                  90-minute session
                </div>
                <div className="text-sm text-neutral-600 mt-1">
                  In-depth consultation
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-700">£85</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValidDate() || !focus.trim()}
            className="w-full bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Pay & Book (Coming Soon)
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
