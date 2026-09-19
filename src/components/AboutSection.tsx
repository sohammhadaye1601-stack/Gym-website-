import React from 'react';
import { WebsiteContent } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  content: WebsiteContent;
  onSelectFeature?: (index: number) => void;
  onScrollTo: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content, onScrollTo }) => {
  return (
    <section id="about" className="py-24 bg-[#0c0c0c] border-t border-neutral-900 relative">
      {/* Background subtle geometric slash */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-[#E60000]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E60000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
              Lifestyle & Fitness Ecosystem
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {content.about.heading}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {content.about.description}
          </p>
        </div>

        {/* 4 Visual Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.about.features.map((feature, idx) => (
            <div
              key={feature.number}
              id={`about-card-${feature.number}`}
              className="group relative rounded-xl overflow-hidden bg-[#111111] border border-neutral-800/90 hover:border-[#E60000] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Number Badge */}
                <div className="absolute top-3 left-3 bg-[#080808]/90 backdrop-blur-sm border border-neutral-700/80 px-2.5 py-1 rounded text-xs font-black tracking-widest text-[#E60000]">
                  {feature.number}
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold uppercase text-white tracking-wide mb-2.5 group-hover:text-[#E60000] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold group-hover:text-neutral-300 transition-colors">
                    SLAM Standard
                  </span>
                  <button
                    onClick={() => onScrollTo('services')}
                    className="w-8 h-8 rounded-full bg-neutral-900 group-hover:bg-[#E60000] flex items-center justify-center text-neutral-400 group-hover:text-white transition-all cursor-pointer"
                    aria-label={`Explore ${feature.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Red bottom accent line */}
              <div className="h-1 w-0 bg-[#E60000] group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
