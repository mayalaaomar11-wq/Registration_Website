export default function Header() {
  return (
    <div className="flex flex-col items-center text-center relative z-10 max-w-2xl mx-auto">
      <div className="bg-cream rounded-2xl px-5 py-3 shadow-lg shadow-black/20 mb-5 flex items-center justify-center">
        <img
          src="/logo-removebg-preview.png"
          alt="Suez University Student Chapter Logo"
          className="w-32 h-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden w-16 h-16 bg-navy rounded-xl items-center justify-center font-bold text-copper-light text-xl">
          MA
        </div>
      </div>

      <span className="inline-block border border-copper/60 bg-navy-900/40 text-copper-light rounded-full px-5 py-1.5 text-[11px] tracking-[0.2em] uppercase font-medium">
        Applications Open
      </span>

      <h1 className="font-display text-3xl sm:text-4xl text-cream mt-4 leading-tight">
        Join our innovative community
      </h1>
      <p className="text-cream/70 text-sm mt-2">
        Suez University Student Chapter
      </p>
    </div>
  );
}