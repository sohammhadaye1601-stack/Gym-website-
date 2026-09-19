import React, { useState } from 'react';
import { WebsiteContent, ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { Dumbbell, Activity, Users, HeartPulse, Apple, Trophy, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  content: WebsiteContent;
  onEnquireService: (serviceName: string) => void;
  onWhatsappService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  content,
  onEnquireService,
  onWhatsappService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Apple':
        return <Apple className="w-5 h-5" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Dumbbell className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E60000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
                Core Offerings
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              {content.servicesHeading}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
            {content.servicesSubtitle}
          </p>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((srv) => (
            <div
              key={srv.id}
              id={`service-card-${srv.id}`}
              className="group rounded-xl overflow-hidden bg-[#111111] border border-neutral-850 hover:border-[#E60000] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with Dark Vignette */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />

                {/* Floating Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-700 flex items-center justify-center text-[#E60000] shadow-lg group-hover:bg-[#E60000] group-hover:text-white transition-colors">
                  {getIcon(srv.iconName)}
                </div>

                {/* Category tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-neutral-800 text-[10px] uppercase font-bold tracking-wider text-neutral-300">
                    {srv.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold uppercase text-white tracking-wide mb-2.5 group-hover:text-[#E60000] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-normal leading-relaxed line-clamp-3">
                    {srv.shortDesc}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="mt-6 pt-4 border-t border-neutral-850/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(srv)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#E60000] transition-colors cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E60000] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onEnquireService(srv.title)}
                    className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-[#E60000] text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 hover:border-transparent transition-all cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onEnquire={(title) => {
          setSelectedService(null);
          onEnquireService(title);
        }}
        onWhatsapp={(title) => {
          setSelectedService(null);
          onWhatsappService(title);
        }}
      />
    </section>
  );
};
