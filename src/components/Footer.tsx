import React from 'react';
import { WebsiteContent } from '../types';
import { SlamLogo } from './SlamLogo';
import { Instagram, MapPin, Phone, Globe, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  content: WebsiteContent;
  onScrollTo: (id: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ content, onScrollTo, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <SlamLogo customLogoUrl={content.logoImage} size="md" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#E60000]">
              "{content.tagline}"
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              SLAM Lifestyle and Fitness Studio Nanganallur is a dedicated unisex gymnasium, sports training, and physiotherapy studio empowering Chennai to train with purpose.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-[#E60000] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={content.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-[#E60000] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={`https://${content.websiteUrl.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-[#E60000] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About SLAM
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  Training Verticals
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('classes')} className="hover:text-white transition-colors cursor-pointer">
                  Group Classes
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('results')} className="hover:text-white transition-colors cursor-pointer">
                  Member Progress
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Studio Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Enquiry & Consult
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Mentioned */}
          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              SERVICES OFFERED
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> Unisex Gym & Strength
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> Sports Training & Agility
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> Physiotherapy Support
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> Certified Fitness Instructors
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> Dietitian Guidance
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" /> High-Energy Group Classes
              </li>
            </ul>
          </div>

          {/* Col 4: Address & Contact */}
          <div className="space-y-3">
            <h4
              className="text-white text-sm font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              STUDIO LOCATION
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
              <span>{content.address}</span>
            </p>
            <p className="text-xs text-neutral-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E60000] shrink-0" />
              <span>{content.phone}</span>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Studio Owner Admin Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} SLAM Lifestyle and Fitness Studio Nanganallur. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E60000]" /> Verified Fitness Studio
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded bg-neutral-900 hover:bg-[#E60000] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
