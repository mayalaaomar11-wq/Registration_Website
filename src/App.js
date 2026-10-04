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

  const requiredByStep = {
    1: ['fullName', 'phone', 'email'],
    2: ['hasStudentActivity', 'whyJoin', 'whatToGain'],
    3: ['firstCommittee', 'whyThisCommittee'],
    4: ['university', 'faculty', 'academicYear'],
    5: ['howYouKnowUs'],
  };

  const validateStep = (step) => {
    const fields = [...requiredByStep[step]];
    if (step === 2 && formData.hasStudentActivity === 'Yes') {
      fields.push('previousChapter', 'previousPosition');
    }
    const missing = fields.some((f) => !String(formData[f] || '').trim());
    if (missing) {
      alert('Please fill in all required fields before continuing.');
      return false;
    }
    if (step === 1) {
      const email = formData.email.trim();
      const phone = formData.phone.replace(/[\s-]/g, '');
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      if (!/^\+?[0-9]{10,15}$/.test(phone)) {
        alert('Please enter a valid phone number.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let s = 1; s <= 5; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        return;
      }
    }

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
    <div className="min-h-screen bg-cream font-sans text-navy flex flex-col" dir="ltr">

      <header className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy to-navy-600 px-4 pt-8 pb-28 rounded-b-[2.5rem]">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-copper/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-16 w-64 h-64 bg-copper/15 rounded-full blur-3xl pointer-events-none"></div>
        <Header />
      </header>

      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 -mt-20 flex-1">
        <div className="bg-cream-50 border border-copper/30 rounded-3xl shadow-xl shadow-navy/10 p-5 sm:p-8">
          {!isSubmitted ? (
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          ) : (
            <SuccessScreen onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />

      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-3">
        {showSupportBox && (
          <div className="bg-navy text-cream border border-copper/50 p-4 rounded-2xl shadow-2xl max-w-xs text-xs space-y-1 animate-fadeIn">
            <p className="text-cream/80">
              Having a <a href="https://wa.me/201069842136" target="_blank" rel="noopener noreferrer" className="text-copper-light font-semibold hover:underline">technical problem</a>?
            </p>
            <p className="text-cream/80">Contact me on WhatsApp:</p>
            <a href="https://wa.me/201069842136" target="_blank" rel="noopener noreferrer"
              className="text-copper-light font-bold hover:underline block pt-0.5">+201069842136</a>
          </div>
        )}
        <button
          onClick={() => setShowSupportBox(!showSupportBox)}
          className="w-12 h-12 bg-navy hover:bg-navy-700 rounded-full flex items-center justify-center text-copper-light shadow-xl shadow-navy/40 border border-copper/50 transition-all cursor-pointer"
          title="Toggle Support"
          aria-label="Toggle Support"
        >
          <FaWhatsapp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default App;