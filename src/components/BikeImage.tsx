import React, { useState } from 'react';

interface BikeImageProps {
  src: string;
  alt: string;
  className?: string;
  accentColor?: string;
}

export default function BikeImage({ src, alt, className = '', accentColor = '#E8FF00' }: BikeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`relative bg-neutral-900/60 flex flex-col items-center justify-center p-6 border-b border-white/5 overflow-hidden min-h-[160px] ${className}`}>
        {/* Sleek ambient radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,255,0,0.04),transparent_75%)] pointer-events-none animate-pulse" />
        
        {/* Clean isometric technical background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* High-quality vector bicycle fallback outline */}
        <svg
          viewBox="0 0 100 60"
          className="w-4/5 max-w-[180px] h-auto text-white/10 group-hover:text-[#E8FF00]/40 transition-all duration-700 ease-out drop-shadow-[0_10px_20px_rgba(232,255,0,0.06)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Rear Wheel & spokes */}
          <circle cx="26" cy="40" r="11" strokeDasharray="3,3" className="stroke-white/5" />
          <circle cx="26" cy="40" r="10" />
          <circle cx="26" cy="40" r="9" />
          <line x1="26" y1="29" x2="26" y2="51" className="stroke-white/5" />
          <line x1="15" y1="40" x2="37" y2="40" className="stroke-white/5" />
          <circle cx="26" cy="40" r="1.5" fill="currentColor" />
          
          {/* Front Wheel & spokes */}
          <circle cx="74" cy="40" r="11" strokeDasharray="3,3" className="stroke-white/5" />
          <circle cx="74" cy="40" r="10" />
          <circle cx="74" cy="40" r="9" />
          <line x1="74" y1="29" x2="74" y2="51" className="stroke-white/5" />
          <line x1="63" y1="40" x2="85" y2="40" className="stroke-white/5" />
          <circle cx="74" cy="40" r="1.5" fill="currentColor" />

          {/* Frame Tubing Geometry */}
          {/* Rear dropouts to Bottom Bracket */}
          <line x1="26" y1="40" x2="48" y2="40" />
          {/* Seat tube: Bottom Bracket to Seat Joint */}
          <line x1="48" y1="40" x2="43" y2="20" />
          {/* Seat stays: Rear dropouts to Seat Joint */}
          <line x1="26" y1="40" x2="43" y2="20" />
          {/* Down tube: Bottom Bracket to Head Tube bottom */}
          <line x1="48" y1="40" x2="68" y2="24" strokeWidth="1.3" />
          {/* Top tube: Seat Joint to Head Tube top */}
          <line x1="43" y1="20" x2="65" y2="18" strokeWidth="1.3" />
          {/* Fork: Steering Joint to Front Hub */}
          <line x1="65" y1="18" x2="74" y2="40" />

          {/* Chain, chainring & pedals */}
          <circle cx="48" cy="40" r="3" strokeWidth="1.2" />
          <line x1="48" y1="36" x2="48" y2="44" strokeWidth="1.5" />
          <line x1="44" y1="36" x2="52" y2="36" strokeWidth="1" />
          <line x1="44" y1="44" x2="52" y2="44" strokeWidth="1" />
          <path d="M 26 38.5 L 48 37 M 26 41.5 L 48 43" strokeWidth="0.8" className="stroke-white/10" />

          {/* Seatpost and Saddle */}
          <line x1="43" y1="20" x2="42" y2="15" strokeWidth="1.5" />
          <path d="M 37 15 L 46 15" strokeWidth="2" strokeLinecap="square" className="stroke-white" />

          {/* Cockpit / Handlebars */}
          <line x1="65" y1="18" x2="64" y2="13" strokeWidth="1.5" />
          <path d="M 59 13 L 64 13 L 68 11" strokeWidth="1.8" />
          <path d="M 68 11 C 70 11 71 13 70 15" strokeWidth="1.5" />
        </svg>

        {/* Micro status notification bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[8px] font-mono tracking-widest text-white/30 uppercase bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-[#E8FF00] rounded-full animate-pulse" />
            <span>SPEC ACTIVE</span>
          </span>
          <span className="text-[#E8FF00]/60 font-semibold">VECTOR VIEW</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => {
        console.warn(`Failed to load product image: ${src}. Displaying vector fallback.`);
        setHasError(true);
      }}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}
