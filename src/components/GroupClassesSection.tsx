import React from 'react';
import { WebsiteContent, ClassItem } from '../types';
import { Calendar, Clock, UserCheck, Flame, ArrowRight } from 'lucide-react';

interface GroupClassesSectionProps {
  content: WebsiteContent;
  onEnquireClass: (className: string) => void;
}

export const GroupClassesSection: React.FC<GroupClassesSectionProps> = ({ content, onEnquireClass }) => {
  return (
    <section id="classes" className="py-24 bg-[#0c0c0c] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E60000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
                Community & High Energy
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              {content.groupClasses.heading}
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
            {content.groupClasses.description}
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.groupClasses.classes.map((cls: ClassItem) => (
            <div
              key={cls.id}
              className="group rounded-xl overflow-hidden bg-[#111111] border border-neutral-850 hover:border-[#E60000] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Intensity / Batch Tag */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded bg-[#080808]/90 border border-neutral-700 text-[10px] font-extrabold uppercase tracking-wider text-[#E60000] flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#E60000]" />
                    {cls.intensity}
                  </span>
                </div>
              </div>

              {/* Class Schedule Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold uppercase text-white tracking-wide mb-4 group-hover:text-[#E60000] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {cls.name}
                  </h3>

                  <div className="space-y-2.5 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#E60000] shrink-0" />
                      <span className="text-neutral-400">Days:</span>
                      <span className="font-semibold text-white">{cls.days}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#E60000] shrink-0" />
                      <span className="text-neutral-400">Timings:</span>
                      <span className="font-semibold text-white">{cls.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#E60000] shrink-0" />
                      <span className="text-neutral-400">Trainer:</span>
                      <span className="font-semibold text-white">{cls.trainer}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-4 border-t border-neutral-850">
                  <button
                    onClick={() => onEnquireClass(cls.name)}
                    className="w-full py-2.5 rounded bg-neutral-900 hover:bg-[#E60000] text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider border border-neutral-800 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <span>ENQUIRE ABOUT CLASSES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
