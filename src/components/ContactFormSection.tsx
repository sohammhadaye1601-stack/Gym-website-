import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { saveNewEnquiry } from '../utils/storage';
import { CheckCircle2, Send, Phone, MessageSquare, ShieldCheck, Mail, User } from 'lucide-react';

interface ContactFormSectionProps {
  content: WebsiteContent;
  initialInterest?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  content,
  initialInterest = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: initialInterest || 'Gym',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if initialInterest prop changes
  React.useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
  }, [initialInterest]);

  const interestOptions = [
    'Gym',
    'Personal Training',
    'Sports Training',
    'Group Classes',
    'Physiotherapy',
    'Diet / Nutrition',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate instantaneous local lead persistence
    setTimeout(() => {
      saveNewEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        interest: formData.interest,
        message: formData.message.trim(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      interest: 'Gym',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E60000]/15 border border-[#E60000]/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E60000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
                Direct Enquiries
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              START YOUR FITNESS JOURNEY
            </h2>

            <p className="text-base text-neutral-300 max-w-lg mx-auto">
              Fill in your details below. Our certified coaches at SLAM Nanganallur will assist you with batch timings, consultations, and studio walk-ins.
            </p>
          </div>

          {/* Form Container */}
          <div className="rounded-2xl bg-[#111111] border border-neutral-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 px-4 text-center animate-fadeIn flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E60000]/20 border border-[#E60000] flex items-center justify-center text-[#E60000] mb-6 shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3
                  className="text-3xl sm:text-4xl font-extrabold uppercase text-white mb-2"
                  style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                >
                  ENQUIRY RECEIVED
                </h3>

                <p className="text-base sm:text-lg text-neutral-200 font-medium max-w-md mx-auto mb-4">
                  Thank you. The SLAM team will get in touch with you soon.
                </p>

                <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-8">
                  We look forward to welcoming you to SLAM Lifestyle and Fitness Studio, Nanganallur.
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Full Name <span className="text-[#E60000]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 pl-10 rounded-xl bg-neutral-900/90 border border-neutral-750 focus:border-[#E60000] focus:ring-1 focus:ring-[#E60000] text-sm text-white placeholder-neutral-500 outline-none transition-all"
                      />
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Phone Number <span className="text-[#E60000]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98400 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 pl-10 rounded-xl bg-neutral-900/90 border border-neutral-750 focus:border-[#E60000] focus:ring-1 focus:ring-[#E60000] text-sm text-white placeholder-neutral-500 outline-none transition-all"
                      />
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 pl-10 rounded-xl bg-neutral-900/90 border border-neutral-750 focus:border-[#E60000] focus:ring-1 focus:ring-[#E60000] text-sm text-white placeholder-neutral-500 outline-none transition-all"
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-4" />
                    </div>
                  </div>

                  {/* Interested In */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Interested In
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-750 focus:border-[#E60000] focus:ring-1 focus:ring-[#E60000] text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-neutral-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Message / Fitness Goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your training goals, current routine, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-750 focus:border-[#E60000] focus:ring-1 focus:ring-[#E60000] text-sm text-white placeholder-neutral-500 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#E60000] hover:bg-[#CC0000] text-white text-sm font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl athletic-glow cursor-pointer disabled:opacity-60"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs text-center pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#E60000]" />
                  <span>Your information is private and will only be used to contact you regarding SLAM Nanganallur.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
