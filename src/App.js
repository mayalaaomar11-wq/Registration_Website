import { useState } from 'react';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import SuccessScreen from './components/SuccessScreen';
import Footer from './components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

function App() {
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    whatsappBotPin: '',
    hasStudentActivity: '',
    previousChapter: '',
    previousPosition: '',
    whyJoin: '',
    whatToGain: '',
    howYouKnowUs: '',
    firstCommittee: '',
    secondCommittee: '',
    whyThisCommittee: '',
    university: '',
    faculty: '',
    department: '',
    academicYear: '',
    facebook: '',
    linkedin: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSupportBox, setShowSupportBox] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const n = (v) => (v && v.trim() ? v.trim() : null);
    const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/registrations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: key,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            full_name: formData.fullName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim().toLowerCase(),
            whatsapp_bot_pin: n(formData.whatsappBotPin),
            has_student_activity: formData.hasStudentActivity,
            previous_chapter: n(formData.previousChapter),
            previous_position: n(formData.previousPosition),
            why_join: formData.whyJoin,
            what_to_gain: formData.whatToGain,
            how_you_know_us: formData.howYouKnowUs,
            first_committee: formData.firstCommittee,
            second_committee: n(formData.secondCommittee),
            why_this_committee: formData.whyThisCommittee,
            university: formData.university,
            faculty: formData.faculty,
            department: n(formData.department),
            academic_year: formData.academicYear,
            facebook: n(formData.facebook),
            linkedin: n(formData.linkedin),
          }),
        }
      );

      if (res.status === 409) {
        alert('This email is already registered.');
      } else if (!res.ok) {
        throw new Error(await res.text());
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-red-50/20 text-slate-800 flex flex-col justify-between items-center font-['Cairo',sans-serif] p-4 md:p-8 relative overflow-hidden" dir="ltr">

      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="bg-white/95 backdrop-blur-2xl border border-blue-900/10 p-6 md:p-10 rounded-3xl shadow-2xl shadow-slate-200 w-full max-w-3xl relative z-10 my-auto">
        {!isSubmitted ? (
          <>
            <Header />
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </>
        ) : (
          <SuccessScreen onReset={handleReset} />
        )}
      </div>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
        {showSupportBox && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-green-500/30 text-white p-4 rounded-2xl shadow-2xl max-w-xs text-xs space-y-1 relative animate-fadeIn">
            <p className="text-slate-300">
              Having a <a href="https://wa.me/201069842136" target="_blank" rel="noopener noreferrer" className="text-green-400 font-semibold hover:underline">technical problem</a>?
            </p>
            <p className="text-slate-300">Contact me on WhatsApp:</p>
            <a href="https://wa.me/201069842136" target="_blank" rel="noopener noreferrer"
              className="text-green-400 font-bold hover:underline block pt-0.5">+201069842136</a>
          </div>
        )}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 bg-green-500 rounded-full animate-ping opacity-30"></div>
          <button
            onClick={() => setShowSupportBox(!showSupportBox)}
            className="w-14 h-14 bg-gradient-to-tr from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-500/40 border border-green-400/30 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            title="Toggle Support"
          >
            <FaWhatsapp className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;