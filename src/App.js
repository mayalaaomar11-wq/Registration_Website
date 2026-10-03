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
            phone: formData.p