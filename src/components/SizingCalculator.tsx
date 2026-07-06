/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Ruler, Sparkles, Shield, Info, Check, ArrowRight } from 'lucide-react';

interface SizeRow {
  bikeSize: string;
  wheelDiameter: string;
  ageRange: string;
  heightRange: string;
  minHeight: number; // in inches
  maxHeight: number; // in inches
  description: string;
}

export default function SizingCalculator() {
  const [riderHeightInches, setRiderHeightInches] = useState<number>(54); // Default to 54 inches (4'6")
  const [filterAge, setFilterAge] = useState<'all' | 'kids' | 'adult'>('all');

  const sizingData: SizeRow[] = [
    {
      bikeSize: "12T",
      wheelDiameter: "12 Inch",
      ageRange: "2-5",
      heightRange: "26-34 Inches",
      minHeight: 26,
      maxHeight: 34,
      description: "Perfect first trainer with training wheels compatibility. High safety and low center of gravity."
    },
    {
      bikeSize: "14T",
      wheelDiameter: "14 Inch",
      ageRange: "3-6",
      heightRange: "30-38 Inches",
      minHeight: 30,
      maxHeight: 38,
      description: "Slightly taller stance. Ideal transition size for young riders learning self-balance."
    },
    {
      bikeSize: "16T",
      wheelDiameter: "16 Inch",
      ageRange: "4-8",
      heightRange: "34-42 Inches",
      minHeight: 34,
      maxHeight: 42,
      description: "Classic kids wheel size. Built with premium alloy parts and high durability."
    },
    {
      bikeSize: "20T",
      wheelDiameter: "20 Inch",
      ageRange: "8-Up",
      heightRange: "48 Inches - Up",
      minHeight: 48,
      maxHeight: 52,
      description: "Highly versatile kids/teens platform. Extremely popular for BMX and city play."
    },
    {
      bikeSize: "24T",
      wheelDiameter: "24 Inch",
      ageRange: "8-15",
      heightRange: "48-56 Inches",
      minHeight: 48,
      maxHeight: 56,
      description: "Junior size mountain and hybrid frames. Configured for true speed and shifting controls."
    },
    {
      bikeSize: "26T",
      wheelDiameter: "26 Inch",
      ageRange: "Adult",
      heightRange: "50 Inches and Up",
      minHeight: 50,
      maxHeight: 65,
      description: "Standard agile adult size. Maximum maneuverability for city, dirt jumps, and trails."
    },
    {
      bikeSize: "27T",
      wheelDiameter: "27 Inch",
      ageRange: "Adult",
      heightRange: "56 Inches and Up",
      minHeight: 56,
      maxHeight: 70,
      description: "High rolling momentum. Premium standard for road racing and performance gravel."
    },
    {
      bikeSize: "29T",
      wheelDiameter: "29 Inch",
      ageRange: "Adult",
      heightRange: "60 Inches and Up",
      minHeight: 60,
      maxHeight: 80,
      description: "Our largest standard. Exceptional rollover speed, supreme stability, and top traction."
    }
  ];

  // Logic to find matched bike size
  // Since ranges overlap, we find the best matched item based on height:
  const getBestMatchedIndex = (height: number) => {
    // Exact mapping matches
    if (height >= 26 && height < 30) return 0; // 12T
    if (height >= 30 && height < 34) return 1; // 14T
    if (height >= 34 && height < 42) return 2; // 16T
    if (height >= 48 && height < 50) return 3; // 20T
    if (height >= 50 && height < 54) return 4; // 24T
    if (height >= 54 && height < 56) return 5; // 26T
    if (height >= 56 && height < 60) return 6; // 27T
    if (height >= 60) return 7; // 29T
    return -1;
  };

  const matchedIndex = getBestMatchedIndex(riderHeightInches);
  const matchedRow = matchedIndex !== -1 ? sizingData[matchedIndex] : null;

  // Filter rows if user selected Kids or Adult view
  const filteredData = sizingData.filter((row) => {
    if (filterAge === 'kids') {
      return row.ageRange !== 'Adult';
    }
    if (filterAge === 'adult') {
      return row.ageRange === 'Adult';
    }
    return true;
  });

  const inchesToFtIn = (totInches: number) => {
    const feet = Math.floor(totInches / 12);
    const remainingInches = totInches % 12;
    return `${feet}'${remainingInches}"`;
  };

  return (
    <section id="sizing" className="py-20 sm:py-28 bg-[#0F0F0F] border-b border-white/10 scroll-mt-20 selection:bg-[#E8FF00] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-[#E8FF00] mb-3">
            <Ruler className="w-5 h-5" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Precision Fitment</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            Bicycle Standard Size Chart
          </h2>
          <p className="mt-4 text-white/50 text-sm sm:text-base leading-relaxed font-light">
            Locate your ideal fit according to bicycle industry standard specifications. Filter by age demographics or slide to input your true height to highlight your perfect match.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-[#141414] p-4 rounded-3xl border border-white/5">
          <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-2xl border border-white/5">
            {[
              { id: 'all', label: 'Full Size Spectrum' },
              { id: 'kids', label: 'Kids & Junior Fleet (12T - 24T)' },
              { id: 'adult', label: 'Adult Standard Fleet (26T - 29T)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterAge(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  filterAge === tab.id
                    ? 'bg-[#E8FF00] text-black shadow-sm'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-white/40 text-[10px] font-mono tracking-wider uppercase font-bold">
            <Info className="w-4 h-4 text-[#E8FF00]" />
            <span>Interactive Highlight enabled</span>
          </div>
        </div>

        {/* Grid Area: Dynamic Sizer on Left, Standardized Chart on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Calculator widget */}
          <div className="lg:col-span-4 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-wider text-[#E8FF00] font-black uppercase">
                  Dynamic Fit Matcher
                </span>
                <span className="bg-[#E8FF00]/10 text-[#E8FF00] text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase">
                  Active Sync
                </span>
              </div>

              <h3 className="font-display text-xl font-black text-white uppercase tracking-tight mb-2">
                Dial-In Your Height
              </h3>
              <p className="text-white/50 text-xs leading-relaxed font-light mb-8">
                Move the slider to match your physical height. Our system will dynamically highlight the correct frame, tire size, and age recommendations in real-time.
              </p>

              {/* Range Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-black">
                    Your Height (Inches)
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#E8FF00] font-mono tracking-tight">
                      {riderHeightInches}" Inches
                    </span>
                    <span className="block text-[10px] text-white/50 font-mono">
                      (~ {inchesToFtIn(riderHeightInches)})
                    </span>
                  </div>
                </div>

                <div className="relative pt-2">
                  <input
                    type="range"
                    min="26"
                    max="75"
                    value={riderHeightInches}
                    onChange={(e) => setRiderHeightInches(Number(e.target.value))}
                    className="w-full accent-[#E8FF00] h-2 bg-[#1C1C1C] rounded-lg cursor-pointer appearance-none border border-white/5 focus:outline-none"
                  />
                  <div className="flex justify-between text-[8px] text-white/30 font-mono mt-2 uppercase tracking-wider">
                    <span>26 Inches (2'2")</span>
                    <span>75 Inches (6'3")</span>
                  </div>
                </div>
              </div>

              {/* Highlight match outcome block */}
              {matchedRow ? (
                <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/10 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-[#E8FF00] uppercase font-black tracking-wider">
                      Recommended Specimen
                    </span>
                    <span className="bg-[#E8FF00] text-black px-2 py-0.5 rounded text-[10px] font-mono font-black">
                      {matchedRow.bikeSize}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-left border-b border-white/5 pb-3">
                    <div>
                      <span className="block text-[8px] text-white/40 font-mono uppercase">Wheel Diameter</span>
                      <span className="text-xs font-bold text-white uppercase">{matchedRow.wheelDiameter}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 font-mono uppercase">Target Age Group</span>
                      <span className="text-xs font-bold text-[#E8FF00] uppercase">{matchedRow.ageRange} Years</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/70 leading-relaxed font-light pt-1">
                    {matchedRow.description}
                  </p>
                </div>
              ) : (
                <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-2xl text-center">
                  <p className="text-xs text-red-400">Height is out of standard chart coverage.</p>
                </div>
              )}
            </div>

            {/* Quality Standard badge */}
            <div className="mt-8 pt-5 border-t border-white/5 flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#E8FF00] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-black uppercase text-white tracking-wider">Ergonomic Fit Standards</span>
                <span className="block text-[9px] text-white/40 leading-relaxed mt-0.5">
                  All size data correlates with international bicycle standard sizing parameters. Consult our sales desk for custom stem sizes.
                </span>
              </div>
            </div>
          </div>

          {/* Sizing Matrix Display Card */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-xl text-left">
              
              {/* Header inside table */}
              <div className="p-5 border-b border-white/10 bg-black/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Bicycle Standard Size Chart</h4>
                  <p className="text-[10px] text-white/40 font-mono mt-0.5">DIRECT RECORDINGS DERIVED FROM STANDARD BICYCLE MATRIX</p>
                </div>
                <span className="text-[9px] font-mono text-[#E8FF00] uppercase font-bold">*SIZE MAY VARY AS PER BRAND</span>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#1A1A1A] text-[9px] font-mono uppercase tracking-widest text-white/40">
                      <th className="py-4 px-6 font-black">Bike Size</th>
                      <th className="py-4 px-6 font-black">Bike Wheel Diameter</th>
                      <th className="py-4 px-6 font-black">Age Range in Years</th>
                      <th className="py-4 px-6 font-black">Rider Height in Inches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => {
                      const isHighlighted = matchedRow && matchedRow.bikeSize === row.bikeSize;
                      return (
                        <tr
                          key={row.bikeSize}
                          className={`border-b border-white/5 text-xs transition-all ${
                            isHighlighted
                              ? 'bg-[#E8FF00]/10 text-white font-bold border-l-4 border-l-[#E8FF00]'
                              : 'hover:bg-white/5 text-white/70'
                          }`}
                        >
                          {/* Bike Size Column */}
                          <td className="py-4.5 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                              isHighlighted ? 'bg-[#E8FF00] text-black font-black' : 'bg-white/5 text-white/90'
                            }`}>
                              {row.bikeSize}
                            </span>
                          </td>

                          {/* Wheel Diameter Column */}
                          <td className="py-4.5 px-6 font-mono text-[11px] text-white/80">
                            {row.wheelDiameter}
                          </td>

                          {/* Age Range Column */}
                          <td className="py-4.5 px-6 text-white/80 font-semibold">
                            {row.ageRange} {row.ageRange !== 'Adult' ? 'Years' : ''}
                          </td>

                          {/* Rider Height Column */}
                          <td className="py-4.5 px-6 font-mono text-[11px] text-[#E8FF00]">
                            {row.heightRange}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional helpful insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-[#141414]/50 border border-white/5 p-4 rounded-2xl">
                <span className="inline-flex items-center space-x-1 text-[9px] font-mono uppercase font-black text-[#E8FF00] tracking-widest mb-1.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>How to Pick kids sizes?</span>
                </span>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  For younger riders, wheel diameter matches their motor skills development. Standard indicators: 12T to 16T are excellent for toddlers with training support, whereas 18T to 24T support multiple gears and trail suspensions.
                </p>
              </div>

              <div className="bg-[#141414]/50 border border-white/5 p-4 rounded-2xl">
                <span className="inline-flex items-center space-x-1 text-[9px] font-mono uppercase font-black text-[#E8FF00] tracking-widest mb-1.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Adult Wheel size choice?</span>
                </span>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  26T is exceptionally nimble and great for standard city handling. 27T delivers maximum acceleration and is preferred for endurance tracks. 29T rolls over large potholes with minimal speed loss, perfect for rocky singletracks.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
