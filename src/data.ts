/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bike, Accessory } from './types';

export const COLORS = {
  stealth: { name: 'Stealth Black', hex: '#1A1A1A', bgClass: 'bg-neutral-900', textClass: 'text-neutral-900' },
  alpine: { name: 'Alpine Pearl White', hex: '#F3F4F6', bgClass: 'bg-neutral-100 border border-neutral-300', textClass: 'text-neutral-300' },
  cobalt: { name: 'Cobalt Gloss Blue', hex: '#1D4ED8', bgClass: 'bg-blue-700', textClass: 'text-blue-700' },
  ember: { name: 'Ember Metallic Orange', hex: '#EA580C', bgClass: 'bg-orange-600', textClass: 'text-orange-600' },
  forest: { name: 'Sage Forest Green', hex: '#0F766E', bgClass: 'bg-teal-700', textClass: 'text-teal-700' },
  sunset: { name: 'Sunset Bronze Crimson', hex: '#B91C1C', bgClass: 'bg-red-700', textClass: 'text-red-700' },
};

export const BICYCLE_DATA_INITIAL: Bike[] = [
  {
    id: 'british-eagle-arise',
    name: 'British Eagle Arise',
    category: 'urban',
    tagline: 'High glossy decals. Internal routing. Absolute speed.',
    description: 'Your ultimate daily partner. Engineered with a premium Hi-Ten Steel frame, sleek internal cable routing, noiseless freewheel, and double-wall alloy rims. High glossy water decals give it an athletic, elite look on Ahmedabad roads.',
    price: 18499,
    baseWeight: 11200, // 11.2kg
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    tags: ['Internal Cable Routing', 'Noiseless Freewheel', '700x35C Wheels', 'High Glossy Decals'],
    colors: [COLORS.stealth, COLORS.ember, COLORS.alpine],
    specs: {
      frame: 'Hi-Ten Steel Premium Frame with sleek Internal Cable Routing',
      fork: 'British Eagle Rigid / Comfort Suspension Fork options',
      groupset: 'Single Speed with Noiseless Freewheel system',
      brakes: 'High Performance V-Brakes / Mechanical Disc Brakes',
      wheels: 'Double-Wall Alloy Rims, 700x35C City Tires',
      weight: '11.2 kg',
    }
  },
  {
    id: 'british-eagle-arise-multi',
    name: 'British Eagle Arise Multi-Speed',
    category: 'road',
    tagline: 'Precision gears for versatile terrain.',
    description: 'The multi-speed edition of our flagship Arise hybrid. Equipped with a reliable Shimano 21-speed drivetrain, responsive mechanical disc brakes, and high-performance 700x35C tires for cruising through Gujarat highways and flyovers with ease.',
    price: 23999,
    baseWeight: 11900, // 11.9kg
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&q=80&w=800',
    tags: ['Shimano 21-Speed', 'Disc Brakes', 'Double-Wall Alloy', 'Sleek Cables'],
    colors: [COLORS.stealth, COLORS.cobalt, COLORS.sunset],
    specs: {
      frame: 'Hi-Ten Steel Frame, Internal Cable Routing, Aero Geometry',
      fork: 'British Eagle Performance Suspension Fork, 80mm travel',
      groupset: 'Shimano Tourney 3x7 Speed (21 Gears)',
      brakes: 'Dual Mechanical Disc Brakes with 160mm rotors',
      wheels: 'Double-Wall Alloy Rims, 700x35C All-Weather Tires',
      weight: '11.9 kg',
    }
  },
  {
    id: 'british-eagle-outlaw',
    name: 'British Eagle Outlaw MTB',
    category: 'mountain',
    tagline: 'Unmatched trail dominance.',
    description: 'Built to conquer rough terrains, dirt paths, and high curbs. The Outlaw MTB features an aggressive alloy hardtail frame, 100mm lockout suspension fork, and 27.5-inch knobby tires for maximum grip and off-road safety.',
    price: 21499,
    baseWeight: 14200, // 14.2kg
    rating: 4.7,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?auto=format&fit=crop&q=80&w=800',
    tags: ['Lockout Fork', 'All-Terrain 2.1" Tires', 'Robust Alloy Frame'],
    colors: [COLORS.stealth, COLORS.forest, COLORS.ember],
    specs: {
      frame: '6061 Hydroformed Alloy, Trail-Optimized Geometry',
      fork: 'Zoom Velo lockout fork, 100mm travel',
      groupset: 'Shimano Altus 3x8 Speed (24 Gears)',
      brakes: 'Hydraulic Disc Brakes, 180mm front, 160mm rear',
      wheels: 'Alloy double-wall, 27.5" x 2.10" All-Terrain Tires',
      weight: '14.2 kg',
    }
  },
  {
    id: 'british-eagle-alder-26',
    name: 'British Eagle Alder 26T',
    category: 'mountain',
    tagline: 'Classic hardtail built for everyday adventure.',
    description: 'Designed for unmatched stability and control. The Alder 26T features a high-tensile steel frame, dual responsive disc brakes, and rugged 26-inch knobby tires. Perfect for teenagers and young adults cruising through Ahmedabad neighborhoods or exploring dirt tracks.',
    price: 15499,
    baseWeight: 14500, // 14.5kg
    rating: 4.6,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800',
    tags: ['Dual Disc Brakes', 'High-Tensile Steel', '26" All-Terrain Tires', 'Vibrant Colorways'],
    colors: [COLORS.stealth, COLORS.ember, COLORS.cobalt],
    specs: {
      frame: 'High-Tensile Steel Classic Hardtail Geometry',
      fork: 'Rigid Steel Sport Fork / 80mm Comfort Suspension Option',
      groupset: 'Single Speed with Heavy Duty Crankset',
      brakes: 'Dual Mechanical Disc Brakes, 160mm rotors',
      wheels: 'Double-Wall Alloy Rims, 26" x 2.10" Knobby MTB Tires',
      weight: '14.5 kg'
    }
  },
  {
    id: 'british-eagle-alder-29',
    name: 'British Eagle Alder 29T Multi-Speed',
    category: 'mountain',
    tagline: 'Dominate trails with 29-inch monster rolling power.',
    description: 'Take your off-road riding to the next level. Featuring a lightweight hydroformed alloy frame, 29-inch oversized wheels that easily roll over obstacles, and a Shimano Tourney 21-speed gear system. Excellent for long-distance trail exploration and daily fitness commutes.',
    price: 24999,
    baseWeight: 15200, // 15.2kg
    rating: 4.8,
    reviewCount: 105,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    tags: ['29" Big Wheels', 'Shimano 21-Speed', 'Lockout Suspension Fork', 'Alloy Frame'],
    colors: [COLORS.stealth, COLORS.forest, COLORS.sunset],
    specs: {
      frame: '6061 Hydroformed Aluminum Alloy Frame',
      fork: 'Preload Adjustable Suspension Fork with Mechanical Lockout, 100mm',
      groupset: 'Shimano Tourney 3x7 Speed (21 Gears) with EZ-Fire Shifters',
      brakes: 'High-performance Dual Mechanical Disc Brakes',
      wheels: 'Oversized Double-Wall Alloy Rims, 29" x 2.20" Trail-Bite Tires',
      weight: '15.2 kg'
    }
  },
  {
    id: 'british-eagle-falcon-20',
    name: 'British Eagle Falcon 20T',
    category: 'urban',
    tagline: 'The ultimate launchpad for junior champions.',
    description: 'Engineered specifically for young champions aged 6-9. Equipped with heavy-duty side support training wheels, a rugged chain guard for maximum safety, dual reliable caliper brakes, and a front cargo basket. Its stunning high-glossy decals make it an instant favorite.',
    price: 11499,
    baseWeight: 9800, // 9.8kg
    rating: 4.7,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800',
    tags: ['Heavy-Duty Training Wheels', 'Front Basket', 'Full Chain Guard', 'Padded Comfort Saddle'],
    colors: [COLORS.cobalt, COLORS.sunset, COLORS.ember],
    specs: {
      frame: 'Junior Low-Step High-Strength Steel Frame',
      fork: 'Rigid Unicrown Steel Fork',
      groupset: 'Single Speed with Easy-Pedal Ratio',
      brakes: 'Front & Rear Caliper Brakes with Short-Reach Levers',
      wheels: 'Steel Rims, 20" x 1.95" Junior Semi-Slick Tires',
      weight: '9.8 kg'
    }
  },
  {
    id: 'british-eagle-neon-24',
    name: 'British Eagle Neon 24T',
    category: 'mountain',
    tagline: 'Sporty junior trail weapon for active youths.',
    description: 'Designed for kids aged 8-12 who love speed and trails. Features a responsive front suspension fork to absorb bumps, dual disc brakes, and an easy-to-use Shimano 7-speed drivetrain with Revoshifter for quick gear transitions.',
    price: 17499,
    baseWeight: 12500, // 12.5kg
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
    tags: ['Shimano 7-Speed', 'Front Suspension', 'Disc Brakes', 'Aero Alloy Rims'],
    colors: [COLORS.stealth, COLORS.ember, COLORS.cobalt],
    specs: {
      frame: 'Junior-Sized Steel Hardtail Frame, Lowered Standover Height',
      fork: 'Comfort Suspension Fork, 50mm travel',
      groupset: 'Shimano Tourney 1x7 Speed with Revoshifter',
      brakes: 'Dual Mechanical Disc Brakes, 160mm',
      wheels: 'Double-Wall Alloy Rims, 24" x 2.10" All-Terrain Tires',
      weight: '12.5 kg'
    }
  },
  {
    id: 'british-eagle-siren',
    name: 'British Eagle Siren Ladies Hybrid',
    category: 'urban',
    tagline: 'Grace, elegance, and effortless city cruising.',
    description: 'Step through in style. The Siren is designed for modern women seeking a comfortable, graceful ride. Features an elegant low-step frame, a premium front wicker basket, matching full steel mudguards, integrated rear luggage carrier, and a plush spring-cushioned saddle.',
    price: 16999,
    baseWeight: 13800, // 13.8kg
    rating: 4.9,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1501147830916-ae44a9b13ca3?auto=format&fit=crop&q=80&w=800',
    tags: ['Low-Step Frame', 'Front Wicker Basket', 'Rear Luggage Rack', 'Spring Comfort Saddle'],
    colors: [COLORS.alpine, COLORS.forest, COLORS.sunset],
    specs: {
      frame: 'Elegant Low-Step High-Tensile Steel Frame',
      fork: 'Rigid High-Tensile Steel Comfort Fork',
      groupset: 'Single Speed with Anti-Slip Pedals and Guard',
      brakes: 'High-Performance Power V-Brakes',
      wheels: 'Lightweight Alloy Rims, 26" x 1.75" Easy-Roll Cream Tires',
      weight: '13.8 kg'
    }
  },
  {
    id: 'bsa-ladybird-shine',
    name: 'BSA Ladybird Shine',
    category: 'urban',
    tagline: 'The timeless icon of freedom for young girls.',
    description: 'The legendary classic that has defined growing up for millions of girls across India. The Ladybird Shine offers a lightweight steps-through frame, beautiful integrated front basket, decorative dress guard, ultra-comfortable printed saddle, and smooth-rolling tyres.',
    price: 8999,
    baseWeight: 12900, // 12.9kg
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&q=80&w=800',
    tags: ['Integrated Front Basket', 'Dress Guard', 'Step-Through Steel Frame', 'Printed Saddle'],
    colors: [COLORS.sunset, COLORS.cobalt, COLORS.alpine],
    specs: {
      frame: 'Specially Curved Low Standover Steel Frame',
      fork: 'Rigid Tubular Steel Fork',
      groupset: 'Single Speed with Light-Pedaling Gear Ratio',
      brakes: 'Front caliper and Rear band brakes',
      wheels: 'Steel Rims with 26" x 1.50" Comfort City Tyres',
      weight: '12.9 kg'
    }
  },
  {
    id: 'hercules-roadeo-hannibal',
    name: 'Hercules Roadeo Hannibal',
    category: 'mountain',
    tagline: 'Aggressive dual-suspension trail conqueror.',
    description: 'For the young thrill-seeker. The Hannibal features a rugged full-suspension frame that absorbs hard hits, dual mechanical disc brakes, and Shimano 21-speed gears. Stand out with its aggressive matte graphics and double-wall alloy wheelsets.',
    price: 19999,
    baseWeight: 16100, // 16.1kg
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=800',
    tags: ['Dual Suspension', 'Shimano 21-Speed', 'Oversized Double Disc', 'Bold Matte Decals'],
    colors: [COLORS.stealth, COLORS.ember, COLORS.forest],
    specs: {
      frame: 'Full-Suspension High-Strength Steel Frame with rear coil shock',
      fork: 'Threadless Suspension Fork, 80mm travel',
      groupset: 'Shimano Tourney 3x7 Speed (21 Gears) with Revoshift',
      brakes: 'High-Power Dual Mechanical Disc Brakes',
      wheels: 'Roadeo Double-Wall Alloy Rims, 26" x 2.125" Rugged Tires',
      weight: '16.1 kg'
    }
  },
  {
    id: 'velocore-carbon-road',
    name: 'VeloCore Carbon Road Pro',
    category: 'road',
    tagline: 'Elite club racing performance.',
    description: 'The ultimate machine for local speed enthusiasts and athletic endurance club riders. Full carbon monocoque construction, Shimano 105 Di2 2x12 speed electronic drivetrain, and aerodynamic profile designed for high-speed training on SG Highway.',
    price: 145000,
    baseWeight: 8100, // 8.1kg
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&q=80&w=800',
    tags: ['Electronic Shifting', 'Full Carbon', 'Shimano 105 Di2'],
    colors: [COLORS.stealth, COLORS.alpine, COLORS.cobalt],
    specs: {
      frame: 'High Modulus Toray T800 Carbon, Aero, Flat Mount Disc',
      fork: 'VeloCore Full Carbon tapered steerer fork',
      groupset: 'Shimano 105 Di2 R7150, 24-Speed Electronic',
      brakes: 'Shimano 105 Hydraulic Disc, 160mm rotors',
      wheels: 'C-Velo Aero 40mm Carbon Tubeless Ready',
      weight: '8.1 kg',
    }
  },
  {
    id: 'chamunda-city-zip-e',
    name: 'Chamunda City-Zip E-Bike',
    category: 'urban',
    tagline: 'Zip through Ahmedabad gridlock. Zero fatigue.',
    description: 'Smart urban mobility for the modern Ahmedabad resident. Features a high-efficiency 250W hub motor, fully integrated lithium-ion battery, built-in LED safety headlight, utility rear rack, and custom steel mudguards for monsoon rides.',
    price: 54999,
    baseWeight: 19500, // 19.5kg
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1571068316341-2f311c57d37d?auto=format&fit=crop&q=80&w=800',
    tags: ['250W Rear Hub', 'Integrated 36V Li-ion', 'Built-in Rear Rack'],
    colors: [COLORS.stealth, COLORS.alpine, COLORS.forest],
    specs: {
      frame: 'City Utility High-Strength Alloy with low standover height',
      fork: 'Rigid High-Tensile Steel Commuter Fork',
      groupset: 'Single Speed with 5-Level Pedal Assist System (PAS)',
      brakes: 'Mechanical Disc Brakes with power cut-off safety levers',
      wheels: 'Double-Wall Rims, 700x38C Anti-Puncture City Tires',
      weight: '19.5 kg',
      motor: '250W Brushless High-Torque Rear Hub Motor',
      battery: '36V 10.4Ah Lithium-ion, integrated, anti-theft key lock',
      range: 'Up to 60 km on throttle, 80 km on pedal assist',
    }
  }
];

