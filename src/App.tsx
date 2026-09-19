/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WebsiteContent } from './types';
import { getStoredContent, saveStoredContent, resetStoredContent } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhySlamSection } from './components/WhySlamSection';
import { TrainingExperienceSection } from './components/TrainingExperienceSection';
import { GroupClassesSection } from './components/GroupClassesSection';
import { TransformationSection } from './components/TransformationSection';
import { InstagramSection } from './components/InstagramSection';
import { GallerySection } from './components/GallerySection';
import { MembershipCtaSection } from './components/MembershipCtaSection';
import { LocationSection } from './components/LocationSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [content, setContent] = useState<WebsiteContent>(() => getStoredContent());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeInterest, setActiveInterest] = useState('Gym');

  const handleSaveContent = (updated: WebsiteContent) => {
    setContent(updated);
    saveStoredContent(updated);
  };

  const handleResetDefaults = () => {
    const defaults = resetStoredContent();
    setContent(defaults);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenWhatsapp = (customTopic?: string) => {
    const phone = content.whatsapp.replace(/[^0-9]/g, '') || '919840855444';
    const message = customTopic
      ? `Hi SLAM Nanganallur, I would like to enquire about ${customTopic}.`
      : `Hi SLAM Nanganallur, I would like to enquire about gym memberships and training batches.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEnquireService = (serviceName: string) => {
    setActiveInterest(serviceName);
    scrollToSection('contact');
  };

  const handleEnquireClass = (className: string) => {
    setActiveInterest('Group Classes');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#E60000] selection:text-white flex flex-col font-sans pb-16 lg:pb-0">
      {/* Sticky Header Navbar */}
      <Navbar
        content={content}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* 1. Hero Section */}
      <Hero
        content={content}
        onScrollTo={scrollToSection}
        onOpenWhatsapp={() => handleOpenWhatsapp()}
      />

      {/* 2. About SLAM */}
      <AboutSection
        content={content}
        onScrollTo={scrollToSection}
      />

      {/* 3. Services Section */}
      <ServicesSection
        content={content}
        onEnquireService={handleEnquireService}
        onWhatsappService={(svc) => handleOpenWhatsapp(svc)}
      />

      {/* 4. Why SLAM? */}
      <WhySlamSection
        content={content}
        onScrollTo={scrollToSection}
      />

      {/* 5. Training Experience Showcase */}
      <TrainingExperienceSection
        content={content}
        onScrollTo={scrollToSection}
      />

      {/* 6. Group Classes */}
      <GroupClassesSection
        content={content}
        onEnquireClass={handleEnquireClass}
      />

      {/* 7. Fitness / Transformation Results */}
      <TransformationSection
        content={content}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* 8. Instagram Section */}
      <InstagramSection content={content} />

      {/* 9. Dedicated Studio Gallery */}
      <GallerySection content={content} />

      {/* 10. Membership CTA */}
      <MembershipCtaSection
        content={content}
        onScrollTo={scrollToSection}
        onOpenWhatsapp={() => handleOpenWhatsapp()}
      />

      {/* 11. Location & Map */}
      <LocationSection
        content={content}
        onOpenWhatsapp={() => handleOpenWhatsapp()}
      />

      {/* 12. Contact & Direct Enquiry Form */}
      <ContactFormSection
        content={content}
        initialInterest={activeInterest}
      />

      {/* Footer */}
      <Footer
        content={content}
        onScrollTo={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Sticky Actions (WhatsApp & Mobile Bar & Admin Access) */}
      <FloatingActionButtons
        content={content}
        onOpenWhatsapp={() => handleOpenWhatsapp()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToContact={() => scrollToSection('contact')}
      />

      {/* Admin Image & Content Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        onSaveContent={handleSaveContent}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
