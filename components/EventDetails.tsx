export default function EventDetails() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center text-3xl font-light tracking-wide text-stone-900 mb-12">
          The Wedding
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Sealing Ceremony */}
          <div className="border border-stone-200 rounded-xl p-8 shadow-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-stone-400 mb-4">
              Sealing Ceremony
            </p>
            <h3 className="text-xl font-medium text-stone-900 mb-3">
              Lincoln Temple
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              May 27, 2026
              <br />
              3:00 PM
            </p>
          </div>

          {/* Reception */}
          <div className="border border-stone-200 rounded-xl p-8 shadow-sm">
            <p className="text-xs tracking-[0.18em] uppercase text-stone-400 mb-4">
              Reception
            </p>
            <h3 className="text-xl font-medium text-stone-900 mb-3">
              Terra Vista Clubhouse
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              Apartment Terra Vista
              <br />
              Lehi, Utah
              <br />
              5:00 PM onwards
              <br />
              Food, pool &amp; hot tub
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
