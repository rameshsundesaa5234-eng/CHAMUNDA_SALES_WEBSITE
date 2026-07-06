/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Star, Scale, MessageSquare, SlidersHorizontal, ShoppingCart, CheckCircle, HelpCircle } from 'lucide-react';
import { Bike, BikeCategory, ColorOption } from '../types';
import BikeImage from './BikeImage';

interface BikeCatalogProps {
  bikes: Bike[];
  onSelectForInquiry: (bikeId: string) => void;
  onOrderOnline: (bikeId: string, colorHex: string) => void;
  onAddToCompare: (bike: Bike) => void;
  comparedBikeIds: string[];
}

export default function BikeCatalog({
  bikes,
  onSelectForInquiry,
  onOrderOnline,
  onAddToCompare,
  comparedBikeIds
}: BikeCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'weight'>('rating');

  const categories: { label: string; value: BikeCategory | 'all' }[] = [
    { label: 'All Fleet', value: 'all' },
    { label: 'Road/Aero', value: 'road' },
    { label: 'Gravel/All-Road', value: 'gravel' },
    { label: 'Mountain/Trail', value: 'mountain' },
    { label: 'City/E-Commuter', value: 'urban' },
  ];

  // Filter & Search Logic
  const filteredBikes = bikes.filter((bike) => {
    const matchesCategory = selectedCategory === 'all' || bike.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      bike.name.toLowerCase().includes(searchLower) ||
      bike.tagline.toLowerCase().includes(searchLower) ||
      bike.specs.groupset.toLowerCase().includes(searchLower) ||
      bike.tags.some(tag => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  // Sort Logic
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'weight') return a.baseWeight - b.baseWeight;
    return 0;
  });

  return (
    <section id="explore" className="py-20 sm:py-28 bg-[#0F0F0F] border-b border-white/10 selection:bg-[#E8FF00] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#E8FF00] text-xs font-black uppercase tracking-[0.2em] mb-4">The Selection</div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            Professional Fleet
          </h2>
          <p className="mt-4 text-white/50 text-sm sm:text-base leading-relaxed font-light">
            From precision-tuned aero weapons to ultra-tough gravel adventure rigs and smart commuter assistants. Choose a model below to order online or register for dedicated callback assistance.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#141414] rounded-2xl border border-white/10 p-5 sm:p-6 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#E8FF00] text-black shadow-lg shadow-[#E8FF00]/10'
                      : 'text-white/60 border border-white/10 hover:text-white hover:border-[#E8FF00]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search specs, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-wider font-semibold placeholder:text-white/30 text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2 border border-white/10 rounded-xl px-4 py-2.5 bg-[#1A1A1A]">
                <SlidersHorizontal className="w-4 h-4 text-[#E8FF00]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs uppercase tracking-wider font-bold bg-transparent border-none outline-none focus:ring-0 text-white/85 cursor-pointer"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="weight">Ultralight First</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Fleet Grid */}
        {sortedBikes.length === 0 ? (
          <div className="bg-[#141414] border border-dashed border-white/10 rounded-2xl p-12 text-center max-w-md mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/70 font-bold text-sm">No configurations found matching search filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-[#E8FF00] hover:underline"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBikes.map((bike) => {
              const isCompared = comparedBikeIds.includes(bike.id);
              return (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  isCompared={isCompared}
                  onSelectForInquiry={onSelectForInquiry}
                  onOrderOnline={onOrderOnline}
                  onAddToCompare={onAddToCompare}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

/* Individual Bike Card Component with Local Color State */
interface BikeCardProps {
  key?: string | number;
  bike: Bike;
  isCompared: boolean;
  onSelectForInquiry: (bikeId: string) => void;
  onOrderOnline: (bikeId: string, colorHex: string) => void;
  onAddToCompare: (bike: Bike) => void;
}

function BikeCard({
  bike,
  isCompared,
  onSelectForInquiry,
  onOrderOnline,
  onAddToCompare
}: BikeCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(bike.colors[0]);

  return (
    <div className="group bg-[#141414] rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-white/20 transition-all duration-300">
      
      {/* Bike Image Container */}
      <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-white/5">
        <BikeImage
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500 bg-white"
        />
        
        {/* Floating rating badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <Star className="w-3.5 h-3.5 fill-[#E8FF00] text-[#E8FF00]" />
          <span className="text-xs font-mono font-bold text-white">{bike.rating}</span>
          <span className="text-[9px] text-white/40">({bike.reviewCount})</span>
        </div>

        {/* Bike Category Tag */}
        <div className="absolute top-3 right-3 bg-[#E8FF00] text-black px-2.5 py-1 rounded text-[9px] font-mono tracking-widest uppercase font-black">
          {bike.category}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between text-left">
        <div>
          <h3 className="font-display text-xl font-black uppercase tracking-tight text-white">
            {bike.name}
          </h3>
          <p className="text-[10px] text-[#E8FF00] font-bold mt-1 tracking-widest uppercase">
            {bike.tagline}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-white/50 leading-relaxed font-light line-clamp-3">
            {bike.description}
          </p>

          {/* Micro Specs */}
          <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-y-3 gap-x-4">
            <div>
              <span className="block text-[8px] font-mono uppercase tracking-wider text-white/40">Groupset</span>
              <span className="text-xs font-bold text-white/80 truncate block">{bike.specs.groupset.split(',')[0]}</span>
            </div>
            <div>
              <span className="block text-[8px] font-mono uppercase tracking-wider text-white/40">Brake Set</span>
              <span className="text-xs font-bold text-white/80 truncate block">{bike.specs.brakes.split(',')[0]}</span>
            </div>
            <div>
              <span className="block text-[8px] font-mono uppercase tracking-wider text-white/40">Frame Compound</span>
              <span className="text-xs font-bold text-white/80 truncate block">{bike.specs.frame.split(',')[0]}</span>
            </div>
            <div>
              <span className="block text-[8px] font-mono uppercase tracking-wider text-white/40">Weight</span>
              <span className="text-xs font-bold text-[#E8FF00] truncate block font-mono">{bike.specs.weight}</span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="mt-5 flex items-center space-x-3">
            <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 font-bold">Select Finish:</span>
            <div className="flex space-x-2">
              {bike.colors.map((col) => {
                const isActive = selectedColor.hex === col.hex;
                return (
                  <button
                    key={col.name}
                    title={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-5 h-5 rounded-full ${col.bgClass} border cursor-pointer transition-all ${
                      isActive ? 'ring-2 ring-[#E8FF00] scale-110 border-white' : 'border-white/10 hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] text-white/60 font-mono uppercase">
              {selectedColor.name}
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-6 pt-5 border-t border-white/5">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">Retail MSRP</span>
            <span className="text-xl sm:text-2xl font-mono font-black text-[#E8FF00]">
              ₹{bike.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Buttons: Order Online AND Inquire */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onOrderOnline(bike.id, selectedColor.hex)}
              className="flex items-center justify-center space-x-1 py-3 bg-[#E8FF00] text-black rounded-full text-[10px] font-black uppercase tracking-wider hover:scale-105 transition-all focus:outline-none cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Order Online</span>
            </button>

            <button
              onClick={() => onSelectForInquiry(bike.id)}
              className="flex items-center justify-center space-x-1 py-3 border border-white/10 text-white hover:border-[#E8FF00] hover:text-[#E8FF00] rounded-full text-[10px] font-black uppercase tracking-wider hover:scale-105 transition-all focus:outline-none cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire / Callback</span>
            </button>
          </div>

          {/* Compare Toggle */}
          <button
            onClick={() => onAddToCompare(bike)}
            className={`w-full mt-3 py-2 rounded-lg text-[9px] font-mono tracking-widest uppercase font-black transition-all flex items-center justify-center space-x-1 focus:outline-none cursor-pointer ${
              isCompared
                ? 'bg-[#E8FF00]/10 text-[#E8FF00] border border-[#E8FF00]/30'
                : 'text-white/40 hover:text-[#E8FF00]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Compare List' : 'Compare Specifications'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
