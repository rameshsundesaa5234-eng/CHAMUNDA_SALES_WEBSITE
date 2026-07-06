/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Scale, Star } from 'lucide-react';
import { Bike } from '../types';
import BikeImage from './BikeImage';

interface BikeCompareProps {
  comparedBikes: Bike[];
  onRemoveFromCompare: (bikeId: string) => void;
  onClearCompare: () => void;
}

export default function BikeCompare({
  comparedBikes,
  onRemoveFromCompare,
  onClearCompare
}: BikeCompareProps) {
  if (comparedBikes.length === 0) {
    return null;
  }

  const comparisonAttributes = [
    { label: 'Category', getValue: (b: Bike) => b.category.toUpperCase() },
    { label: 'Price', getValue: (b: Bike) => `₹${b.price.toLocaleString('en-IN')}`, highlight: true },
    { label: 'Weight', getValue: (b: Bike) => b.specs.weight, highlight: true },
    { label: 'Groupset', getValue: (b: Bike) => b.specs.groupset },
    { label: 'Braking System', getValue: (b: Bike) => b.specs.brakes },
    { label: 'Frame compound', getValue: (b: Bike) => b.specs.frame },
    { label: 'Fork/Shock setup', getValue: (b: Bike) => b.specs.fork },
    { label: 'Wheelset standard', getValue: (b: Bike) => b.specs.wheels },
    { label: 'E-Motor Drive', getValue: (b: Bike) => b.specs.motor || 'Not Applicable' },
    { label: 'E-Battery Rating', getValue: (b: Bike) => b.specs.battery || 'Not Applicable' },
    { label: 'Est. Range', getValue: (b: Bike) => b.specs.range || 'Not Applicable' },
  ];

  return (
    <section id="compare" className="py-20 bg-[#0F0F0F] border-b border-white/10 scroll-mt-20 selection:bg-[#E8FF00] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-[#E8FF00] mb-2">
              <Scale className="w-5 h-5" />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Comparison Matrix</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
              Technical Comparison
            </h2>
          </div>

          <button
            onClick={onClearCompare}
            className="mt-4 sm:mt-0 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-[#E8FF00] border border-white/15 px-4 py-2 rounded-full hover:bg-white/5 transition-all cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {comparedBikes.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl scrollbar-none">
            <table className="w-full min-w-[650px] border-collapse bg-[#141414]">
              <thead>
                <tr className="border-b border-white/10 bg-[#1A1A1A]">
                  <th className="w-1/4 p-5 text-left text-[9px] font-mono tracking-wider uppercase text-white/40 font-bold">Specs Criteria</th>
                  {comparedBikes.map((bike) => (
                    <th key={bike.id} className="p-5 text-left min-w-[200px] align-top relative">
                      {/* Close button */}
                      <button
                        onClick={() => onRemoveFromCompare(bike.id)}
                        className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-[#E8FF00] hover:bg-white/5 rounded-full cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Header product */}
                      <div className="pr-6">
                        <BikeImage
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-24 object-cover rounded-xl mb-3 border border-white/10 bg-white"
                        />
                        <h4 className="font-display font-black text-sm text-white uppercase tracking-tight truncate">
                          {bike.name}
                        </h4>
                        <div className="flex items-center space-x-1 text-xs text-[#E8FF00] mt-1 font-mono font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#E8FF00] text-[#E8FF00]" />
                          <span>{bike.rating}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonAttributes.map((attr, index) => (
                  <tr 
                    key={attr.label}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      index % 2 === 0 ? 'bg-[#141414]' : 'bg-[#181818]'
                    }`}
                  >
                    <td className="p-5 text-[9px] font-mono tracking-widest uppercase text-white/40 font-bold align-middle">
                      {attr.label}
                    </td>
                    {comparedBikes.map((bike) => {
                      const val = attr.getValue(bike);
                      return (
                        <td 
                          key={bike.id + attr.label}
                          className={`p-5 text-xs text-white/80 ${
                            attr.highlight ? 'font-mono font-bold text-[#E8FF00] text-sm' : ''
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