export const BIKE_STORES = [
  {
    name: 'CHAMUNDA CYCLE SALES (Nana Chiloda Flagship)',
    address: 'Shop No-29, 30 Shikar avenue, near Priya palace, Nana Chiloda, Ahmedabad, Gujarat 382330',
    phone: '095508 08808',
    rating: '4.2',
    reviewsCount: '15',
    hours: '10:00 AM – 09:00 PM (Closes 9 PM)'
  },
  {
    name: 'CHAMUNDA CYCLE SALES (Gandhinagar Hub)',
    address: 'Shop 5-6, Infocity Commercial Arcade, Sector 11, Gandhinagar, Gujarat 382011',
    phone: '095508 08808',
    rating: '4.3',
    reviewsCount: '8',
    hours: '10:00 AM – 09:00 PM (Closes 9 PM)'
  },
  {
    name: 'CHAMUNDA CYCLE SALES (Vadodara Experience Center)',
    address: 'GF-12, Alkapuri Center, Opposite Railway Station, Vadodara, Gujarat 390007',
    phone: '095508 08808',
    rating: '4.5',
    reviewsCount: '12',
    hours: '10:00 AM – 09:00 PM (Closes 9 PM)'
  }
];

export const getStoredBikes = (): Bike[] => {
  if (typeof window === 'undefined') return BICYCLE_DATA_INITIAL;
  const stored = localStorage.getItem('CHAMUNDA_BICYCLE_DATA');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse CHAMUNDA_BICYCLE_DATA', e);
    }
  }
  // If not in storage, set initial data
  localStorage.setItem('CHAMUNDA_BICYCLE_DATA', JSON.stringify(BICYCLE_DATA_INITIAL));
  return BICYCLE_DATA_INITIAL;
};

