import React from 'react';
import { WebsiteContent } from '../types';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Globe, ShieldCheck } from 'lucide-react';

interface LocationSectionProps {
  content: WebsiteContent;
  onOpenWhatsapp: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ content, onOpenWhatsapp }) => {
  return (
    <section id="location" className="py-24 bg-[#0c0c0c] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#E60000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
              Prime Nanganallur Hub
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            FIND SLAM.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Conveniently situated in the heart of Nanganallur, Chennai with spacious floor area and dedicated parking for members.
          </p>
        </div>

        {/* Location Grid: Details Card (5 cols) + Map (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Studio Details Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#121212] border border-neutral-800 p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E60000]">
                  Studio Address
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold uppercase text-white mt-1 mb-2"
                  style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                >
                  {content.fullName}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#E60000] shrink-0 mt-0.5" />
                  <span>{content.address}</span>
                </p>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-neutral-850">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
                  Training Hours
                </span>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E60000]" />
                      <span>Monday – Saturday:</span>
                    </span>
                    <span className="font-bold text-white">05:30 AM – 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5 pl-5">Sunday:</span>
                    <span className="font-semibold text-neutral-300">06:00 AM – 12:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-4 border-t border-neutral-850 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block">
                  Direct Communication
                </span>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#E60000]" /> Phone:
                  </span>
                  <a href={`tel:${content.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[#E60000] transition-colors">
                    {content.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#E60000]" /> Web:
                  </span>
                  <a
                    href={`https://${content.websiteUrl.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white text-xs truncate max-w-[200px]"
                  >
                    {content.websiteUrl}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-850 flex flex-col sm:flex-row gap-3">
              <a
                href={content.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <button
                onClick={onOpenWhatsapp}
                className="py-3 px-4 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 bg-[#121212] min-h-[380px] sm:min-h-[460px] shadow-xl relative">
            <iframe
              title="SLAM Fitness Studio Nanganallur Map Location"
              src={content.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 invert-[0.9] hover:grayscale-0 hover:invert-0 transition-all duration-700"
            />
            {/* Top map info tag */}
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-neutral-700 text-xs font-semibold text-white flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E60000]" />
              <span>SLAM Nanganallur — 1st Floor, 1st Main Rd</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
