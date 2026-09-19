import React from 'react';
import { WebsiteContent } from '../types';
import { MessageSquare, Phone, Settings } from 'lucide-react';

interface FloatingActionButtonsProps {
  content: WebsiteContent;
  onOpenWhatsapp: () => void;
  onOpenAdmin: () => void;
  onScrollToContact: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  content,
  onOpenWhatsapp,
  onOpenAdmin,
  onScrollToContact,
}) => {
  return (
    <>
      {/* Persistent Floating WhatsApp Button (bottom-right) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        {/* Admin Quick Access Badge */}
        <button
          onClick={onOpenAdmin}
          id="floating-admin-btn"
          title="Open Admin Image & Content Manager"
          className="w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 cursor-pointer backdrop-blur-sm"
        >
          <Settings className="w-4 h-4 text-[#E60000]" />
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={onOpenWhatsapp}
          id="floating-whatsapp-btn"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          style={{ fontFamily: "'Oswald', sans-serif" }}
          aria-label="Chat on WhatsApp with SLAM Nanganallur"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="tracking-wider uppercase">WHATSAPP</span>
        </button>
      </div>

      {/* Mobile Persistent Bottom Bar (Quick Call & Join) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-neutral-800 px-4 py-2.5 flex items-center gap-3">
        <a
          href={`tel:${content.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 rounded-lg bg-neutral-900 border border-neutral-750 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Phone className="w-3.5 h-3.5 text-[#E60000]" />
          <span>CALL US</span>
        </a>

        <button
          onClick={onScrollToContact}
          className="flex-1 py-2.5 rounded-lg bg-[#E60000] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-md athletic-glow"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span>JOIN SLAM</span>
        </button>
      </div>
    </>
  );
};
