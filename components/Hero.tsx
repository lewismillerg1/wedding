"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";

function BotanicalDivider() {
  return (
    <svg
      viewBox="0 0 240 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] sm:w-[180px] md:w-[220px]"
      aria-hidden="true"
    >
      <line x1="0" y1="14" x2="98" y2="14" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M120 5 L129 14 L120 23 L111 14 Z" stroke="#B8975A" strokeWidth="0.75" fill="none" />
      <line x1="142" y1="14" x2="240" y2="14" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M70 14 C66 8 58 5 53 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M70 14 C66 20 58 23 53 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M44 14 C40 8 32 5 27 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M44 14 C40 20 32 23 27 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M170 14 C174 8 182 5 187 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M170 14 C174 20 182 23 187 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M196 14 C200 8 208 5 213 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M196 14 C200 20 208 23 213 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const shouldReduce = useReducedMotion();

  function fadeUp(delayMs: number) {
    const transition: Transition = {
      duration: 0.75,
      delay: shouldReduce ? 0 : delayMs / 1000,
      ease: "easeOut",
    };
    return {
      initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
      transition,
    };
  }

  function fadeIn(delayMs: number) {
    const transition: Transition = {
      duration: 0.9,
      delay: shouldReduce ? 0 : delayMs / 1000,
      ease: "easeOut",
    };
    return {
      initial: shouldReduce ? { opacity: 1 } : { opacity: 0 },
      animate: { opacity: 1 },
      transition,
    };
  }

  return (
    <section className="min-h-dvh flex items-center justify-center bg-[#FAF7F2] px-6 py-24">
      <div className="text-center flex flex-col items-center">
        <motion.h1
          {...fadeUp(0)}
          className="font-display font-light text-[60px] leading-[0.9] sm:text-[88px] md:text-[112px] lg:text-[136px] text-stone-900 tracking-tight"
        >
          Lewis
        </motion.h1>

        <motion.p
          {...fadeUp(220)}
          className="font-script text-[38px] sm:text-[52px] md:text-[60px] text-[#B8975A] leading-snug -my-1 sm:-my-2"
        >
          and
        </motion.p>

        <motion.h1
          {...fadeUp(440)}
          className="font-display font-light text-[60px] leading-[0.9] sm:text-[88px] md:text-[112px] lg:text-[136px] text-stone-900 tracking-tight"
        >
          Nicole
        </motion.h1>

        <motion.div {...fadeIn(750)} className="mt-9 mb-7">
          <BotanicalDivider />
        </motion.div>

        <motion.p
          {...fadeUp(1150)}
          className="font-sans text-[10px] tracking-[0.28em] uppercase text-stone-400"
        >
          May 27, 2026
        </motion.p>

        <motion.div {...fadeIn(1650)} className="mt-12">
          <motion.span
            animate={shouldReduce ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-block text-[#B8975A] text-sm select-none"
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
