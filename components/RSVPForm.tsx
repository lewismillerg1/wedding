"use client";

import { useFormState, useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { submitRSVP, type RSVPState } from "@/app/actions/rsvp";

const initialState: RSVPState = { status: "idle", message: "" };

const inputClass =
  "w-full border border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8975A]/40 focus:border-[#B8975A] transition-all duration-200 bg-white min-h-[52px] font-sans";

const labelClass =
  "block text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-stone-400 mb-2";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase font-sans py-4 px-8 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] mt-2"
    >
      {pending ? "Sending…" : "Confirm RSVP"}
    </button>
  );
}

export default function RSVPForm() {
  const [state, formAction] = useFormState(submitRSVP, initialState);

  return (
    <section id="rsvp" className="py-16 md:py-24 px-6 bg-[#FAF7F2]">
      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {state.status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#B8975A]/40 mb-8">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 text-[#B8975A]"
                >
                  <path
                    d="M4 10l4.5 4.5L16 6"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-900 mb-4">
                See You There
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed font-sans">
                {state.message}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-stone-900 mb-3">
                  Join Us
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed font-sans">
                  Kindly RSVP below. Space is limited to 50 guests.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-stone-100 p-6 sm:p-8">
                <form action={formAction} className="space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full Name{" "}
                      <span className="text-[#B8975A]">*</span>
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

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email{" "}
                      <span className="text-[#B8975A]">*</span>
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

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone{" "}
                      <span className="text-[#B8975A]">*</span>
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

                  <div className="flex items-center gap-3 py-1">
                    <div className="relative shrink-0">
                      <input
                        id="plus_one"
                        name="plus_one"
                        type="checkbox"
                        className="peer w-5 h-5 appearance-none rounded-md border border-stone-300 bg-white checked:bg-stone-900 checked:border-stone-900 focus:outline-none focus:ring-2 focus:ring-[#B8975A]/40 transition-all cursor-pointer"
                      />
                      <svg
                        className="absolute inset-0 m-auto w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <label
                      htmlFor="plus_one"
                      className="text-sm text-stone-600 cursor-pointer select-none font-sans"
                    >
                      I will be bringing a plus-one
                    </label>
                  </div>

                  <div>
                    <label htmlFor="dietary_restrictions" className={labelClass}>
                      Dietary Restrictions{" "}
                      <span className="text-stone-300 font-normal normal-case tracking-normal text-xs">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="dietary_restrictions"
                      name="dietary_restrictions"
                      rows={3}
                      placeholder="Any allergies or dietary needs…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {state.status === "error" && (
                    <p
                      role="alert"
                      className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-sans"
                    >
                      {state.message}
                    </p>
                  )}

                  <SubmitButton />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
