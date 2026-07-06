import React from 'react';

interface ChamundaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function ChamundaLogo({ className = '', size = 120, showText = true }: ChamundaLogoProps) {
  // We generate 24 teeth around the sprocket gear
  const numTeeth = 24;
  const teethIndices = Array.from({ length: numTeeth }, (_, i) => i);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Silver metallic gradient for sprocket */}
          <linearGradient id="silver-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#CCD6E5" />
            <stop offset="50%" stopColor="#9BA9C2" />
            <stop offset="75%" stopColor="#CCD6E5" />
            <stop offset="100%" stopColor="#6C7C96" />
          </linearGradient>

          {/* Deep shadow for inner bicycle space */}
          <radialGradient id="inner-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#0B0C10" />
            <stop offset="100%" stopColor="#020203" />
          </radialGradient>
          
          {/* Red glow for athletic text */}
          <filter id="red-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#B91C1C" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Base dark background circle inside the gear */}
        <circle cx="100" cy="100" r="88" fill="url(#inner-shadow)" />

        {/* 2. Outer Gear Teeth */}
        <g id="gear-teeth">
          {teethIndices.map((i) => {
            const angle = i * (360 / numTeeth);
            return (
              <polygon
                key={i}
                points="93,18 107,18 105,4 95,4"
                fill="url(#silver-metallic)"
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}
        </g>

        {/* 3. Main Sprocket Ring - merges with base of teeth */}
        <circle cx="100" cy="100" r="82" fill="none" stroke="url(#silver-metallic)" strokeWidth="12" />
        
        {/* Inner thin silver accent circle */}
        <circle cx="100" cy="100" r="72" fill="none" stroke="#2D3748" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#silver-metallic)" strokeWidth="2.5" />

        {/* 4. Top and Bottom Pinhole Cutouts (authentic detail from their logo) */}
        <circle cx="100" cy="38" r="7" fill="#000000" stroke="url(#silver-metallic)" strokeWidth="2" />
        <circle cx="100" cy="162" r="7" fill="#000000" stroke="url(#silver-metallic)" strokeWidth="2" />

        {/* 5. Red Bicycle Drawing (upper-half background) */}
        <g id="bicycle-illustration">
          {/* Wheels (drawn as subtle red arcs or dashed lines in background) */}
          <path d="M38,95 A20,20 0 0,1 78,95" stroke="#B91C1C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M122,95 A20,20 0 0,1 162,95" stroke="#B91C1C" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Main frame lines */}
          {/* Seatstay (Rear axle 58,95 to seat collar 84,54) */}
          <line x1="58" y1="95" x2="84" y2="54" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          
          {/* Chainstay (Rear axle 58,95 to bottom bracket 94,95) */}
          <line x1="58" y1="95" x2="94" y2="95" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          
          {/* Seat tube (Seat collar 84,54 to bottom bracket 94,95) */}
          <line x1="84" y1="54" x2="94" y2="95" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          
          {/* Top tube (Seat collar 84,54 to Head tube 124,54) */}
          <line x1="84" y1="54" x2="124" y2="54" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          
          {/* Downtube (Head tube 124,54 to bottom bracket 94,95) */}
          <line x1="124" y1="54" x2="94" y2="95" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />

          {/* Fork (Head tube 124,54 to Front axle 142,95) */}
          <line x1="124" y1="54" x2="142" y2="95" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />

          {/* Seat Post and Saddle */}
          <line x1="84" y1="54" x2="82" y2="44" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          <path d="M74,44 L92,44" stroke="#B91C1C" strokeWidth="5.5" strokeLinecap="round" />

          {/* Handlebar Stem and Bars */}
          <line x1="124" y1="54" x2="121" y2="38" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
          <path d="M109,38 L123,38" stroke="#B91C1C" strokeWidth="5.5" strokeLinecap="round" />
        </g>

        {/* 6. Central Brand Name "CHAMUNDA" */}
        {/* Large background plate to block bicycle lines under name */}
        <rect x="12" y="102" width="176" height="30" fill="#040405" />
        
        {/* "CHAMUNDA" text in ultra bold athletic/stencil typeface */}
        <text
          x="100"
          y="126"
          textAnchor="middle"
          fill="#B91C1C"
          fontSize="27"
          fontWeight="900"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          letterSpacing="1"
          filter="url(#red-glow)"
        >
          CHAMUNDA
        </text>

        {/* 7. Bottom Curved Plate for "SALES" */}
        {/* Outer Silver Border */}
        <path
          d="M45,134 L155,134 C150,165 125,174 100,174 C75,174 50,165 45,134 Z"
          fill="#060709"
          stroke="url(#silver-metallic)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        
        {/* Inner shadow/groove */}
        <path
          d="M49,138 L151,138 C147,161 123,170 100,170 C77,170 53,161 49,138 Z"
          fill="#000000"
          stroke="#1A202C"
          strokeWidth="1.5"
        />

        {/* "SALES" text in white stylized sans-serif */}
        <text
          x="100"
          y="158"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Courier New', Courier, monospace, sans-serif"
          letterSpacing="5.5"
        >
          SALES
        </text>
      </svg>

      {showText && (
        <div className="ml-3 text-left">
          <span className="block font-display text-lg sm:text-xl font-black tracking-tighter text-white uppercase leading-none">
            CHAMUNDA <span className="text-[#E8FF00] font-black">CYCLE SALES</span>
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
            <span className="block text-[8px] font-mono tracking-[0.2em] uppercase text-white/40 font-semibold">
              AHMEDABAD • GUJARAT
            </span>
            <span className="block text-[8px] font-mono tracking-[0.2em] uppercase text-[#E8FF00] font-bold">
              • SINCE 1998
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
