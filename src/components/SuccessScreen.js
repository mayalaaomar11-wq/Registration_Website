import { FaCheck } from 'react-icons/fa';

export default function SuccessScreen({ onReset }) {
  return (
    <div className="text-center py-10 px-2 space-y-4 animate-fadeIn">
      <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-600 flex items-center justify-center shadow-lg shadow-navy/30 ring-4 ring-copper/30">
        <FaCheck className="text-copper-light text-3xl" />
      </div>
      <h2 className="font-display text-3xl text-navy">Registration Successful!</h2>
      <p className="text-navy/70 text-sm max-w-md mx-auto leading-relaxed">
        Thank you for applying to <strong className="text-navy">Suez University Student Chapter</strong>.<br />
        We have successfully received your application and will contact you via WhatsApp very soon.
      </p>
      <div className="pt-4">
        <button
          onClick={onReset}
          className="border border-copper/60 text-navy hover:bg-copper/10 font-semibold py-3 px-6 rounded-full transition text-sm cursor-pointer"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
}