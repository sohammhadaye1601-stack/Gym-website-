import React, { useState } from 'react';
import { WebsiteContent, GalleryItem } from '../types';
import { Eye, X, ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  content: WebsiteContent;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Gym', 'Training', 'Group Classes', 'Sports', 'Team', 'Events'];

  const filteredItems =
    activeCategory === 'All'
      ? content.gallery
      : content.gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E60000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
                Visual Showcase
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              STUDIO GALLERY
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
            Take a look inside SLAM Nanganallur: specialized strength rigs, active training floors, and community workout sessions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E60000] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden bg-[#121212] border border-neutral-850 hover:border-[#E60000] transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] uppercase font-bold tracking-wider text-[#E60000] border border-neutral-800">
                  {item.category}
                </span>
              </div>

              {/* Title & Zoom Icon */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h4
                    className="text-base font-bold uppercase text-white tracking-wide leading-tight group-hover:text-[#E60000] transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E60000] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E60000] p-2 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-h-[78vh] w-auto object-contain rounded-lg border border-neutral-700 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="px-2.5 py-0.5 rounded bg-[#E60000] text-white text-[10px] font-bold uppercase tracking-widest mr-2">
                {lightboxImage.category}
              </span>
              <span className="text-base font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {lightboxImage.title}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
