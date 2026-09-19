import React from 'react';
import { WebsiteContent } from '../types';
import { Check, Award, ShieldCheck, Flame, HeartPulse, Apple, Users, ArrowRight } from 'lucide-react';

interface WhySlamSectionProps {
  content: WebsiteContent;
  onScrollTo: (id: string) => void;
}

export const WhySlamSection: React.FC<WhySlamSectionProps> = ({ content, onScrollTo }) => {
  const iconList = [
    <Award className="w-6 h-6 text-[#E60000]" />,
    <ShieldCheck className="w-6 h-6 text-[#E60000]" />,
    <Flame className="w-6 h-6 text-[#E60000]" />,
    <HeartPulse className="w-6 h-6 text-[#E60000]" />,
    <Apple className="w-6 h-6 text-[#E60000]" />,
    <Users className="w-6 h-6 text-[#E60000]" />,
  ];

  return (
    <section id="why-slam" className="py-24 bg-[#0c0c0c] border-y border-neutral-900 relative overflow-hidden">
      {/* Dynamic Red angled accent stripe in background */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#E60000]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E60000]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E60000]/15 border border-[#E60000]/40 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
              The SLAM Advantage
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {content.whySlam.heading}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {content.whySlam.subtitle}
          </p>
        </div>

        {/* 6 Feature Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.whySlam.points.map((point, index) => (
            <div
              key={index}
              className="group p-7 rounded-xl bg-[#121212] border border-neutral-800 hover:border-[#E60000] transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Red Glow on Hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E60000]/0 group-hover:bg-[#E60000]/10 rounded-bl-full transition-all duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center group-hover:scale-110 group-hover:border-[#E60000] transition-all duration-300 shadow-md">
                    {iconList[index % iconList.length]}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#E60000]/20 flex items-center justify-center text-[#E60000]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3
                  className="text-xl font-bold uppercase text-white tracking-wide mb-2 group-hover:text-[#E60000] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                >
                  {point.title}
                </h3>

                <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                  STANDARD 0{index + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-neutral-800 group-hover:bg-[#E60000] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#161616] via-[#1a1111] to-[#161616] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4
              className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-1"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              EXPERIENCE THE DIFFERENCE IN NANGANALLUR
            </h4>
            <p className="text-sm text-neutral-400">
              Walk into No 35A, 1st Floor, 1st Main Road or schedule your first session.
            </p>
          </div>
          <button
            onClick={() => onScrollTo('contact')}
            className="shrink-0 px-6 py-3 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span>JOIN SLAM NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
