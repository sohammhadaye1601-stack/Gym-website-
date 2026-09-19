import React from 'react';
import { WebsiteContent } from '../types';
import { Sparkles, UploadCloud, ArrowRight } from 'lucide-react';

interface TransformationSectionProps {
  content: WebsiteContent;
  onOpenAdmin: () => void;
  onScrollTo: (id: string) => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  content,
  onOpenAdmin,
  onScrollTo,
}) => {
  return (
    <section id="results" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#E60000]/15 border border-[#E60000]/30 mb-3">
            <Sparkles className="w-3 h-3 text-[#E60000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
              {content.results.badge}
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-3"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {content.results.heading}
          </h2>

          <p
            className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#E60000]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {content.results.subheading}
          </p>

          <p className="text-xs text-neutral-400 mt-2 max-w-lg mx-auto">
            Authentic dedication under certified fitness coaches. No shortcuts, just steady physical transformation.
          </p>
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.results.items.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-[#111111] border border-neutral-800 hover:border-[#E60000] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.imageAfter}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700 text-xs font-bold text-white tracking-wide">
                    {item.duration}
                  </span>
                </div>

                {item.isPlaceholder && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 text-[10px] text-neutral-300 uppercase tracking-wider">
                      Verified Member
                    </span>
                  </div>
                )}
              </div>

              {/* Text / Achievement */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold uppercase text-white tracking-wide mb-2 group-hover:text-[#E60000] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#E60000] mb-2">{item.achievement}</p>
                  {item.notes && <p className="text-xs text-neutral-400 leading-relaxed">{item.notes}</p>}
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                    SLAM Journey
                  </span>
                  <button
                    onClick={() => onScrollTo('contact')}
                    className="text-xs text-neutral-300 hover:text-[#E60000] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>Start Yours</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Owner Upload Callout */}
        <div className="mt-12 p-5 rounded-xl bg-neutral-900/70 border border-dashed border-neutral-750 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E60000]/10 flex items-center justify-center text-[#E60000] shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Gym Owner Notice: Upload New Client Progress</p>
              <p className="text-xs text-neutral-400">
                You can easily add or replace member transformation pictures and stories directly from the Admin Panel.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 rounded bg-neutral-800 hover:bg-[#E60000] text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shrink-0"
          >
            Manage Photos
          </button>
        </div>
      </div>
    </section>
  );
};
