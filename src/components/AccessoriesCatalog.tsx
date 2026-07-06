/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, ShoppingCart, Star, Plus, Minus, Tag, Shield, SlidersHorizontal } from 'lucide-react';
import { Accessory, AccessoryCategory } from '../types';

interface AccessoriesCatalogProps {
  accessories: Accessory[];
  cartAccessories: { accessoryId: string; quantity: number }[];
  onAddToCart: (accessoryId: string) => void;
  onRemoveFromCart: (accessoryId: string) => void;
}

export default function AccessoriesCatalog({
  accessories,
  cartAccessories,
  onAddToCart,
  onRemoveFromCart
}: AccessoriesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<AccessoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { value: AccessoryCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Essentials' },
    { value: 'safety', label: 'Safety & Protection' },
    { value: 'utility', label: 'Cargo & Locking' },
    { value: 'comfort', label: 'Ergonomic Comfort' },
    { value: 'gear', label: 'Rider Gear & Tech' }
  ];

  // Filter & Search Logic
  const filteredAccessories = accessories.filter((accessory) => {
    const matchesCategory = selectedCategory === 'all' || accessory.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      accessory.name.toLowerCase().includes(searchLower) ||
      accessory.tagline.toLowerCase().includes(searchLower) ||
      accessory.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  const getCartQuantity = (accessoryId: string) => {
    const item = cartAccessories.find((i) => i.accessoryId === accessoryId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="accessories" className="py-24 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A] selection:bg-[#E8FF00] selection:text-black">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#E8FF00]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] text-[#E8FF00] font-black font-mono mb-4">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Speed Lab Additions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-white leading-none">
              CYCLE ACCESSORIES
            </h2>
            <p className="text-sm text-white/50 mt-4 max-w-xl font-light">
              Elevate your British Eagle or custom setup with premium-tier, aerodynamically tested essentials designed for maximum efficiency, style, and Ahmedabad roads.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 flex-shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Filter gear, helmet, lock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono uppercase tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
            />
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-3 rounded-full text-[9px] uppercase tracking-widest font-black transition-all cursor-pointer border ${
                selectedCategory === cat.value
                  ? 'bg-[#E8FF00] border-[#E8FF00] text-black shadow-lg shadow-[#E8FF00]/10'
                  : 'bg-[#121212] border-white/5 text-white/60 hover:text-white hover:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Accessories Grid */}
        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccessories.map((accessory) => {
              const qty = getCartQuantity(accessory.id);

              return (
                <div
                  key={accessory.id}
                  className="group relative bg-[#121212]/40 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:bg-[#121212]/80"
                >
                  {/* Top image panel */}
                  <div className="aspect-[16/10] relative w-full overflow-hidden bg-white border-b border-white/5">
                    <img
                      src={accessory.image}
                      alt={accessory.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Floating category badge */}
                    <span className="absolute top-4 left-4 bg-[#E8FF00]/10 border border-[#E8FF00]/20 text-[#E8FF00] px-2.5 py-1 rounded text-[8px] font-mono uppercase tracking-widest font-bold">
                      {accessory.category}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-display font-black text-lg text-white uppercase truncate group-hover:text-[#E8FF00] transition-colors">
                          {accessory.name}
                        </h4>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <Star className="w-3 h-3 text-[#E8FF00] fill-[#E8FF00]" />
                          <span className="text-[10px] font-mono font-bold text-white/80">
                            {accessory.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#E8FF00]/80 font-semibold tracking-wider uppercase mb-3 line-clamp-1">
                        {accessory.tagline}
                      </p>

                      <p className="text-xs text-white/50 leading-relaxed font-light mb-4 line-clamp-2">
                        {accessory.description}
                      </p>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 mb-6">
                      {accessory.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[8px] font-mono uppercase text-white/40 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom pricing / actions panel */}
                  <div className="px-6 pb-6 border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-white/40 uppercase block tracking-wider">Store Price</span>
                      <span className="font-mono font-black text-lg text-[#E8FF00]">
                        {(accessory.id === 'classic-hat-bell' || accessory.id === 'heavy-duty-cable-lock') ? 'FREE' : `₹${accessory.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    {/* Incremental Selector Button */}
                    {(accessory.id === 'classic-hat-bell' || accessory.id === 'heavy-duty-cable-lock') ? (
                      <div className="flex flex-col items-end space-y-1 text-right">
                        <div className="flex items-center space-x-1.5 bg-[#E8FF00]/10 border border-[#E8FF00]/30 text-[#E8FF00] px-3 py-2 rounded-full text-[8.5px] font-mono font-black uppercase tracking-wider">
                          <span>🎁 FREE GIFT</span>
                        </div>
                        <span className="text-[7px] font-mono text-white/50 uppercase tracking-wider block">
                          {accessory.id === 'classic-hat-bell' ? 'with every cycle' : 'with 24T, 26T, 27T, 29T'}
                        </span>
                      </div>
                    ) : qty > 0 ? (
                      <div className="flex items-center bg-[#E8FF00] text-black rounded-full p-1 border border-[#E8FF00] shadow-md">
                        <button
                          onClick={() => onRemoveFromCart(accessory.id)}
                          className="p-1.5 hover:bg-black/10 rounded-full transition-all focus:outline-none cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3.5 font-mono text-xs font-black select-none">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAddToCart(accessory.id)}
                          className="p-1.5 hover:bg-black/10 rounded-full transition-all focus:outline-none cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(accessory.id)}
                        className="flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-[#E8FF00] hover:bg-[#E8FF00] hover:text-black text-white/80 px-4 py-2.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Build</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-white/60 font-mono text-xs uppercase tracking-widest">
              No cycle accessories matched your search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
