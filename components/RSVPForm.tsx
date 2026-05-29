"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitRSVP, type RSVPState } from "@/app/actions/rsvp";

const initialState: RSVPState = { status: "idle", message: "" };

const inputClass =
  "w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-colors bg-white";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-stone-900 text-white text-sm tracking-widest uppercase py-4 px-8 rounded-xl hover:bg-stone-700 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "RSVP"}
    </button>
  );
}

export default function RSVPForm() {
  const [state, formAction] = useFormState(submitRSVP, initialState);

  if (state.status === "success") {
    return (
      <section id="rsvp" className="py-24 px-6 bg-stone-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-light tracking-wide text-stone-900 mb-4">
            See You There
          </h2>
          <p className="text-stone-500 text-base leading-relaxed">
            {state.message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-stone-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-wide text-stone-900 mb-3">
            Join Us
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Kindly RSVP below. Space is limited to 50 guests.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Full Name{" "}
              <span className="text-stone-400 font-normal">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Email{" "}
              <span className="text-stone-400 font-normal">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Phone{" "}
              <span className="text-stone-400 font-normal">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>

          {/* Plus One */}
          <div className="flex items-center gap-3 py-1">
            <input
              id="plus_one"
              name="plus_one"
              type="checkbox"
              className="w-4 h-4 border-stone-300 rounded text-stone-900 focus:ring-stone-400 cursor-pointer"
            />
            <label
              htmlFor="plus_one"
              className="text-sm text-stone-700 cursor-pointer select-none"
            >
              I will be bringing a plus-one
            </label>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label
              htmlFor="dietary_restrictions"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Dietary restrictions{" "}
              <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="dietary_restrictions"
              name="dietary_restrictions"
              rows={3}
              placeholder="Any allergies or dietary needs..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Error message */}
          {state.status === "error" && (
            <p
              role="alert"
              className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3"
            >
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