export const saveStoredBikes = (bikes: Bike[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('CHAMUNDA_BICYCLE_DATA', JSON.stringify(bikes));
  }
};

export const BICYCLE_DATA: Bike[] = getStoredBikes();

export const ACCESSORY_DATA_INITIAL: Accessory[] = [
  {
    id: 'falcon-aero-helmet',
    name: 'Falcon Aero-Dynamic Helmet',
    category: 'safety',
    tagline: 'Ultra-light EPS core with aerodynamic wind-tunnel channels',
    description: 'Engineered with integrated insect net, magnetic dial-fit adjustment system, and removable moisture-wicking visor. Absolute impact safety certified.',
    price: 1850,
    rating: 4.8,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    tags: ['Aero Design', 'EPS Core', 'Safety Certified']
  },
  {
    id: 'securelock-u-bar',
    name: 'SecureLock U-Bar 5000',
    category: 'utility',
    tagline: 'Heavy-duty hardened steel anti-theft bicycle lock',
    description: '14mm double-loop hardened alloy steel shackle resistant to hand-tool cutting. Supplied with three laser-cut secure keys and flexible frame mount.',
    price: 1450,
    rating: 4.9,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&q=80&w=600',
    tags: ['Hardened Steel', 'Anti-Theft', '3 Keys Included']
  },
  {
    id: 'hydroslick-thermal-flask',
    name: 'HydroSlick Thermal Cage & Flask',
    category: 'comfort',
    tagline: 'Insulated 750ml stainless steel flask & reinforced cage',
    description: 'Double-walled vacuum sealed sports flask keeps hydration ice-cold up to 12 hours. Comes with an ultra-lightweight high-tensile alloy cage for reliable frame fitting.',
    price: 950,
    rating: 4.7,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600',
    tags: ['Thermal Insulation', 'Alloy Cage', '750ml Flask']
  },
  {
    id: 'vagabond-saddle-bag',
    name: 'Vagabond Waterproof Saddle Bag',
    category: 'utility',
    tagline: 'Quick-release under-seat luggage container',
    description: 'Seamless high-frequency welded canvas construction, 100% waterproof. Expands up to 2.5L to easily accommodate inner tubes, toolkits, keys, and cards safely.',
    price: 1100,
    rating: 4.6,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    tags: ['100% Waterproof', 'Quick Release', '2.5L Expandable']
  },
  {
    id: 'chronomax-gps-computer',
    name: 'ChronoMax Digital GPS Computer',
    category: 'gear',
    tagline: 'High-precision solar-assisted speed & navigation unit',
    description: 'Compact 2.2-inch anti-glare screen displays live speed, distance, elevation, and heart rate connectivity. Long-life battery with micro USB rechargeability.',
    price: 4200,
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600',
    tags: ['GPS Tracker', 'Solar Assist', 'ANT+ Bluetooth']
  },
  {
    id: 'ergogel-grip-set',
    name: 'ErgoGel Comfort Grip Set',
    category: 'comfort',
    tagline: 'Dual-density vibration damping handle grips',
    description: 'Designed ergonomically with wide palm rest plates to eliminate wrist fatigue during long highway test rides. Micro-texture nonslip finish provides elite control.',
    price: 650,
    rating: 4.5,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=600',
    tags: ['Ergonomic Design', 'Anti-Fatigue', 'Dual-Density']
  },
  {
    id: 'classic-hat-bell',
    name: "Classic Metal 'HAT' Retro Bell",
    category: 'safety',
    tagline: 'High-resonance traditional spring-trigger strike bell',
    description: "The classic mechanical strike dome bell with original 'HAT' embossing on the chrome trigger. Included absolutely FREE with every bicycle order!",
    price: 0,
    rating: 5.0,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    tags: ['Original HAT Trigger', 'High-Resonant Dome', 'Chrome & Black Finish', 'FREE Promo Gift']
  },
  {
    id: 'heavy-duty-cable-lock',
    name: "Premium Heavy-Duty Security Cable Lock",
    category: 'safety',
    tagline: 'Braided steel cable lock with double keys',
    description: "Premium heavy-duty red vinyl-coated steel wire lock. Included absolutely FREE with every cycle of size 24T, 26T, 27T, and 29T!",
    price: 0,
    rating: 5.0,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1583228752356-59147f5fc7c0?auto=format&fit=crop&q=80&w=600',
    tags: ['High-Strength Braided Steel', 'Scratch-Proof Red Vinyl', 'Dual Safety Keys', 'FREE Promo Gift']
  }
];

