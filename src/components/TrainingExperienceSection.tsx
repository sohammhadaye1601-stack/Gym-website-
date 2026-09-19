import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { Eye, ChevronRight } from 'lucide-react';

interface TrainingExperienceProps {
  content: WebsiteContent;
  onScrollTo: (id: string) => void;
}

export const TrainingExperienceSection: React.FC<TrainingExperienceProps> = ({ content, onScrollTo }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = content.trainingExperience.images;

  return (
    <section id="training-experience" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E60000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
              Atmosphere & Rig
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {content.trainingExperience.heading}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {content.trainingExperience.subtitle}
          </p>
        </div>

        {/* Editorial Feature Layout: Large Spotlight Image + Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Editorial Spotlight (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[400px] sm:min-h-[500px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
            <img
              src={items[activeIdx]?.image}
              alt={items[activeIdx]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="px-3 py-1 rounded bg-[#E60000] text-white text-[11px] font-extrabold uppercase tracking-widest inline-block mb-2">
                {items[activeIdx]?.category}
              </span>
              <h3
                className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-wide drop-shadow-md"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
              >
                {items[activeIdx]?.title}
              </h3>
              <p className="text-sm text-neutral-300 mt-2 max-w-xl">
                High standard equipment, safety collars, free weights, and pristine floor upkeep for serious training.
              </p>
            </div>
          </div>

          {/* Thumbnail list (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                  activeIdx === idx
                    ? 'bg-[#151515] border-[#E60000] shadow-lg translate-x-1'
                    : 'bg-[#0f0f0f] border-neutral-850 hover:border-neutral-700 hover:bg-[#121212]'
                }`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-800">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E60000]">
                    {item.category}
                  </span>
                  <h4
                    className="text-lg font-bold uppercase text-white truncate tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <div className={`p-1.5 rounded-full ${activeIdx === idx ? 'text-[#E60000]' : 'text-neutral-600'}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}

            <div className="pt-2">
              <button
                onClick={() => onScrollTo('gallery')}
                className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Eye className="w-4 h-4 text-[#E60000]" />
                <span>View Full Studio Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
