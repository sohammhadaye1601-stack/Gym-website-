import React from 'react';
import { WebsiteContent } from '../types';
import { SlamLogo } from './SlamLogo';
import { MapPin, ChevronDown, MessageSquare, ArrowRight, ShieldCheck, Dumbbell, Award, Users } from 'lucide-react';

interface HeroProps {
  content: WebsiteContent;
  onScrollTo: (id: string) => void;
  onOpenWhatsapp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onScrollTo, onOpenWhatsapp }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#080808]">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.heroImage}
          alt="SLAM Fitness Studio Nanganallur Gym Floor"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Gradients to guarantee high contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
        {/* Subtle athletic red atmospheric glow on top right */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E60000]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Location & Brand Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 mb-6 backdrop-blur-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#E60000] animate-ping" />
            <MapPin className="w-3.5 h-3.5 text-[#E60000]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {content.hero.locationBadge}
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-[11px] font-medium tracking-wide text-neutral-400">
              Unisex Gym & Wellness Studio
            </span>
          </div>

          {/* SLAM Logo display in hero */}
          <div className="mb-4">
            <SlamLogo customLogoUrl={content.logoImage} size="lg" />
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.92] mb-5 drop-shadow-lg"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {content.hero.heading}
          </h1>

          {/* Supporting Text */}
          <p
            className="text-lg sm:text-2xl font-semibold uppercase tracking-wider text-[#E60000] mb-3"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {content.hero.subheadline}
          </p>

          {/* Secondary Line */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mb-8">
            {content.hero.secondaryLine}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              id="hero-primary-cta"
              onClick={() => onScrollTo('contact')}
              className="px-8 py-4 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-sm font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-3 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg athletic-glow cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>{content.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-whatsapp-cta"
              onClick={onOpenWhatsapp}
              className="px-7 py-4 rounded bg-neutral-900/95 hover:bg-neutral-800 border border-neutral-700 hover:border-[#E60000] text-white text-sm font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{content.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Key Facts / Social Proof from Instagram */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/90">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-[#E60000]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-base font-extrabold text-white leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {content.followersCount}
                </p>
                <p className="text-[11px] text-neutral-400 font-medium leading-tight">Followers</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-[#E60000]">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-base font-extrabold text-white leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {content.postsCount}
                </p>
                <p className="text-[11px] text-neutral-400 font-medium leading-tight">Fitness Posts</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-[#E60000]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-base font-extrabold text-white leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Certified
                </p>
                <p className="text-[11px] text-neutral-400 font-medium leading-tight">Instructors</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-[#E60000]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-base font-extrabold text-white leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Unisex
                </p>
                <p className="text-[11px] text-neutral-400 font-medium leading-tight">Safe Space</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div
        onClick={() => onScrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors mb-1">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-[#E60000] animate-bounce" />
      </div>
    </section>
  );
};
