import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Replace src with your actual couples photo — place it at /public/couple.jpg and use src="/couple.jpg" */}
      <Image
        src="https://picsum.photos/seed/wedding-lewis-nicole-mountains/1920/1080"
        alt="Lewis and Nicole"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />

      {/* Names and date */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-white text-5xl sm:text-6xl md:text-8xl font-light tracking-wide leading-tight mb-5">
          Lewis &amp; Nicole
        </h1>
        <p className="text-white/75 text-sm sm:text-base tracking-[0.25em] uppercase">
          May 27, 2026
        </p>
      </div>
    </section>
  );
}
