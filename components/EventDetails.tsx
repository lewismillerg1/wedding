"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-60px" };

export default function EventDetails() {
  return (
    <section className="py-16 md:py-24 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center text-2xl sm:text-3xl font-display font-light tracking-wide text-stone-900 mb-10 md:mb-12"
        >
          The Wedding
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8975A] mb-4 font-sans font-medium">
              Sealing Ceremony
            </p>
            <h3 className="text-xl font-display font-medium text-stone-900 mb-3">
              Draper Temple
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              May 27, 2026
              <br />
              12:30 PM
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8975A] mb-4 font-sans font-medium">
              Reception
            </p>
            <h3 className="text-xl font-display font-medium text-stone-900 mb-3">
              Terra Vista Clubhouse & pool
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              Apartment Terra Vista
              <br />
              Lehi, Utah
              <br />
              4:00 PM onwards
              <br />
              Food, pool &amp; hot tub
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
