/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Sparkles, Award, ShieldCheck, Globe, Star } from 'lucide-react';
import ChamundaLogo from './ChamundaLogo';
import BikeImage from './BikeImage';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <div id="hero" className="relative bg-[#0F0F0F] text-[#F5F5F5] overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-white/10 selection:bg-[#E8FF00] selection:text-black">
      {/* Background neon visual noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,255,0,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent_40%)] pointer-events-none" />

      {/* Decorative vertical lettering label like the design HTML */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 rotate-180 hidden xl:flex" style={{ writingMode: 'vertical-rl' }}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 select-none">CHAMUNDA HIGH PERFORMANCE SYSTEMS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full">
              <Star className="w-3.5 h-3.5 fill-[#E8FF00] text-[#E8FF00]" />
              <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-white/70">
                4.2 Star Google Business Profile • Ahmedabad
              </span>
            </div>

            <div>
              <div className="text-[#E8FF00] text-xs font-black uppercase tracking-widest mb-3 flex flex-wrap items-center gap-2">
                <span>Premium Bicycle Shop in Gujarat</span>
                <span className="text-white/30">•</span>
                <span className="text-white">SINCE 1998</span>
              </div>
              <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[76px] leading-[0.9] font-black tracking-tighter uppercase mb-2">
                CHAMUNDA<br/>
                <span className="text-white">CYCLE SALES</span>
              </h1>
              <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#E8FF00] uppercase font-black mb-6">
                RIDE BEYOND LIMITS
              </div>
              <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed font-light">
                Ahmedabad's leading destination for high-performance bikes, custom layups, and professional gear. Hand-assembled with racing-grade precision, built for Ahmedabad roads and beyond.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExplore}
                className="group flex items-center justify-center space-x-2 bg-[#E8FF00] text-black px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#E8FF00]/10 focus:outline-none cursor-pointer"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Key Quality Pillars */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Reviews</span>
                <span className="text-2xl font-light italic text-white">15+<span className="text-xs not-italic ml-0.5 text-[#E8FF00]">Google</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Bicycle Classes</span>
                <span className="text-2xl font-light italic text-white">4<span className="text-xs not-italic ml-0.5 text-[#E8FF00]">Road/Comm</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Showroom Closes</span>
                <span className="text-2xl font-light italic text-white">9<span className="text-xs not-italic ml-0.5 text-[#E8FF00]">PM</span></span>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="mt-12 lg:mt-0 lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft decorative shadow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#E8FF00]/5 blur-3xl rounded-full" />
              
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white p-3 sm:p-4 shadow-2xl transition-transform hover:scale-[1.01]">
                {/* Horizontal scanning lines effect from design */}
                <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-[#E8FF00] to-transparent absolute top-1/4 animate-pulse z-10"></div>
                
                <BikeImage
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200"
                  alt="AeroMax Carbon Road Bike"
                  className="rounded-xl w-full h-[250px] sm:h-[385px] object-cover transition-all duration-700 bg-white"
                />

                {/* Rotating Brand Medallion Overlay */}
                <div className="absolute -top-4 -right-4 bg-[#0F0F0F] border-2 border-white/20 p-2.5 rounded-full shadow-2xl flex items-center justify-center animate-[pulse_3s_infinite] hover:border-[#E8FF00] transition-colors group">
                  <div className="animate-[spin_40s_linear_infinite] hover:animate-[spin_8s_linear_infinite] transition-all">
                    <ChamundaLogo size={68} showText={false} />
                  </div>
                </div>
                
                {/* Float Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] text-white/40 font-mono tracking-widest uppercase">Featured Build</span>
                    <span className="font-display font-black text-white text-xs sm:text-sm uppercase tracking-tight">AeroMax Road Carbon</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-white/40 font-mono tracking-widest uppercase font-semibold">Tire Spec</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#E8FF00]">C-45 Carbon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
