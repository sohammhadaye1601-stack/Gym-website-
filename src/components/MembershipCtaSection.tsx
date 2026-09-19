import React from 'react';
import { WebsiteContent } from '../types';
import { ArrowRight, MessageSquare, ShieldCheck, Flame } from 'lucide-react';

interface MembershipCtaSectionProps {
  content: WebsiteContent;
  onScrollTo: (id: string) => void;
  onOpenWhatsapp: () => void;
}

export const MembershipCtaSection: React.FC<MembershipCtaSectionProps> = ({
  content,
  onScrollTo,
  onOpenWhatsapp,
}) => {
  return (
    <section className="py-20 relative bg-[#080808] overflow-hidden">
      {/* Background with athletic red aura */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c0808] via-[#121212] to-[#0d0d0d] border border-neutral-800 p-8 sm:p-14 lg:p-16 shadow-2xl">
          {/* Subtle decorative athletic stripes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E60000]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#E60000]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E60000]/20 border border-[#E60000]/40 mb-6">
              <Flame className="w-3.5 h-3.5 text-[#E60000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E60000]">
                Begin Your Journey
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white mb-4 leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              {content.cta.headline}
            </h2>

            <p
              className="text-lg sm:text-2xl font-semibold uppercase tracking-wider text-neutral-300 mb-8"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {content.cta.subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={() => onScrollTo('contact')}
                className="px-8 py-4 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-sm font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-3 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg athletic-glow cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>{content.cta.buttonEnquire}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWhatsapp}
                className="px-8 py-4 rounded bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-[#E60000] text-white text-sm font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{content.cta.buttonWhatsapp}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E60000]" />
                <span>Certified Fitness Instructors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E60000]" />
                <span>Unisex Facility</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E60000]" />
                <span>Physiotherapy & Diet Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
