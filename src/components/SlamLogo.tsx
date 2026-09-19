import React from 'react';

interface SlamLogoProps {
  className?: string;
  customLogoUrl?: string;
  variant?: 'full' | 'compact' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SlamLogo: React.FC<SlamLogoProps> = ({
  className = '',
  customLogoUrl,
  variant = 'full',
  size = 'md',
}) => {
  if (customLogoUrl) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="SLAM Lifestyle and Fitness Studio Nanganallur"
          className={`object-contain ${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : size === 'xl' ? 'h-20' : 'h-10'
          }`}
        />
      </div>
    );
  }

  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  return (
    <div className={`inline-flex flex-col justify-center select-none group cursor-pointer ${className}`}>
      <div className="flex items-center gap-1.5">
        {/* Athletic stylized geometric SLAM logo */}
        <div className="relative flex items-center font-black tracking-tighter italic uppercase">
          <span
            className="text-white font-extrabold tracking-tighter transition-colors group-hover:text-neutral-100"
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: size === 'sm' ? '24px' : size === 'lg' ? '40px' : size === 'xl' ? '54px' : '30px',
              lineHeight: 1,
              letterSpacing: '1px',
              transform: 'skewX(-6deg)',
            }}
          >
            SL<span className="text-[#E60000]">A</span>M
          </span>
          {/* Athletic red chevron / power slash */}
          <div className="ml-1 w-1.5 h-4 bg-[#E60000] -skew-x-12 transform group-hover:scale-y-110 transition-transform" />
        </div>

        {variant !== 'compact' && (
          <div className="flex flex-col justify-center pl-1 border-l border-neutral-800 ml-1">
            <span
              className="text-[9px] uppercase tracking-[0.24em] font-semibold text-neutral-300 leading-tight"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Lifestyle & Fitness
            </span>
            <span
              className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#E60000] leading-tight"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Nanganallur
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
