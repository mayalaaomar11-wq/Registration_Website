import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const whatsappNumber = "201069842136";

  return (
    <footer className="w-full max-w-2xl mx-auto px-4 py-8 mt-6 text-center text-sm text-navy/70">
      <div className="h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mb-6"></div>
      <p className="font-medium">Need help or want to get in touch?</p>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full border border-copper/50 text-navy font-semibold hover:bg-copper/10 transition-colors"
      >
        <FaWhatsapp className="text-copper-dark text-base" /> Contact via WhatsApp
      </a>
      <p className="text-xs text-navy/50 mt-5">
        © {new Date().getFullYear()} MA Suez University Student Chapter. All rights reserved.
      </p>
    </footer>
  );
}