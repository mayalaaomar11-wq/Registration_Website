import { FaLink, FaFacebook, FaLinkedin, FaUser, FaLightbulb, FaUsers, FaGraduationCap, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const inputClass = "w-full bg-white border border-copper/50 rounded-full px-5 py-3 text-base text-navy placeholder:text-copper/60 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all";
const areaClass = "w-full bg-white border border-copper/50 rounded-2xl px-5 py-3 text-base text-navy placeholder:text-copper/60 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all resize-none";
const labelClass = "text-sm font-medium text-navy";
const primaryBtn = "bg-navy hover:bg-navy-700 text-white font-semibold py-3.5 px-6 rounded-full shadow-lg shadow-navy/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
const backBtn = "border border-copper/60 text-navy hover:bg-copper/10 font-semibold py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer";

const steps = ['Personal', 'Experience', 'Committee', 'Academic', 'Social'];

const SectionTitle = ({ icon, children }) => (
  <div className="flex items-center gap-2.5 pb-3 border-b border-copper/30">
    <span className="text-copper text-lg">{icon}</span>
    <h2 className="font-display text-lg tracking-wide text-navy uppercase">{children}</h2>
  </div>
);

const Required = () => <span className="text-copper-dark"> *</span>;

export default function RegisterForm({ formData, handleChange, handleSubmit, currentStep, nextStep, prevStep, isSubmitting = false }) {

  const committeesList = [
    "PR", "HR", "Operation", "Technical", "Web Development", "Social Media", "Multi Media"
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-navy tracking-wide">Step {currentStep} of 5</span>
        </div>
        <div className="h-1.5 rounded-full bg-copper/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-navy to-copper transition-all duration-500"
            style={{ width: `${currentStep * 20}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`text-[10px] sm:text-xs ${currentStep === i + 1 ? 'text-navy font-semibold' : 'text-copper/70'}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-5 animate-fadeIn">
          <SectionTitle icon={<FaUser />}>Personal Information</SectionTitle>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Full Name<Required /> <span className="text-copper/80 font-normal">(Quadruple name)</span></label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="e.g. Quadruple full name" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>WhatsApp Number<Required /></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="010xxxxxxxx" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email Address<Required /></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="name@example.com" />
          </div>

          <button type="button" onClick={nextStep} className={`${primaryBtn} w-full mt-2`}>
            Next Step <FaArrowRight />
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-5 animate-fadeIn">
          <SectionTitle icon={<FaLightbulb />}>Experience</SectionTitle>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Have you participated in any student activity before?<Required /></label>
            <select name="hasStudentActivity" value={formData.hasStudentActivity} onChange={handleChange} required className={inputClass}>
              <option hidden value="" disabled>Select an option</option>
              <option value="Yes">Yes, I have</option>
              <option value="No">No, this is my first time</option>
            </select>
          </div>

          {formData.hasStudentActivity === "Yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-copper/5 rounded-2xl border border-copper/30">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Previous Chapter Name<Required /></label>
                <input type="text" name="previousChapter" value={formData.previousChapter || ''} onChange={handleChange} required className={inputClass} placeholder="e.g. IEEE, etc." />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Your Position<Required /></label>
                <input type="text" name="previousPosition" value={formData.previousPosition || ''} onChange={handleChange} required className={inputClass} placeholder="e.g. HR Member" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Why do you want to join MA Suez?<Required /></label>
            <textarea name="whyJoin" value={formData.whyJoin || ''} onChange={handleChange} required rows="3" className={areaClass} placeholder="Tell us why..." />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>What do you expect to gain?<Required /></label>
            <textarea name="whatToGain" value={formData.whatToGain || ''} onChange={handleChange} required rows="3" className={areaClass} placeholder="Your expectations..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={prevStep} className={`${backBtn} w-1/3`}>
              <FaArrowLeft /> Back
            </button>
            <button type="button" onClick={nextStep} className={`${primaryBtn} flex-1`}>
              Next Step <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-5 animate-fadeIn">
          <SectionTitle icon={<FaUsers />}>Preferred Committees</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>First Preference Committee<Required /></label>
              <select name="firstCommittee" value={formData.firstCommittee} onChange={handleChange} required className={inputClass}>
                <option value="" hidden disabled>Select First</option>
                {committeesList.map((comm, idx) => (<option key={idx} value={comm}>{comm}</option>))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Second Preference <span className="text-copper/80 font-normal">(Optional)</span></label>
              <select name="secondCommittee" value={formData.secondCommittee} onChange={handleChange} className={inputClass}>
                <option value="" hidden>Select Second</option>
                {committeesList.map((comm, idx) => (<option key={idx} value={comm}>{comm}</option>))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Why did you choose this committee?<Required /></label>
            <textarea name="whyThisCommittee" value={formData.whyThisCommittee || ''} onChange={handleChange} required rows="4" className={areaClass} placeholder="Explain why you picked your preferred committee..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={prevStep} className={`${backBtn} w-1/3`}>
              <FaArrowLeft /> Back
            </button>
            <button type="button" onClick={nextStep} className={`${primaryBtn} flex-1`}>
              Next Step <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-5 animate-fadeIn">
          <SectionTitle icon={<FaGraduationCap />}>Academic Information</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>University<Required /></label>
              <input type="text" name="university" value={formData.university} onChange={handleChange} required className={inputClass} placeholder="e.g. Suez University" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Faculty<Required /></label>
              <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} required className={inputClass} placeholder="e.g. Computers and Information" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Department <span className="text-copper/80 font-normal">(Optional)</span></label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className={inputClass} placeholder="e.g. Computer Science" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Academic Year / Level<Required /></label>
              <select name="academicYear" value={formData.academicYear} onChange={handleChange} required className={inputClass}>
                <option value="" hidden disabled>Select Level</option>
                <option value="Year 0">Year 0 (Prep)</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={prevStep} className={`${backBtn} w-1/3`}>
              <FaArrowLeft /> Back
            </button>
            <button type="button" onClick={nextStep} className={`${primaryBtn} flex-1`}>
              Next Step <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-5 animate-fadeIn">
          <SectionTitle icon={<FaLink />}>Social Links & Source</SectionTitle>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>How did you know about us?<Required /></label>
            <select name="howYouKnowUs" value={formData.howYouKnowUs} onChange={handleChange} required className={inputClass}>
              <option hidden value="" disabled>Select source</option>
              <option value="Facebook">Facebook Page</option>
              <option value="Friends">Friends</option>
              <option value="Booth">University</option>
              <option value="Events">Previous Events</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Facebook Profile</label>
              <div className="relative flex items-center">
                <FaFacebook className="absolute left-5 text-copper/70 text-base" />
                <input type="url" name="facebook" value={formData.facebook || ''} onChange={handleChange} className={`${inputClass} pl-12`} placeholder="facebook.com/..." />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>LinkedIn Profile</label>
              <div className="relative flex items-center">
                <FaLinkedin className="absolute left-5 text-copper/70 text-base" />
                <input type="url" name="linkedin" value={formData.linkedin || ''} onChange={handleChange} className={`${inputClass} pl-12`} placeholder="linkedin.com/in/..." />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={prevStep} className={`${backBtn} w-1/3`}>
              <FaArrowLeft /> Back
            </button>
            <button type="submit" disabled={isSubmitting} className={`${primaryBtn} flex-1`}>
              {isSubmitting ? 'Sending...' : 'Submit Application'}
            </button>
          </div>
        </div>
      )}

    </form>
  );
}