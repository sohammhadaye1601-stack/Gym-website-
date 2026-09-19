import React from 'react';
import { WebsiteContent } from '../types';
import { Instagram, Heart, ExternalLink } from 'lucide-react';

interface InstagramSectionProps {
  content: WebsiteContent;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ content }) => {
  return (
    <section id="instagram" className="py-24 bg-[#0c0c0c] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gradient-to-r from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#FCB045]/20 border border-neutral-800 mb-3">
              <Instagram className="w-3.5 h-3.5 text-[#E60000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E60000]">
                {content.instagramHandle}
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              {content.instagramSection.heading}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {content.followersCount}
              </p>
              <p className="text-xs text-neutral-400">Community Followers</p>
            </div>
            <div className="text-right border-l border-neutral-800 pl-6">
              <p className="text-xl font-extrabold text-[#E60000] leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {content.postsCount}
              </p>
              <p className="text-xs text-neutral-400">Fitness Posts</p>
            </div>
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded bg-neutral-900 hover:bg-[#E60000] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-neutral-750 hover:border-transparent transition-all shadow-md"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>VIEW INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6-Image Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {content.instagramSection.posts.map((post) => (
            <a
              key={post.id}
              href={post.url || content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-850 hover:border-[#E60000] transition-all duration-300 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 font-bold text-[#E60000]">
                    <Heart className="w-3.5 h-3.5 fill-[#E60000]" />
                    {post.likes || '450'}
                  </span>
                  <Instagram className="w-3.5 h-3.5 text-neutral-300" />
                </div>
                <p className="text-[11px] text-neutral-200 line-clamp-3 leading-snug">
                  {post.caption}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E60000]">
                  View On Instagram →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
