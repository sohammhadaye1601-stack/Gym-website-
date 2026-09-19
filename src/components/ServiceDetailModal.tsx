import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onEnquire: (serviceTitle: string) => void;
  onWhatsapp: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnquire,
  onWhatsapp,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#111111] border border-neutral-750 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner */}
        <div className="relative h-56 w-full">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-[#E60000] text-white flex items-center justify-center transition-colors cursor-pointer border border-neutral-700"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 rounded bg-[#E60000] text-white text-[10px] font-extrabold uppercase tracking-widest">
              {service.category}
            </span>
            <h3
              className="text-3xl sm:text-4xl font-extrabold uppercase text-white mt-1"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#E60000] font-bold mb-2">
              Overview & Philosophy
            </h4>
            <p className="text-neutral-300 text-sm leading-relaxed">{service.fullDesc}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-3">
              Included In This Vertical
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900/80 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">Location</p>
              <p className="text-sm font-semibold text-white">SLAM Nanganallur, Chennai</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400">Availability</p>
              <p className="text-sm font-semibold text-[#E60000]">Mon – Sat Batches</p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onEnquire(service.title);
            }}
            className="w-full sm:flex-1 py-3 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span>Enquire About {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onClose();
              onWhatsapp(service.title);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
