import React, { useState, useEffect } from 'react';
import { SlamLogo } from './SlamLogo';
import { WebsiteContent } from '../types';
import { Menu, X, Phone, Settings, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  content: WebsiteContent;
  onOpenAdmin: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  content,
  onOpenAdmin,
  onScrollTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'CLASSES', id: 'classes' },
    { label: 'RESULTS', id: 'results' },
    { label: 'GALLERY', id: 'gallery' },
    { label: 'LOCATION', id: 'location' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-neutral-850 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => handleLinkClick('hero')} className="cursor-pointer">
            <SlamLogo customLogoUrl={content.logoImage} size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-300 hover:text-[#E60000] transition-colors py-1 relative group cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E60000] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Admin Management Toggle */}
            <button
              id="admin-management-btn"
              onClick={onOpenAdmin}
              title="Open Admin / Image Management System"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 hover:border-[#E60000] text-neutral-300 hover:text-white transition-all text-xs font-semibold"
            >
              <Settings className="w-3.5 h-3.5 text-[#E60000]" />
              <span className="hidden sm:inline">Admin Mode</span>
            </button>

            {/* Direct Call Quick Link */}
            {content.phone && (
              <a
                href={`tel:${content.phone.replace(/\s+/g, '')}`}
                className="hidden md:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded border border-neutral-800 hover:border-neutral-600 transition-colors"
                title="Call SLAM Nanganallur"
              >
                <Phone className="w-3.5 h-3.5 text-[#E60000]" />
                <span className="font-medium">{content.phone}</span>
              </a>
            )}

            {/* Primary CTA */}
            <button
              id="navbar-join-cta"
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-[0.15em] transition-all transform hover:-translate-y-0.5 active:translate-y-0 athletic-glow cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              JOIN SLAM
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E60000]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-neutral-800 px-6 py-6 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <span className="text-xs uppercase tracking-widest text-neutral-400">Navigation</span>
              <span className="text-[11px] text-[#E60000] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Nanganallur, Chennai
              </span>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-base font-bold uppercase tracking-wider text-neutral-200 hover:text-[#E60000] py-2 border-b border-neutral-900/60 transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-sm font-bold uppercase tracking-widest text-center transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                JOIN SLAM TODAY
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4 text-[#E60000]" />
                Open Admin & Image Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
