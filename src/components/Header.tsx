/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Bike, ShoppingBag, Menu, X, Hammer, Ruler, MessageSquare, Settings } from 'lucide-react';
import { CustomizerState } from '../types';
import ChamundaLogo from './ChamundaLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cartCount, onOpenCart, onOpenAdmin, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Explore Models', id: 'explore', icon: Bike },
    { label: 'Accessories', id: 'accessories', icon: ShoppingBag },
    { label: 'Sizing Chart', id: 'sizing', icon: Ruler },
    { label: 'Inquiry', id: 'inquiry', icon: MessageSquare },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/10 text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center cursor-pointer group py-1"
          >
            <ChamundaLogo size={48} showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.2em] font-semibold">
            {navItems.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-white/60 hover:text-[#E8FF00] hover:scale-105 transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Cart & Customization Status Indicator */}
          <div className="flex items-center space-x-3">
            {/* Admin Settings Button */}
            <button
              onClick={onOpenAdmin}
              className="relative p-2.5 rounded-full border border-white/10 text-white/70 hover:text-[#E8FF00] hover:border-[#E8FF00] transition-all focus:outline-none cursor-pointer flex items-center justify-center"
              title="Store Admin Portal"
              aria-label="Store Admin Portal"
            >
              <Settings className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8FF00]"></span>
              </span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#E8FF00] transition-all focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Your Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E8FF00] text-black text-[9px] font-mono font-black h-5 w-5 rounded-full flex items-center justify-center border border-[#0F0F0F]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#E8FF00] transition-all text-left"
              >
                <Icon className="w-4 h-4 text-[#E8FF00]" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          {/* Mobile Admin Portal Item */}
          <button
            onClick={() => {
              onOpenAdmin();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#E8FF00] transition-all text-left border-t border-white/5 pt-4"
          >
            <Settings className="w-4 h-4 text-[#E8FF00] animate-spin-slow" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}
    </header>
  );
}
