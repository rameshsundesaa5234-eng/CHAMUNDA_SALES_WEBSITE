/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, X, Save, RotateCcw, Image, Tag, PlusCircle, 
  Settings, Check, LayoutGrid, Sparkles, Filter, Search, ShieldCheck 
} from 'lucide-react';
import { Bike, BikeCategory, BikeSpecs, ColorOption, Accessory, AccessoryCategory } from '../types';
import { COLORS } from '../data';
import BikeImage from './BikeImage';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bikes: Bike[];
  onUpdateBikes: (newBikes: Bike[]) => void;
  accessories: Accessory[];
  onUpdateAccessories: (newAccessories: Accessory[]) => void;
}

const CATEGORY_LABELS: Record<BikeCategory, string> = {
  road: 'Road/Aero',
  gravel: 'Gravel/All-Road',
  mountain: 'Mountain/Trail',
  urban: 'City/E-Commuter'
};

const ACCESSORY_CATEGORY_LABELS: Record<AccessoryCategory, string> = {
  safety: 'Safety & Protection',
  utility: 'Cargo & Locking',
  comfort: 'Ergonomic Comfort',
  gear: 'Rider Gear & Tech'
};

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  bikes, 
  onUpdateBikes,
  accessories,
  onUpdateAccessories
}: AdminPanelProps) {
  // Navigation & Search inside admin
  const [activeTab, setActiveTab] = useState<'bikes' | 'accessories'>('bikes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'all'>('all');
  const [selectedAccCategory, setSelectedAccCategory] = useState<AccessoryCategory | 'all'>('all');
  
  // Editor State (Bikes)
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Fields (Bikes)
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BikeCategory>('road');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(15000);
  const [baseWeight, setBaseWeight] = useState<number>(12000); // in grams
  const [rating, setRating] = useState<number>(4.8);
  const [reviewCount, setReviewCount] = useState<number>(42);
  const [image, setImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([COLORS.stealth.hex]);

  // Bike specs form fields
  const [specFrame, setSpecFrame] = useState('');
  const [specFork, setSpecFork] = useState('');
  const [specGroupset, setSpecGroupset] = useState('');
  const [specBrakes, setSpecBrakes] = useState('');
  const [specWheels, setSpecWheels] = useState('');
  const [specWeight, setSpecWeight] = useState('');
  
  // E-bike optional fields
  const [specMotor, setSpecMotor] = useState('');
  const [specBattery, setSpecBattery] = useState('');
  const [specRange, setSpecRange] = useState('');

  // Editor State (Accessories)
  const [editingAccessory, setEditingAccessory] = useState<Accessory | null>(null);
  const [isAddingNewAccessory, setIsAddingNewAccessory] = useState(false);
  
  // Accessory fields
  const [accId, setAccId] = useState('');
  const [accName, setAccName] = useState('');
  const [accCategory, setAccCategory] = useState<AccessoryCategory>('safety');
  const [accTagline, setAccTagline] = useState('');
  const [accDescription, setAccDescription] = useState('');
  const [accPrice, setAccPrice] = useState<number>(1000);
  const [accRating, setAccRating] = useState<number>(4.8);
  const [accReviewCount, setAccReviewCount] = useState<number>(20);
  const [accImage, setAccImage] = useState('');
  const [accTagsInput, setAccTagsInput] = useState('');

  // Confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Open the form to add a brand new bike
  const handleAddNewClick = () => {
    setFormError('');
    setIsAddingNew(true);
    setEditingBike(null);
    
    // Reset fields to defaults
    setId('');
    setName('');
    setCategory('road');
    setTagline('High performance chassis. Built for speed.');
    setDescription('Hand-built premium frameset optimized for maximum power transfer and endurance.');
    setPrice(18500);
    setBaseWeight(11500);
    setRating(4.8);
    setReviewCount(12);
    setImage('https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800');
    setTagsInput('Shimano Groupset, Disc Brakes, Aero Alloy Rims');
    setSelectedColors([COLORS.stealth.hex, COLORS.alpine.hex, COLORS.ember.hex]);

    setSpecFrame('Hi-Ten Premium Alloy Frame with slick internal routing');
    setSpecFork('British Eagle Rigidity/Carbon composite fork');
    setSpecGroupset('Shimano Tourney 21-Speed drivetrain');
    setSpecBrakes('High-Performance mechanical disc brakes');
    setSpecWheels('Double-Wall CNC alloy rims, 700x28C multi-terrain tires');
    setSpecWeight('11.5 kg');
    setSpecMotor('');
    setSpecBattery('');
    setSpecRange('');
  };

  // Open form to edit an existing bike
  const handleEditClick = (bike: Bike) => {
    setFormError('');
    setIsAddingNew(false);
    setEditingBike(bike);

    setId(bike.id);
    setName(bike.name);
    setCategory(bike.category);
    setTagline(bike.tagline);
    setDescription(bike.description);
    setPrice(bike.price);
    setBaseWeight(bike.baseWeight);
    setRating(bike.rating);
    setReviewCount(bike.reviewCount);
    setImage(bike.image);
    setTagsInput(bike.tags.join(', '));
    setSelectedColors(bike.colors.map(c => c.hex));

    setSpecFrame(bike.specs.frame || '');
    setSpecFork(bike.specs.fork || '');
    setSpecGroupset(bike.specs.groupset || '');
    setSpecBrakes(bike.specs.brakes || '');
    setSpecWheels(bike.specs.wheels || '');
    setSpecWeight(bike.specs.weight || '');
    setSpecMotor(bike.specs.motor || '');
    setSpecBattery(bike.specs.battery || '');
    setSpecRange(bike.specs.range || '');
  };

  // Delete a bike
  const handleDeleteConfirm = (bikeId: string) => {
    const updated = bikes.filter(b => b.id !== bikeId);
    onUpdateBikes(updated);
    setDeleteConfirmId(null);
  };

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setName(val);
    if (isAddingNew) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setId(slug);
    }
  };

  // Save changes
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!id.trim()) {
      setFormError('Please provide a unique product ID/Slug.');
      return;
    }
    if (!name.trim()) {
      setFormError('Please provide a product name.');
      return;
    }
    if (!image.trim()) {
      setFormError('Please provide an image URL.');
      return;
    }

    // Check if ID is unique when adding new
    if (isAddingNew && bikes.some(b => b.id === id)) {
      setFormError(`A bike with ID "${id}" already exists. Please use a unique name or custom ID.`);
      return;
    }

    // Convert comma-separated tags to array
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Map color hexes to ColorOption objects
    const mappedColors: ColorOption[] = Object.values(COLORS).filter(c => 
      selectedColors.includes(c.hex)
    );

    if (mappedColors.length === 0) {
      setFormError('Please select at least one active color Option.');
      return;
    }

    const specs: BikeSpecs = {
      frame: specFrame,
      fork: specFork,
      groupset: specGroupset,
      brakes: specBrakes,
      wheels: specWheels,
      weight: specWeight,
    };

    if (category === 'urban') {
      if (specMotor) specs.motor = specMotor;
      if (specBattery) specs.battery = specBattery;
      if (specRange) specs.range = specRange;
    }

    const newBike: Bike = {
      id,
      name,
      category,
      tagline,
      description,
      price,
      baseWeight,
      rating,
      reviewCount,
      image,
      tags: tagsArray,
      colors: mappedColors,
      specs,
    };

    let updatedBikes: Bike[];
    if (isAddingNew) {
      updatedBikes = [newBike, ...bikes];
    } else {
      updatedBikes = bikes.map(b => b.id === editingBike?.id ? newBike : b);
    }

    onUpdateBikes(updatedBikes);
    
    // Close forms
    setIsAddingNew(false);
    setEditingBike(null);
  };

  // Filters inside manager
  const filteredBikes = bikes.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle colors
  const handleColorToggle = (colorHex: string) => {
    if (selectedColors.includes(colorHex)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter(h => h !== colorHex));
      }
    } else {
      setSelectedColors([...selectedColors, colorHex]);
    }
  };

  // ACCESSORIES METHODS
  const handleAddNewAccessoryClick = () => {
    setFormError('');
    setIsAddingNewAccessory(true);
    setEditingAccessory(null);
    
    setAccId('');
    setAccName('');
    setAccCategory('safety');
    setAccTagline('High performance premium gear.');
    setAccDescription('Precision built accessory designed to integrate seamlessly with your cycle.');
    setAccPrice(1200);
    setAccRating(4.8);
    setAccReviewCount(15);
    setAccImage('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600');
    setAccTagsInput('High Durability, Waterproof, Custom Fit');
  };

  const handleEditAccessoryClick = (acc: Accessory) => {
    setFormError('');
    setIsAddingNewAccessory(false);
    setEditingAccessory(acc);

    setAccId(acc.id);
    setAccName(acc.name);
    setAccCategory(acc.category);
    setAccTagline(acc.tagline);
    setAccDescription(acc.description);
    setAccPrice(acc.price);
    setAccRating(acc.rating);
    setAccReviewCount(acc.reviewCount);
    setAccImage(acc.image);
    setAccTagsInput(acc.tags.join(', '));
  };

  const handleAccNameChange = (val: string) => {
    setAccName(val);
    if (isAddingNewAccessory) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setAccId(slug);
    }
  };

  const handleDeleteAccessoryConfirm = (idToDelete: string) => {
    const updated = accessories.filter(a => a.id !== idToDelete);
    onUpdateAccessories(updated);
    setDeleteConfirmId(null);
  };

  const handleSaveAccessoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!accId.trim()) {
      setFormError('Please provide a unique accessory ID/Slug.');
      return;
    }
    if (!accName.trim()) {
      setFormError('Please provide an accessory name.');
      return;
    }
    if (!accImage.trim()) {
      setFormError('Please provide an image URL.');
      return;
    }

    if (isAddingNewAccessory && accessories.some(a => a.id === accId)) {
      setFormError(`An accessory with ID "${accId}" already exists. Please use a unique name or custom ID.`);
      return;
    }

    const tagsArray = accTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newAcc: Accessory = {
      id: accId,
      name: accName,
      category: accCategory,
      tagline: accTagline,
      description: accDescription,
      price: accPrice,
      rating: accRating,
      reviewCount: accReviewCount,
      image: accImage,
      tags: tagsArray
    };

    let updatedAccs: Accessory[];
    if (isAddingNewAccessory) {
      updatedAccs = [newAcc, ...accessories];
    } else {
      updatedAccs = accessories.map(a => a.id === editingAccessory?.id ? newAcc : a);
    }

    onUpdateAccessories(updatedAccs);
    setIsAddingNewAccessory(false);
    setEditingAccessory(null);
  };

  const filteredAccessories = accessories.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedAccCategory === 'all' || a.category === selectedAccCategory;
    return matchesSearch && matchesCategory;
  });

  // Restore Default factory list
  const handleRestoreDefaults = () => {
    if (confirm('Are you sure you want to reset the product catalog to factory settings? All custom products and edits will be lost.')) {
      localStorage.removeItem('CHAMUNDA_BICYCLE_DATA');
      localStorage.removeItem('CHAMUNDA_ACCESSORY_DATA');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end" role="dialog" aria-modal="true">
      {/* Background Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
      />

      {/* Main Panel Body */}
      <div className="relative w-screen max-w-5xl bg-[#0F0F0F] border-l border-white/10 h-full flex flex-col text-white shadow-2xl overflow-hidden">
        
        {/* Panel Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#141414] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#E8FF00]/10 rounded-lg border border-[#E8FF00]/20">
              <Settings className="w-5 h-5 text-[#E8FF00]" />
            </div>
            <div>
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">Dynamic Catalog Manager</h3>
              <p className="text-[10px] font-mono tracking-widest text-[#E8FF00] uppercase">Store Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRestoreDefaults}
              className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Reset Catalog to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs for Bicycles vs Accessories */}
        <div className="flex border-b border-white/5 bg-[#141414]">
          <button
            onClick={() => {
              setActiveTab('bikes');
              setSearchQuery('');
              setDeleteConfirmId(null);
            }}
            className={`flex-1 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'bikes'
                ? 'border-[#E8FF00] text-[#E8FF00] bg-white/[0.02]'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            🚲 BICYCLES ({bikes.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('accessories');
              setSearchQuery('');
              setDeleteConfirmId(null);
            }}
            className={`flex-1 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'accessories'
                ? 'border-[#E8FF00] text-[#E8FF00] bg-white/[0.02]'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            🎒 ACCESSORIES ({accessories.length})
          </button>
        </div>

        {/* Panel Work Area split */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT PANEL */}
          <div className="w-1/2 border-r border-white/10 flex flex-col h-full bg-[#111111]">
            {activeTab === 'bikes' ? (
              <>
                {/* Search/Filters bar */}
                <div className="p-4 bg-[#141414] border-b border-white/5 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search products by name/slug..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] font-light"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none max-w-[260px]">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          selectedCategory === 'all'
                            ? 'bg-white text-black font-bold'
                            : 'text-white/40 border border-white/5 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      {(Object.keys(CATEGORY_LABELS) as BikeCategory[]).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            selectedCategory === cat
                              ? 'bg-white text-black font-bold'
                              : 'text-white/40 border border-white/5 hover:text-white'
                          }`}
                        >
                          {CATEGORY_LABELS[cat]}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleAddNewClick}
                      className="bg-[#E8FF00] hover:scale-[1.03] active:scale-[0.98] text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all shrink-0 shadow-md shadow-[#E8FF00]/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* List Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredBikes.length === 0 ? (
                    <div className="text-center py-20">
                      <LayoutGrid className="w-10 h-10 text-white/10 mx-auto mb-3" />
                      <p className="text-xs text-white/40 uppercase tracking-wider font-mono">No matching products found</p>
                    </div>
                  ) : (
                    filteredBikes.map(bike => (
                      <div 
                        key={bike.id}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between group ${
                          editingBike?.id === bike.id 
                            ? 'bg-[#E8FF00]/5 border-[#E8FF00]/40' 
                            : 'bg-[#161616] border-white/5 hover:bg-neutral-900 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          {/* Thumbnail */}
                          <div className="w-14 h-11 rounded-lg overflow-hidden bg-black/60 border border-white/5 flex-shrink-0">
                            <BikeImage 
                              src={bike.image} 
                              alt={bike.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product identity */}
                          <div className="min-w-0">
                            <span className="text-[8px] font-mono tracking-widest text-[#E8FF00]/80 uppercase block">
                              {CATEGORY_LABELS[bike.category]}
                            </span>
                            <h4 className="font-display font-black text-xs text-white uppercase tracking-tight truncate max-w-[180px]">
                              {bike.name}
                            </h4>
                            <span className="font-mono text-[9px] text-white/50 block">
                              ₹{bike.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditClick(bike)}
                            className="p-2 rounded-lg text-white/40 hover:text-[#E8FF00] hover:bg-white/5 transition-all cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          {deleteConfirmId === bike.id ? (
                            <div className="flex items-center space-x-1 animate-fade-in bg-red-950/40 border border-red-500/20 rounded-lg p-1">
                              <button
                                onClick={() => handleDeleteConfirm(bike.id)}
                                className="px-2 py-1 bg-red-600 text-white text-[8px] font-mono font-bold uppercase rounded hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-1 text-white/40 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(bike.id)}
                              className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* List footer count */}
                <div className="p-3 bg-[#141414] border-t border-white/5 text-[9px] font-mono tracking-widest text-white/30 uppercase text-center">
                  Active Fleet Count: {bikes.length} Models
                </div>
              </>
            ) : (
              <>
                {/* Search/Filters bar for Accessories */}
                <div className="p-4 bg-[#141414] border-b border-white/5 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search accessories by name/slug..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] font-light"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none max-w-[260px]">
                      <button
                        onClick={() => setSelectedAccCategory('all')}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          selectedAccCategory === 'all'
                            ? 'bg-white text-black font-bold'
                            : 'text-white/40 border border-white/5 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      {(Object.keys(ACCESSORY_CATEGORY_LABELS) as AccessoryCategory[]).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedAccCategory(cat)}
                          className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            selectedAccCategory === cat
                              ? 'bg-white text-black font-bold'
                              : 'text-white/40 border border-white/5 hover:text-white'
                          }`}
                        >
                          {cat.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleAddNewAccessoryClick}
                      className="bg-[#E8FF00] hover:scale-[1.03] active:scale-[0.98] text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all shrink-0 shadow-md shadow-[#E8FF00]/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Gear</span>
                    </button>
                  </div>
                </div>

                {/* List Body for Accessories */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredAccessories.length === 0 ? (
                    <div className="text-center py-20">
                      <LayoutGrid className="w-10 h-10 text-white/10 mx-auto mb-3" />
                      <p className="text-xs text-white/40 uppercase tracking-wider font-mono">No matching accessories found</p>
                    </div>
                  ) : (
                    filteredAccessories.map(acc => (
                      <div 
                        key={acc.id}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between group ${
                          editingAccessory?.id === acc.id 
                            ? 'bg-[#E8FF00]/5 border-[#E8FF00]/40' 
                            : 'bg-[#161616] border-white/5 hover:bg-neutral-900 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          {/* Thumbnail */}
                          <div className="w-14 h-11 rounded-lg overflow-hidden bg-black/60 border border-white/5 flex-shrink-0">
                            <img 
                              src={acc.image} 
                              alt={acc.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Identity */}
                          <div className="min-w-0">
                            <span className="text-[8px] font-mono tracking-widest text-[#E8FF00]/80 uppercase block">
                              {ACCESSORY_CATEGORY_LABELS[acc.category]}
                            </span>
                            <h4 className="font-display font-black text-xs text-white uppercase tracking-tight truncate max-w-[180px]">
                              {acc.name}
                            </h4>
                            <span className="font-mono text-[9px] text-white/50 block">
                              ₹{acc.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditAccessoryClick(acc)}
                            className="p-2 rounded-lg text-white/40 hover:text-[#E8FF00] hover:bg-white/5 transition-all cursor-pointer"
                            title="Edit Accessory"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          {deleteConfirmId === acc.id ? (
                            <div className="flex items-center space-x-1 animate-fade-in bg-red-950/40 border border-red-500/20 rounded-lg p-1">
                              <button
                                onClick={() => handleDeleteAccessoryConfirm(acc.id)}
                                className="px-2 py-1 bg-red-600 text-white text-[8px] font-mono font-bold uppercase rounded hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-1 text-white/40 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(acc.id)}
                              className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                              title="Delete Accessory"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* List footer count */}
                <div className="p-3 bg-[#141414] border-t border-white/5 text-[9px] font-mono tracking-widest text-white/30 uppercase text-center">
                  Active Accessory Count: {accessories.length} Items
                </div>
              </>
            )}
          </div>

          {/* RIGHT PANEL: Edit / Add Form */}
          <div className="w-1/2 bg-[#0F0F0F] flex flex-col h-full overflow-hidden">
            {activeTab === 'bikes' ? (
              !(isAddingNew || editingBike) ? (
                /* State: No bike selected */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-white/20" />
                  </div>
                  <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">No Selection</h4>
                  <p className="text-[11px] text-white/40 max-w-xs mx-auto mt-1 leading-normal font-light">
                    Select a product from the list to edit its technical configurations, or create a brand new product catalog entry.
                  </p>
                  <button
                    onClick={handleAddNewClick}
                    className="mt-5 text-xs font-black uppercase tracking-wider text-[#E8FF00] hover:underline flex items-center space-x-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create a Product Entry</span>
                  </button>
                </div>
              ) : (
                /* State: Editor is Open */
                <form onSubmit={handleSaveForm} className="flex-1 flex flex-col h-full overflow-hidden">
                  
                  {/* Form Title banner */}
                  <div className="px-5 py-4 border-b border-white/10 bg-[#161616] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#E8FF00]" />
                      <h4 className="font-display font-black text-xs uppercase tracking-widest text-white">
                        {isAddingNew ? 'Add Catalog Product' : `Modifying Spec: ${editingBike?.name}`}
                      </h4>
                    </div>
                    <span className="font-mono text-[9px] tracking-wider text-[#E8FF00] uppercase bg-[#E8FF00]/10 px-2.5 py-1 rounded">
                      {isAddingNew ? 'New Entry' : 'Active Edit'}
                    </span>
                  </div>

                  {/* Form Fields - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {formError && (
                      <div className="p-3 bg-red-950/60 border border-red-500/20 text-red-300 text-[10px] rounded-lg flex items-center space-x-2 font-mono">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Field Section: Core details */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono uppercase tracking-widest text-white/40 pb-1 border-b border-white/5">01 // Core Specification</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Product Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. British Eagle Alpha"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Product ID / Slug *</label>
                          <input
                            type="text"
                            required
                            disabled={!isAddingNew}
                            placeholder="e.g. british-eagle-alpha"
                            value={id}
                            onChange={(e) => setId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] disabled:opacity-50 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Category *</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as BikeCategory)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          >
                            {(Object.keys(CATEGORY_LABELS) as BikeCategory[]).map(cat => (
                              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Price (INR ₹) *</label>
                          <input
                            type="number"
                            required
                            min={100}
                            placeholder="18499"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Base Weight (grams) *</label>
                          <input
                            type="number"
                            required
                            placeholder="11500"
                            value={baseWeight}
                            onChange={(e) => setBaseWeight(Number(e.target.value))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Tags (Comma-separated)</label>
                          <input
                            type="text"
                            placeholder="Internal Routing, Single Speed, Disc Brakes"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Hero Tagline *</label>
                        <input
                          type="text"
                          required
                          placeholder="Absolute speed. High glossy decals. Internal routing."
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Description *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Detailed specifications and marketing story of the bicycle model..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] resize-none"
                        />
                      </div>
                    </div>

                    {/* Field Section: Image and Color options */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono uppercase tracking-widest text-white/40 pb-1 border-b border-white/5">02 // Assets & Colors</h5>
                      
                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Product Image URL *</label>
                        <div className="flex space-x-3">
                          <input
                            type="url"
                            required
                            placeholder="https://images.unsplash.com/..."
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                          <div className="w-12 h-9 border border-white/10 rounded-lg overflow-hidden shrink-0 bg-black flex items-center justify-center">
                            {image ? (
                              <BikeImage src={image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Image className="w-4 h-4 text-white/20" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1.5">
                          Available Color Combinations (Select at least 1)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.values(COLORS).map(col => {
                            const isSelected = selectedColors.includes(col.hex);
                            return (
                              <button
                                type="button"
                                key={col.hex}
                                onClick={() => handleColorToggle(col.hex)}
                                className={`p-2 rounded-lg border text-left flex items-center space-x-2 cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-white/5 border-[#E8FF00] text-white' 
                                    : 'bg-black/40 border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full ${col.bgClass} flex items-center justify-center shrink-0`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
                                </span>
                                <span className="text-[10px] font-mono uppercase truncate">{col.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Field Section: Technical Specs */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono uppercase tracking-widest text-white/40 pb-1 border-b border-white/5">03 // Technical Frame Specification</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Chassis / Frame Spec</label>
                          <input
                            type="text"
                            placeholder="Hi-Ten Steel Premium Frame"
                            value={specFrame}
                            onChange={(e) => setSpecFrame(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Suspension / Fork Spec</label>
                          <input
                            type="text"
                            placeholder="Steel Rigid Comfort Fork"
                            value={specFork}
                            onChange={(e) => setSpecFork(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Groupset Drivetrain</label>
                          <input
                            type="text"
                            placeholder="Single Speed Noiseless Freewheel"
                            value={specGroupset}
                            onChange={(e) => setSpecGroupset(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Braking Kit</label>
                          <input
                            type="text"
                            placeholder="Double Mechanical Disc Brakes"
                            value={specBrakes}
                            onChange={(e) => setSpecBrakes(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Wheels & Tires</label>
                          <input
                            type="text"
                            placeholder="Double-Wall Rims, 700x35C"
                            value={specWheels}
                            onChange={(e) => setSpecWheels(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Finished Weight Label</label>
                          <input
                            type="text"
                            placeholder="11.2 kg"
                            value={specWeight}
                            onChange={(e) => setSpecWeight(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      {category === 'urban' && (
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3.5 animate-fade-in">
                          <span className="text-[8px] font-mono tracking-widest text-[#E8FF00] block uppercase font-bold">⚡ ELECTRIC E-BIKE INTEGRATIONS</span>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[7px] font-mono uppercase text-white/40 tracking-wider mb-1">Motor Kit</label>
                              <input
                                type="text"
                                placeholder="250W Rear Hub Motor"
                                value={specMotor}
                                onChange={(e) => setSpecMotor(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#E8FF00]"
                              />
                            </div>
                            <div>
                              <label className="block text-[7px] font-mono uppercase text-white/40 tracking-wider mb-1">Battery Kit</label>
                              <input
                                type="text"
                                placeholder="36V 10.4Ah Lithium"
                                value={specBattery}
                                onChange={(e) => setSpecBattery(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#E8FF00]"
                              />
                            </div>
                            <div>
                              <label className="block text-[7px] font-mono uppercase text-white/40 tracking-wider mb-1">Assist Range</label>
                              <input
                                type="text"
                                placeholder="60 - 80 km"
                                value={specRange}
                                onChange={(e) => setSpecRange(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#E8FF00]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Footer Action */}
                  <div className="p-4 border-t border-white/10 bg-[#141414] flex items-center justify-between shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingBike(null);
                      }}
                      className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-white/40 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#E8FF00] hover:scale-[1.02] active:scale-[0.98] text-black px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer transition-all shadow-md shadow-[#E8FF00]/10"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Specification</span>
                    </button>
                  </div>

                </form>
              )
            ) : (
              // ACCESSORIES RIGHT PANEL
              !(isAddingNewAccessory || editingAccessory) ? (
                /* State: No accessory selected */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4">
                    <Tag className="w-6 h-6 text-white/20" />
                  </div>
                  <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">No Accessory Selected</h4>
                  <p className="text-[11px] text-white/40 max-w-xs mx-auto mt-1 leading-normal font-light">
                    Select an accessory from the left list to edit its configurations, or add a new accessory entry to the cycle accessories collection.
                  </p>
                  <button
                    onClick={handleAddNewAccessoryClick}
                    className="mt-5 text-xs font-black uppercase tracking-wider text-[#E8FF00] hover:underline flex items-center space-x-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create an Accessory Entry</span>
                  </button>
                </div>
              ) : (
                /* State: Accessory Editor is Open */
                <form onSubmit={handleSaveAccessoryForm} className="flex-1 flex flex-col h-full overflow-hidden">
                  
                  {/* Form Title banner */}
                  <div className="px-5 py-4 border-b border-white/10 bg-[#161616] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#E8FF00]" />
                      <h4 className="font-display font-black text-xs uppercase tracking-widest text-white">
                        {isAddingNewAccessory ? 'Add Accessory Entry' : `Modifying Accessory: ${editingAccessory?.name}`}
                      </h4>
                    </div>
                    <span className="font-mono text-[9px] tracking-wider text-[#E8FF00] uppercase bg-[#E8FF00]/10 px-2.5 py-1 rounded">
                      {isAddingNewAccessory ? 'New Entry' : 'Active Edit'}
                    </span>
                  </div>

                  {/* Form Fields - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {formError && (
                      <div className="p-3 bg-red-950/60 border border-red-500/20 text-red-300 text-[10px] rounded-lg flex items-center space-x-2 font-mono">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono uppercase tracking-widest text-white/40 pb-1 border-b border-white/5">01 // Core Specification</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Accessory Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aero Hydration Pod"
                            value={accName}
                            onChange={(e) => handleAccNameChange(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Product ID / Slug *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. aero-hydration-pod"
                            value={accId}
                            onChange={(e) => setAccId(e.target.value)}
                            disabled={!isAddingNewAccessory}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Category *</label>
                          <select
                            value={accCategory}
                            onChange={(e) => setAccCategory(e.target.value as AccessoryCategory)}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          >
                            {(Object.keys(ACCESSORY_CATEGORY_LABELS) as AccessoryCategory[]).map(cat => (
                              <option key={cat} value={cat}>{ACCESSORY_CATEGORY_LABELS[cat]}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Price (INR ₹) *</label>
                          <input
                            type="number"
                            required
                            placeholder="1200"
                            value={accPrice}
                            onChange={(e) => setAccPrice(Number(e.target.value))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Rating *</label>
                          <input
                            type="number"
                            step="0.1"
                            max="5"
                            required
                            placeholder="4.8"
                            value={accRating}
                            onChange={(e) => setAccRating(Number(e.target.value))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Review Count</label>
                          <input
                            type="number"
                            placeholder="42"
                            value={accReviewCount}
                            onChange={(e) => setAccReviewCount(Number(e.target.value))}
                            className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Image URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="https://..."
                          value={accImage}
                          onChange={(e) => setAccImage(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Tagline *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aerodynamic, ultra-light hydration pod"
                          value={accTagline}
                          onChange={(e) => setAccTagline(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Description *</label>
                        <textarea
                          required
                          placeholder="e.g. This premium accessory is designed to enhance your riding comfort and experience."
                          value={accDescription}
                          onChange={(e) => setAccDescription(e.target.value)}
                          rows={3}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-wider mb-1">Feature Tags (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Weatherproof, Durable, Aerodynamic"
                          value={accTagsInput}
                          onChange={(e) => setAccTagsInput(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8FF00]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Footer Action */}
                  <div className="p-4 border-t border-white/10 bg-[#141414] flex items-center justify-between shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewAccessory(false);
                        setEditingAccessory(null);
                      }}
                      className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-white/40 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#E8FF00] hover:scale-[1.02] active:scale-[0.98] text-black px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer transition-all shadow-md shadow-[#E8FF00]/10"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Accessory</span>
                    </button>
                  </div>

                </form>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