export const getStoredAccessories = (): Accessory[] => {
  if (typeof window === 'undefined') return ACCESSORY_DATA_INITIAL;
  const stored = localStorage.getItem('CHAMUNDA_ACCESSORY_DATA');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Accessory[];
      let updated = false;
      if (!parsed.some(acc => acc.id === 'classic-hat-bell')) {
        const newBell = ACCESSORY_DATA_INITIAL.find(acc => acc.id === 'classic-hat-bell');
        if (newBell) {
          parsed.unshift(newBell);
          updated = true;
        }
      }
      if (!parsed.some(acc => acc.id === 'heavy-duty-cable-lock')) {
        const newLock = ACCESSORY_DATA_INITIAL.find(acc => acc.id === 'heavy-duty-cable-lock');
        if (newLock) {
          // Put it right after classic-hat-bell or at the beginning
          parsed.unshift(newLock);
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem('CHAMUNDA_ACCESSORY_DATA', JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse CHAMUNDA_ACCESSORY_DATA', e);
    }
  }
  // If not in storage, set initial data
  localStorage.setItem('CHAMUNDA_ACCESSORY_DATA', JSON.stringify(ACCESSORY_DATA_INITIAL));
  return ACCESSORY_DATA_INITIAL;
};

export const saveStoredAccessories = (accessories: Accessory[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('CHAMUNDA_ACCESSORY_DATA', JSON.stringify(accessories));
  }
};

export const ACCESSORY_DATA: Accessory[] = getStoredAccessories();


