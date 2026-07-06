/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Trash2, ShoppingBag, CreditCard, ChevronRight, CheckCircle, 
  Sparkles, ShieldCheck, Heart, AlertCircle, ShoppingCart 
} from 'lucide-react';

import { Bike, CustomizerState, Accessory } from './types';
import { getStoredBikes, saveStoredBikes, getStoredAccessories, saveStoredAccessories } from './data';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import BikeCatalog from './components/BikeCatalog';
import BikeCompare from './components/BikeCompare';
import SizingCalculator from './components/SizingCalculator';
import InquiryForm from './components/InquiryForm';
import BikeImage from './components/BikeImage';
import AdminPanel from './components/AdminPanel';
import AccessoriesCatalog from './components/AccessoriesCatalog';

const isQualifyingBike = (bike: Bike) => {
  const nameLower = bike.name.toLowerCase();
  const descLower = bike.description.toLowerCase();
  const specsLower = JSON.stringify(bike.specs).toLowerCase();
  
  // Check explicit T sizes
  if (nameLower.includes('24t') || nameLower.includes('26t') || nameLower.includes('27t') || nameLower.includes('29t')) {
    return true;
  }
  
  // Check specs/wheels sizes
  if (specsLower.includes('24"') || specsLower.includes('26"') || specsLower.includes('27.5"') || specsLower.includes('29"') || specsLower.includes('27.5') || specsLower.includes('27t') || specsLower.includes('29t') || specsLower.includes('26t') || specsLower.includes('24t')) {
    return true;
  }

  // Also match descriptions
  if (descLower.includes('24-inch') || descLower.includes('26-inch') || descLower.includes('27.5-inch') || descLower.includes('29-inch') || descLower.includes('27.5 inch')) {
    return true;
  }

  // Also match name with '27.5' or '24', '26', '27', '29' with space
  if (nameLower.includes('27.5') || nameLower.includes('26 ') || nameLower.includes('29 ')) {
    return true;
  }

  return false;
};

export default function App() {
  // Catalog State (persisted to localStorage)
  const [bikes, setBikes] = useState<Bike[]>(() => getStoredBikes());
  const [accessories, setAccessories] = useState<Accessory[]>(() => getStoredAccessories());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleUpdateBikes = (newBikes: Bike[]) => {
    setBikes(newBikes);
    saveStoredBikes(newBikes);
  };

  const handleUpdateAccessories = (newAccessories: Accessory[]) => {
    setAccessories(newAccessories);
    saveStoredAccessories(newAccessories);
  };

  // Accessories Cart State
  const [cartAccessories, setCartAccessories] = useState<{ accessoryId: string; quantity: number }[]>([]);

  const handleAddAccessoryToCart = (accessoryId: string) => {
    setCartAccessories(prev => {
      const existing = prev.find(item => item.accessoryId === accessoryId);
      if (existing) {
        return prev.map(item => item.accessoryId === accessoryId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { accessoryId, quantity: 1 }];
    });
  };

  const handleRemoveAccessoryFromCart = (accessoryId: string) => {
    setCartAccessories(prev => {
      const existing = prev.find(item => item.accessoryId === accessoryId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.accessoryId === accessoryId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.accessoryId !== accessoryId);
    });
  };

  // Navigation coordination states
  const [preselectedBikeId, setPreselectedBikeId] = useState<string | null>(null);
  const [preselectedInquiryId, setPreselectedInquiryId] = useState<string | null>(null);

  // Compare List states
  const [comparedBikes, setComparedBikes] = useState<Bike[]>([]);

  // Cart / Saved custom builds states
  const [savedBuilds, setSavedBuilds] = useState<CustomizerState[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout Sim State
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryDistance, setDeliveryDistance] = useState<number>(5);
  const [deliveryState, setDeliveryState] = useState<'gujarat' | 'out_of_state'>('gujarat');
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'paytm' | 'upi'>('gpay');
  const [upiTxnId, setUpiTxnId] = useState('');

  const [purchaseReceipt, setPurchaseReceipt] = useState<{
    orderId: string;
    builds: CustomizerState[];
    accessories: { name: string; quantity: number; price: number }[];
    totalCost: number;
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    deliveryMethod: 'delivery' | 'pickup';
    paymentMethod: 'gpay' | 'paytm' | 'upi';
    upiTxnId: string;
    daysToDeliver: number;
    deliveryDistance?: number;
    deliveryFee?: number;
    deliveryState?: 'gujarat' | 'out_of_state';
  } | null>(null);

  // Navigation click handler (handles smooth scroll to anchors)
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select Bike for Customizer & scroll
  const handleSelectForCustomizer = (bikeId: string) => {
    setPreselectedBikeId(bikeId);
    handleNavigate('customizer');
  };

  // Select Bike for Inquiry & scroll
  const handleSelectForInquiry = (bikeId: string) => {
    setPreselectedInquiryId(bikeId);
    handleNavigate('inquiry');
  };

  // Add/Remove to Compare List (Max 3)
  const handleAddToCompare = (bike: Bike) => {
    if (comparedBikes.some((b) => b.id === bike.id)) {
      setComparedBikes(comparedBikes.filter((b) => b.id !== bike.id));
      return;
    }
    if (comparedBikes.length >= 3) {
      alert('You can compare a maximum of 3 models at a time. Please remove a model first.');
      return;
    }
    setComparedBikes([...comparedBikes, bike]);
    handleNavigate('compare');
  };

  const handleRemoveFromCompare = (bikeId: string) => {
    setComparedBikes(comparedBikes.filter((b) => b.id !== bikeId));
  };

  const handleClearCompare = () => {
    setComparedBikes([]);
  };

  // Add configuration to saved builds cart
  const handleSaveConfiguration = (config: CustomizerState) => {
    setSavedBuilds([...savedBuilds, config]);
    setIsCartOpen(true);
  };

  // Add standard bike from catalog directly to cart
  const handleOrderOnline = (bikeId: string, colorHex: string) => {
    const bike = bikes.find((b) => b.id === bikeId);
    if (!bike) return;

    const selectedColor = bike.colors.find((c) => c.hex === colorHex) || bike.colors[0];

    const newBuild: CustomizerState = {
      baseBikeId: bikeId,
      selectedColor,
      handlebar: 'flat',
      tireWidth: 28,
      saddle: 'gel',
      addMudguards: false,
      addRack: false,
      addBottleCages: false,
      addKickstand: false,
    };

    setSavedBuilds([...savedBuilds, newBuild]);
    setIsCartOpen(true);
  };

  // Remove configuration from cart
  const handleRemoveBuild = (index: number) => {
    setSavedBuilds(savedBuilds.filter((_, idx) => idx !== index));
  };

  // Cart Totals calculators
  const calculateCartTotal = () => {
    const buildsCost = savedBuilds.reduce((acc, build) => {
      const baseBike = bikes.find((b) => b.id === build.baseBikeId)!;
      let cost = baseBike ? baseBike.price : 0;
      if (!baseBike) return acc;
      
      // color premium (only if it is not one of the standard colors defined for the base bike)
      const isStandardColor = baseBike.colors.some((c) => c.hex === build.selectedColor.hex);
      if (!isStandardColor) cost += 12000;

      // cockpit premium
      if (build.handlebar === 'integrated') cost += 20000;
      // tires premium
      if (build.tireWidth > 32) cost += 4800;
      
      // accessories premium
      if (build.addMudguards) cost += 5200;
      if (build.addRack) cost += 6800;
      if (build.addBottleCages) cost += 2400;
      if (build.addKickstand) cost += 2000;

      return acc + cost;
    }, 0);

    const accessoriesCost = cartAccessories.reduce((acc, item) => {
      const accItem = accessories.find(a => a.id === item.accessoryId);
      return acc + (accItem ? accItem.price * item.quantity : 0);
    }, 0);

    return buildsCost + accessoriesCost;
  };

  const cartTotal = calculateCartTotal();
  const deliveryFee = deliveryMethod === 'delivery' 
    ? (deliveryState === 'out_of_state' ? 500 : (deliveryDistance <= 20 ? 0 : (deliveryDistance - 20) * 15)) 
    : 0;
  const finalTotal = cartTotal + deliveryFee;

  // Simulated Checkout Submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName.trim() || !shippingPhone.trim()) {
      alert('Please fill out your contact details.');
      return;
    }

    if (deliveryMethod === 'delivery' && (!shippingAddress.trim() || !shippingZip.trim())) {
      alert('Please fill out your full delivery coordinates.');
      return;
    }

    const orderId = `CE-${(Math.random() * 900000 + 100000).toFixed(0)}`;
    
    // Map items for receipt summary
    const orderAccessories = cartAccessories.map(item => {
      const acc = accessories.find(a => a.id === item.accessoryId);
      return {
        name: acc ? acc.name : 'Accessory Gear',
        quantity: item.quantity,
        price: acc ? acc.price : 0
      };
    });

    if (savedBuilds.length > 0) {
      orderAccessories.push({
        name: "Classic Metal 'HAT' Retro Bell",
        quantity: savedBuilds.length,
        price: 0
      });

      // Calculate how many cycles in the order qualify for the free cable lock (24T, 26T, 27T, 29T)
      const qualifyingCount = savedBuilds.filter(build => {
        const bike = bikes.find(b => b.id === build.baseBikeId);
        return bike ? isQualifyingBike(bike) : false;
      }).length;

      if (qualifyingCount > 0) {
        orderAccessories.push({
          name: "Premium Heavy-Duty Security Cable Lock",
          quantity: qualifyingCount,
          price: 0
        });
      }
    }

    setPurchaseReceipt({
      orderId,
      builds: [...savedBuilds],
      accessories: orderAccessories,
      totalCost: finalTotal,
      shippingName,
      shippingPhone,
      shippingAddress: deliveryMethod === 'pickup' ? ' Nana Chiloda Showroom, Ahmedabad' : shippingAddress,
      deliveryMethod,
      paymentMethod,
      upiTxnId,
      daysToDeliver: deliveryMethod === 'pickup' ? 1 : (deliveryState === 'out_of_state' ? 6 : 3 + Math.floor(Math.random() * 2)), // 6 days for out of state, 3-5 days for local
      deliveryDistance: (deliveryMethod === 'delivery' && deliveryState === 'gujarat') ? deliveryDistance : undefined,
      deliveryFee: deliveryMethod === 'delivery' ? deliveryFee : undefined,
      deliveryState: deliveryMethod === 'delivery' ? deliveryState : undefined
    });

    // Clear cart entirely
    setSavedBuilds([]);
    setCartAccessories([]);
    setShowCheckout(false);
  };

  const handleCloseReceipt = () => {
    setPurchaseReceipt(null);
    setIsCartOpen(false);
    setShippingName('');
    setShippingPhone('');
    setShippingAddress('');
    setShippingZip('');
    setUpiTxnId('');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white scroll-smooth selection:bg-[#E8FF00] selection:text-black">
      
      {/* Dynamic Header */}
      <Header 
        cartCount={savedBuilds.length + cartAccessories.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Hero Banner Section */}
      <Hero 
        onExplore={() => handleNavigate('explore')}
      />

      {/* Main Page Layout Flow */}
      <main className="relative">
        
        {/* Bike Catalog / Product Grid */}
        <BikeCatalog 
          bikes={bikes}
          onSelectForInquiry={handleSelectForInquiry}
          onOrderOnline={handleOrderOnline}
          onAddToCompare={handleAddToCompare}
          comparedBikeIds={comparedBikes.map((b) => b.id)}
        />

        {/* Dynamic Comparison Matrix Drawer/Section */}
        <BikeCompare 
          comparedBikes={comparedBikes}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearCompare={handleClearCompare}
        />

        {/* Dynamic Cycle Accessories Catalog */}
        <AccessoriesCatalog
          accessories={accessories}
          cartAccessories={cartAccessories}
          onAddToCart={handleAddAccessoryToCart}
          onRemoveFromCart={handleRemoveAccessoryFromCart}
        />

        {/* Interactive Frame Size Chart & Fit Guide */}
        <SizingCalculator />

        {/* Product Inquiry & Callback Sales Desk */}
        <InquiryForm 
          bikes={bikes}
          preselectedBikeId={preselectedInquiryId}
        />

      </main>

      {/* Store Catalog Manager Overlay Modal */}
      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bikes={bikes}
        onUpdateBikes={handleUpdateBikes}
        accessories={accessories}
        onUpdateAccessories={handleUpdateAccessories}
      />

      {/* --- SIDE DRAWER: BUILD CART & SIMULATED CHECKOUT --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Overlay backdrop */}
          <div 
            onClick={() => { setIsCartOpen(false); setShowCheckout(false); }} 
            className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#141414] border-l border-white/10 shadow-2xl flex flex-col h-full text-white">
              
              {/* Header */}
              <div className="px-5 py-6 border-b border-white/5 flex items-center justify-between bg-black text-white">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#E8FF00]" />
                  <h3 className="font-display font-black text-xs uppercase tracking-widest">
                    {purchaseReceipt ? 'Purchase Receipt' : showCheckout ? 'Secure Checkout' : `Shopping Cart (${savedBuilds.length + cartAccessories.reduce((sum, item) => sum + item.quantity, 0)})`}
                  </h3>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setShowCheckout(false); }}
                  className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {purchaseReceipt ? (
                  /* ORDER RECEIPT CONTEXT */
                  <div className="text-left space-y-6">
                    <div className="text-center py-4 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-[#E8FF00]/10 border border-[#E8FF00]/30 flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-[#E8FF00]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">Order Placed Successfully!</h4>
                        <p className="text-[10px] text-white/40 mt-1 uppercase font-mono">Reference No: <span className="font-mono font-bold text-[#E8FF00]">{purchaseReceipt.orderId}</span></p>
                      </div>
                    </div>

                    {/* Notification Callout */}
                    <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/20 rounded-xl p-3.5 space-y-1.5 text-xs text-[#E8FF00]/90">
                      <p className="font-bold uppercase tracking-wider text-[10px]">📞 Sales Team Callback:</p>
                      <p className="text-[11px] leading-relaxed text-white/70 font-light">
                        Our Nana Chiloda showroom desk has logged your order. We will call/WhatsApp you at <span className="font-semibold text-white">{purchaseReceipt.shippingPhone}</span> within 2 hours to verify and arrange delivery!
                      </p>
                    </div>

                    {/* Order Details Grid */}
                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3 text-[10px] font-mono uppercase tracking-wider text-white/60">
                      <div className="flex justify-between pb-2 border-b border-white/5">
                        <span className="text-white/40">Customer Name</span>
                        <span className="font-black text-white">{purchaseReceipt.shippingName}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/5">
                        <span className="text-white/40">Fulfillment Mode</span>
                        <span className="font-black text-[#E8FF00]">{purchaseReceipt.deliveryMethod === 'pickup' ? 'Store Pickup' : 'Home Delivery'}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/5">
                        <span className="text-white/40">Destination Address</span>
                        <span className="font-black text-white text-right max-w-[200px] truncate">{purchaseReceipt.shippingAddress}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/5">
                        <span className="text-white/40">Payment Selected</span>
                        <span className="font-black text-white">
                          {purchaseReceipt.paymentMethod === 'cod' 
                            ? 'Cash on Delivery' 
                            : purchaseReceipt.paymentMethod === 'card' 
                            ? 'Card on Delivery' 
                            : purchaseReceipt.paymentMethod === 'gpay'
                            ? 'Google Pay (Online)'
                            : purchaseReceipt.paymentMethod === 'paytm'
                            ? 'Paytm (Online)'
                            : 'UPI Instant Pay'}
                        </span>
                      </div>
                      {purchaseReceipt.upiTxnId && (
                        <div className="flex justify-between pb-2 border-b border-white/5">
                          <span className="text-white/40">UPI Ref ID</span>
                          <span className="font-black text-[#E8FF00]">{purchaseReceipt.upiTxnId}</span>
                        </div>
                      )}
                      <div className="flex justify-between pb-2 border-b border-white/5">
                        <span className="text-white/40">Setup Status</span>
                        <span className="font-black text-white">{purchaseReceipt.deliveryMethod === 'pickup' ? 'Ready in 24 Hours' : `${purchaseReceipt.daysToDeliver} Business Days`}</span>
                      </div>
                      {purchaseReceipt.deliveryMethod === 'delivery' && (
                        <>
                          {purchaseReceipt.deliveryState === 'out_of_state' ? (
                            <>
                              <div className="flex justify-between pb-2 border-b border-white/5">
                                <span className="text-white/40">Delivery Region</span>
                                <span className="font-black text-white font-mono text-[10px] uppercase">Outside Gujarat</span>
                              </div>
                              <div className="flex justify-between pb-2 border-b border-white/5">
                                <span className="text-white/40">Delivery Charge</span>
                                <span className="font-black text-[#E8FF00]">₹500 (Flat Rate)</span>
                              </div>
                            </>
                          ) : (
                            <>
                              {purchaseReceipt.deliveryDistance !== undefined && (
                                <div className="flex justify-between pb-2 border-b border-white/5">
                                  <span className="text-white/40">Showroom Distance</span>
                                  <span className="font-black text-white">{purchaseReceipt.deliveryDistance} KM</span>
                                </div>
                              )}
                              <div className="flex justify-between pb-2 border-b border-white/5">
                                <span className="text-white/40">Delivery Charge</span>
                                <span className="font-black text-[#E8FF00]">
                                  {purchaseReceipt.deliveryFee === 0 ? 'FREE (UPTO 20 KM PROMO)' : `₹${purchaseReceipt.deliveryFee?.toLocaleString('en-IN')}`}
                                </span>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Itemized list of purchased items */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono uppercase text-white/40 tracking-widest font-black block">Order Items Summary</span>
                      <div className="bg-[#1A1A1A] rounded-xl p-4 divide-y divide-white/5 space-y-2.5">
                        {purchaseReceipt.builds.map((build, index) => {
                          const bike = bikes.find(b => b.id === build.baseBikeId);
                          return (
                            <div key={index} className="flex justify-between text-[11px] uppercase tracking-wider font-mono pt-2 first:pt-0">
                              <span className="text-white/80 font-bold max-w-[220px] truncate">
                                {bike ? bike.name : 'Cycle'} ({build.selectedColor.name})
                              </span>
                              <span className="text-[#E8FF00] font-bold">
                                ₹{bike ? bike.price.toLocaleString('en-IN') : '0'}
                              </span>
                            </div>
                          );
                        })}
                        {purchaseReceipt.accessories.map((item, index) => (
                          <div key={index} className="flex justify-between text-[11px] uppercase tracking-wider font-mono pt-2">
                            <span className="text-white/80 font-bold">
                              {item.name} (x{item.quantity})
                            </span>
                            <span className="text-[#E8FF00] font-bold">
                              {item.price === 0 ? 'FREE' : `₹${(item.price * item.quantity).toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest font-mono pt-3 text-white border-t border-white/10">
                          <span>Final Total Charged</span>
                          <span className="text-[#E8FF00]">
                            ₹{purchaseReceipt.totalCost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseReceipt}
                      className="w-full py-4 bg-[#E8FF00] text-black hover:scale-[1.02] rounded-full text-xs font-black transition-all uppercase tracking-widest cursor-pointer shadow-lg shadow-[#E8FF00]/10 text-center"
                    >
                      Acknowledge & Continue
                    </button>
                  </div>

                ) : (savedBuilds.length === 0 && cartAccessories.length === 0) ? (
                  /* EMPTY CART CONTEXT */
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-white/5 border border-dashed border-white/10 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingCart className="w-8 h-8 text-white/20" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white uppercase tracking-wider text-sm">Your Cart is Empty</h4>
                      <p className="text-[11px] text-white/40 max-w-[220px] mx-auto mt-1 leading-normal font-light">
                        Select a cycle from our professional catalog and order online directly!
                      </p>
                    </div>
                    <button
                      onClick={() => { setIsCartOpen(false); handleNavigate('explore'); }}
                      className="text-xs font-black uppercase tracking-wider text-[#E8FF00] hover:underline"
                    >
                      View Cycle Models
                    </button>
                  </div>

                ) : showCheckout ? (
                  /* SECURE CHECKOUT FORM */
                  <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-left">
                    <div className="pb-3 border-b border-white/5">
                      <h4 className="font-display font-black text-white text-xs uppercase tracking-widest">Order Coordinates</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Provide details to register your website order</p>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. Ramesh Patel"
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          className="w-full px-3.5 py-3 border border-white/10 rounded-xl text-xs bg-black/40 text-white placeholder:text-white/20 focus:bg-[#1A1A1A] focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] focus:outline-none transition-all uppercase tracking-wider font-semibold"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">WhatsApp / Phone Number</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="E.g. 9876543210 (10-digit mobile)"
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          className="w-full px-3.5 py-3 border border-white/10 rounded-xl text-xs bg-black/40 text-white placeholder:text-white/20 focus:bg-[#1A1A1A] focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] focus:outline-none transition-all font-mono"
                        />
                      </div>

                      {/* Delivery Method Choice */}
                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Fulfillment Type</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`py-3.5 px-3 rounded-xl border text-[10px] uppercase font-bold tracking-wider transition-all text-center cursor-pointer ${
                              deliveryMethod === 'delivery'
                                ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                                : 'bg-black/20 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            Home Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('pickup')}
                            className={`py-3.5 px-3 rounded-xl border text-[10px] uppercase font-bold tracking-wider transition-all text-center cursor-pointer ${
                              deliveryMethod === 'pickup'
                                ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                                : 'bg-black/20 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            Store Pickup
                          </button>
                        </div>
                      </div>

                      {/* Delivery Address Details (only if delivery is chosen) */}
                      {deliveryMethod === 'delivery' && (
                        <div className="space-y-4 animate-fade-in">
                          {/* Delivery Region Selection */}
                          <div>
                            <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Delivery State/Region</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setDeliveryState('gujarat')}
                                className={`py-3 px-2 rounded-xl border text-[9px] uppercase font-bold tracking-wider transition-all text-center cursor-pointer ${
                                  deliveryState === 'gujarat'
                                    ? 'bg-[#E8FF00]/15 text-[#E8FF00] border-[#E8FF00]'
                                    : 'bg-black/20 text-white/60 border-white/10 hover:border-white/20'
                                }`}
                              >
                                Gujarat State (In-State)
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeliveryState('out_of_state')}
                                className={`py-3 px-2 rounded-xl border text-[9px] uppercase font-bold tracking-wider transition-all text-center cursor-pointer ${
                                  deliveryState === 'out_of_state'
                                    ? 'bg-[#E8FF00]/15 text-[#E8FF00] border-[#E8FF00]'
                                    : 'bg-black/20 text-white/60 border-white/10 hover:border-white/20'
                                }`}
                              >
                                Outside Gujarat State
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">
                              {deliveryState === 'gujarat' ? 'Delivery Address (Gujarat Only)' : 'Delivery Address (Outside Gujarat)'}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={deliveryState === 'gujarat' ? "House, Street, Area Name, Ahmedabad" : "Full Address, City, State (e.g. Mumbai, Maharashtra)"}
                              value={shippingAddress}
                              onChange={(e) => setShippingAddress(e.target.value)}
                              className="w-full px-3.5 py-3 border border-white/10 rounded-xl text-xs bg-black/40 text-white placeholder:text-white/20 focus:bg-[#1A1A1A] focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] focus:outline-none transition-all uppercase tracking-wider font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Postal pincode</label>
                            <input
                              type="text"
                              required
                              pattern="[0-9]{6}"
                              placeholder="382330"
                              value={shippingZip}
                              onChange={(e) => setShippingZip(e.target.value)}
                              className="w-full px-3.5 py-3 border border-white/10 rounded-xl text-xs bg-black/40 text-white placeholder:text-white/20 focus:bg-[#1A1A1A] focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] focus:outline-none transition-all font-mono"
                            />
                          </div>

                          {deliveryState === 'gujarat' ? (
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest">
                                  Showroom Distance (in KM)
                                </label>
                                <span className="text-[9px] font-mono text-[#E8FF00] font-black uppercase tracking-wider">
                                  {deliveryDistance <= 20 ? '🎁 FREE Delivery' : `Charge: ₹${((deliveryDistance - 20) * 15).toLocaleString('en-IN')}`}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-3 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5">
                                <input
                                  type="range"
                                  min="1"
                                  max="100"
                                  value={deliveryDistance}
                                  onChange={(e) => setDeliveryDistance(Number(e.target.value))}
                                  className="flex-1 accent-[#E8FF00] h-1"
                                />
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    min="1"
                                    max="150"
                                    value={deliveryDistance}
                                    onChange={(e) => setDeliveryDistance(Math.max(1, Number(e.target.value)))}
                                    className="w-14 text-center px-1 py-1 rounded border border-white/15 bg-neutral-900 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#E8FF00]"
                                  />
                                  <span className="text-[10px] font-mono text-white/60 font-bold uppercase">KM</span>
                                </div>
                              </div>
                              
                              <p className="text-[9px] font-mono text-white/40 uppercase mt-1.5 leading-normal">
                                {deliveryDistance <= 20 ? (
                                  <span className="text-[#E8FF00] font-bold">
                                    🎉 Special Promo: Delivery is absolutely FREE for orders within 20 KM from our Nana Chiloda Showroom!
                                  </span>
                                ) : (
                                  <span>
                                    First 20 KM is FREE! Standard rate of ₹15 per KM applies for remaining {deliveryDistance - 20} KM.
                                  </span>
                                )}
                              </p>
                            </div>
                          ) : (
                            <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/20 rounded-xl p-3.5 space-y-1">
                              <span className="block text-[9px] font-mono font-black uppercase text-[#E8FF00]">
                                ✈️ Out of State Delivery Info:
                              </span>
                              <p className="text-[10px] text-white/80 leading-normal font-semibold">
                                Flat rate delivery of <span className="text-[#E8FF00] font-black">₹500</span> applies for deliveries outside Gujarat.
                              </p>
                              <p className="text-[8.5px] text-white/40 uppercase tracking-wider font-mono">
                                Estimated delivery timeline: 5 to 7 business days with premium courier tracking.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {deliveryMethod === 'pickup' && (
                        <div className="bg-[#E8FF00]/10 p-3.5 border border-[#E8FF00]/20 rounded-xl space-y-1">
                          <span className="block text-[9px] font-mono font-black uppercase text-[#E8FF00]">Pickup Location:</span>
                          <p className="text-[10px] text-white/80 font-semibold leading-normal">
                            Chamunda Cycle Sales Showroom: Shop No-29, 30 Shikar avenue, Nana Chiloda, Ahmedabad, Gujarat 382330
                          </p>
                          <p className="text-[9px] text-white/40 uppercase tracking-wider font-mono">Ready time: 24 Hours (Fully customized alignment)</p>
                        </div>
                      )}

                      {/* Payment Method Choice */}
                      <div>
                        <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Payment Option (Pay Online / Direct Bank Transfer)</label>
                        <div className="grid grid-cols-3 gap-1.5 mt-1">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('gpay')}
                            className={`py-2.5 px-1 rounded-lg border text-[9px] uppercase font-black tracking-wider transition-all text-center cursor-pointer ${
                              paymentMethod === 'gpay'
                                ? 'bg-[#4285F4] text-white border-[#4285F4]'
                                : 'bg-black/20 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            Google Pay
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('paytm')}
                            className={`py-2.5 px-1 rounded-lg border text-[9px] uppercase font-black tracking-wider transition-all text-center cursor-pointer ${
                              paymentMethod === 'paytm'
                                ? 'bg-[#00baf2] text-white border-[#00baf2]'
                                : 'bg-black/20 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            Paytm
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`py-2.5 px-1 rounded-lg border text-[9px] uppercase font-black tracking-wider transition-all text-center cursor-pointer ${
                              paymentMethod === 'upi'
                                ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                                : 'bg-black/20 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            UPI QR
                          </button>
                        </div>
                      </div>

                      {/* Online Payment block for UPI, Google Pay, and Paytm */}
                      {(paymentMethod === 'upi' || paymentMethod === 'gpay' || paymentMethod === 'paytm') && (
                        <div className="bg-black/50 p-5 border border-white/10 rounded-xl space-y-4 animate-fade-in text-center">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-[#E8FF00] uppercase tracking-widest block font-bold">
                              {paymentMethod === 'gpay' ? 'Google Pay Transfer' : paymentMethod === 'paytm' ? 'Paytm Transfer' : 'Direct Scan & Pay'}
                            </span>
                            <span className="text-[10px] text-white/50 block">
                              {paymentMethod === 'gpay' 
                                ? 'Send money directly to our verified Google Pay merchant ID' 
                                : paymentMethod === 'paytm' 
                                ? 'Send money directly to our verified Paytm merchant ID' 
                                : 'Scan this real-time dynamic QR code to pay instantly'}
                            </span>
                          </div>

                          {/* High-Fidelity UPI QR Card mimicking the image exactly */}
                          <div className="bg-white p-4 rounded-xl max-w-[220px] mx-auto border-2 border-[#E8FF00] shadow-xl shadow-[#E8FF00]/5 text-black">
                            <span className="block text-[11px] font-sans font-black tracking-widest uppercase mb-2 text-neutral-800">
                              {paymentMethod === 'gpay' ? 'GOOGLE PAY' : paymentMethod === 'paytm' ? 'PAYTM' : 'SCAN & PAY'}
                            </span>
                            
                            {/* Dynamic Live QR code generated for this transaction */}
                            <div className="w-40 h-40 mx-auto bg-neutral-100 flex items-center justify-center p-1.5 rounded-lg border border-neutral-200">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                                  `upi://pay?pa=chamundasales@cnrb&pn=Chamunda Cycle Sales&am=${finalTotal}&cu=INR`
                                )}`}
                                alt="UPI scan and pay QR code"
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="mt-3 bg-neutral-100 py-1.5 px-2 rounded-lg border border-neutral-200/60 select-all cursor-pointer group hover:bg-neutral-200 transition-colors">
                              <span className="block text-[8px] font-mono text-neutral-400 uppercase font-black tracking-wider">UPI ID</span>
                              <span className="block text-[11px] font-mono font-black text-neutral-800">
                                chamundasales@cnrb
                              </span>
                            </div>
                          </div>

                          {/* Interactive Deep Links for Mobile Users */}
                          <div className="pt-2">
                            <a
                              href={`upi://pay?pa=chamundasales@cnrb&pn=Chamunda Cycle Sales&am=${finalTotal}&cu=INR`}
                              className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.01] transition-transform shadow-lg ${
                                paymentMethod === 'gpay'
                                  ? 'bg-[#4285F4] text-white shadow-[#4285F4]/15'
                                  : paymentMethod === 'paytm'
                                  ? 'bg-[#00baf2] text-white shadow-[#00baf2]/15'
                                  : 'bg-[#E8FF00] text-black shadow-[#E8FF00]/10'
                              }`}
                            >
                              <span>
                                {paymentMethod === 'gpay' 
                                  ? '📲 Tap to Pay via Google Pay app' 
                                  : paymentMethod === 'paytm' 
                                  ? '📲 Tap to Pay via Paytm app' 
                                  : '📲 Tap to Pay via Mobile App'}
                              </span>
                            </a>
                            <p className="text-[9px] text-white/40 mt-1.5 uppercase font-mono tracking-wider">
                              For Mobile Users: Tap to launch your payment app instantly to pay ₹{finalTotal.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* App Indicators mimicking the uploaded image branding */}
                          <div className="space-y-2.5 pt-1 border-t border-white/5">
                            <div className="flex items-center justify-center space-x-3 text-[10px] font-mono text-white/55 font-bold">
                              <span>BHIM</span>
                              <span className="h-2 w-[1px] bg-white/20"></span>
                              <span>UPI</span>
                              <span className="h-2 w-[1px] bg-white/20"></span>
                              <span>ALL APP PAYMENTS</span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-white/60">
                              <div className="bg-neutral-900/60 border border-white/5 rounded-lg py-2 flex flex-col items-center justify-center space-y-1">
                                <span className="text-[11px] font-bold text-white/80">PhonePe</span>
                                <span className="text-[7px] uppercase font-mono text-white/30">Verified</span>
                              </div>
                              <div className="bg-neutral-900/60 border border-white/5 rounded-lg py-2 flex flex-col items-center justify-center space-y-1">
                                <span className="text-[11px] font-bold text-white/80">Google Pay</span>
                                <span className="text-[7px] uppercase font-mono text-white/30">Verified</span>
                              </div>
                              <div className="bg-neutral-900/60 border border-white/5 rounded-lg py-2 flex flex-col items-center justify-center space-y-1">
                                <span className="text-[11px] font-bold text-white/80">Paytm</span>
                                <span className="text-[7px] uppercase font-mono text-white/30">Verified</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-1.5">
                            <label className="block text-[8px] font-mono uppercase text-white/40 tracking-widest mb-1 text-left">UPI Transaction ID (UTR No.)</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter 12-digit UPI reference ID"
                              pattern="[0-9]{12}"
                              value={upiTxnId}
                              onChange={(e) => setUpiTxnId(e.target.value)}
                              className="w-full px-3 py-2 border border-white/10 bg-black/60 rounded-lg text-xs font-mono tracking-wider text-white placeholder:text-white/20 focus:border-[#E8FF00] focus:outline-none focus:ring-1 focus:ring-[#E8FF00]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 space-y-3">
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#E8FF00] text-black hover:scale-[1.02] rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-[#E8FF00]/10 cursor-pointer"
                      >
                        Submit Website Order
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="w-full py-2 text-[10px] text-white/40 hover:text-white uppercase tracking-wider text-center cursor-pointer font-bold"
                      >
                        Back to Cart
                      </button>
                    </div>
                  </form>

                ) : (
                  /* BUILD CART LIST */
                  <div className="space-y-6 text-left">
                    {savedBuilds.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono uppercase text-white/40 block tracking-widest font-black">Cycle Fleet Selected</span>
                        <div className="space-y-4 divide-y divide-white/5">
                          {savedBuilds.map((build, index) => {
                            const baseBike = bikes.find((b) => b.id === build.baseBikeId)!;
                            if (!baseBike) return null;
                            
                            // Calculate price for this config
                            let price = baseBike.price;
                            const isStandardColor = baseBike.colors.some(c => c.hex === build.selectedColor.hex);
                            if (!isStandardColor) price += 12000;

                            return (
                              <div key={index} className="pt-4 first:pt-0 flex items-start space-x-4">
                                <BikeImage
                                  src={baseBike.image}
                                  alt={baseBike.name}
                                  className="w-16 h-16 object-cover rounded-xl border border-white/10 flex-shrink-0 bg-white"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-display font-black text-sm text-white uppercase truncate">
                                    {baseBike.name}
                                  </h5>
                                  <p className="text-[10px] text-[#E8FF00] font-bold font-mono tracking-wider uppercase">
                                    Paint: {build.selectedColor.name}
                                  </p>
                                  
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <span className="bg-white/5 border border-white/5 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase text-white/50 tracking-wider">
                                      {baseBike.category} fleet
                                    </span>
                                    <span className="bg-[#E8FF00]/10 text-[#E8FF00] px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider">
                                      Standard setup
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right flex flex-col justify-between items-end h-16">
                                  <button
                                    onClick={() => handleRemoveBuild(index)}
                                    className="text-white/40 hover:text-red-400 p-1 rounded-full cursor-pointer hover:bg-white/5 transition-all"
                                    title="Delete Build"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <span className="font-mono text-xs font-bold text-[#E8FF00]">
                                    ₹{price.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Special Free Gift Highlight */}
                        <div className="pt-4 border-t border-white/5 space-y-3">
                          <span className="text-[9px] font-mono uppercase text-[#E8FF00] block tracking-widest font-black mb-1">
                            🎁 FREE PROMO GIFT ADDED
                          </span>
                          <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/15 rounded-xl p-3 flex items-start space-x-3.5">
                            <img
                              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=150"
                              alt="Classic 'HAT' Retro Bell"
                              className="w-12 h-12 object-cover rounded-lg border border-[#E8FF00]/20 flex-shrink-0 bg-white"
                            />
                            <div className="flex-1 min-w-0 text-left">
                              <h5 className="font-display font-black text-[11px] text-white uppercase truncate flex items-center gap-1.5">
                                Classic Metal 'HAT' Retro Bell
                                <span className="bg-[#E8FF00] text-black px-1.5 py-0.5 rounded text-[7px] font-mono font-black uppercase tracking-wider scale-90">
                                  FREE
                                </span>
                              </h5>
                              <p className="text-[9.5px] text-white/50 font-mono mt-0.5">
                                Qty: {savedBuilds.length} ({savedBuilds.length} x Cycle Order bonus)
                              </p>
                              <p className="text-[10px] text-[#E8FF00] font-bold font-mono mt-1 flex items-center gap-1.5">
                                ₹0 <span className="line-through text-white/30 font-light text-[9px]">₹250</span>
                              </p>
                            </div>
                          </div>

                          {/* Free Cable Lock if qualifying (24T, 26T, 27T, 29T) */}
                          {(() => {
                            const qCount = savedBuilds.filter(build => {
                              const bike = bikes.find(b => b.id === build.baseBikeId);
                              return bike ? isQualifyingBike(bike) : false;
                            }).length;
                            if (qCount > 0) {
                              return (
                                <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/15 rounded-xl p-3 flex items-start space-x-3.5 mt-2">
                                  <img
                                    src="https://images.unsplash.com/photo-1583228752356-59147f5fc7c0?auto=format&fit=crop&q=80&w=150"
                                    alt="Premium Heavy-Duty Security Cable Lock"
                                    className="w-12 h-12 object-cover rounded-lg border border-[#E8FF00]/20 flex-shrink-0 bg-white"
                                  />
                                  <div className="flex-1 min-w-0 text-left">
                                    <h5 className="font-display font-black text-[11px] text-white uppercase truncate flex items-center gap-1.5">
                                      Premium Heavy-Duty Cable Lock
                                      <span className="bg-[#E8FF00] text-black px-1.5 py-0.5 rounded text-[7px] font-mono font-black uppercase tracking-wider scale-90">
                                        FREE
                                      </span>
                                    </h5>
                                    <p className="text-[9.5px] text-white/50 font-mono mt-0.5">
                                      Qty: {qCount} ({qCount} x Qualifying Cycle Order [24T, 26T, 27T, 29T])
                                    </p>
                                    <p className="text-[10px] text-[#E8FF00] font-bold font-mono mt-1 flex items-center gap-1.5">
                                      ₹0 <span className="line-through text-white/30 font-light text-[9px]">₹450</span>
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>

                      </div>
                    )}

                    {cartAccessories.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono uppercase text-white/40 block tracking-widest font-black pt-4 border-t border-white/5">Essential Gear & Add-ons</span>
                        <div className="space-y-4 divide-y divide-white/5">
                          {cartAccessories.map((item) => {
                            const accItem = accessories.find((a) => a.id === item.accessoryId);
                            if (!accItem) return null;
                            const totalAccPrice = accItem.price * item.quantity;
                            return (
                              <div key={item.accessoryId} className="pt-4 first:pt-0 flex items-start space-x-4">
                                <img
                                  src={accItem.image}
                                  alt={accItem.name}
                                  className="w-16 h-16 object-cover rounded-xl border border-white/10 flex-shrink-0 bg-white"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                  <h5 className="font-display font-black text-xs text-white uppercase truncate">
                                    {accItem.name}
                                  </h5>
                                  <p className="text-[9px] text-white/40 uppercase font-mono tracking-widest">
                                    {accItem.category}
                                  </p>
                                  <p className="text-[10px] text-[#E8FF00] font-mono font-bold mt-1">
                                    {item.quantity} × ₹{accItem.price.toLocaleString('en-IN')}
                                  </p>
                                </div>
                                <div className="text-right flex flex-col justify-between items-end h-16">
                                  <button
                                    onClick={() => handleRemoveAccessoryFromCart(item.accessoryId)}
                                    className="text-white/40 hover:text-red-400 p-1 rounded-full cursor-pointer hover:bg-white/5 transition-all"
                                    title="Remove One"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <span className="font-mono text-xs font-bold text-[#E8FF00]">
                                    ₹{totalAccPrice.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Footer Summary (Sticky at bottom) */}
              {(savedBuilds.length > 0 || cartAccessories.length > 0) && !purchaseReceipt && (
                <div className="border-t border-white/10 p-5 bg-black">
                  {showCheckout ? (
                    <div className="space-y-2 mb-4 text-[10px] font-mono uppercase tracking-widest text-white/60">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          {deliveryMethod === 'pickup' 
                            ? 'Store Pickup' 
                            : deliveryState === 'out_of_state' 
                              ? 'Delivery Fee (Outside Gujarat)' 
                              : `Delivery Fee (${deliveryDistance} KM)`}
                        </span>
                        <span className="font-bold text-[#E8FF00]">
                          {deliveryMethod === 'pickup' 
                            ? 'FREE' 
                            : deliveryFee === 0 
                              ? 'FREE (PROMO)' 
                              : `₹${deliveryFee.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-black uppercase text-white pt-2 border-t border-white/5">
                        <span>Total Order Price</span>
                        <span className="font-mono text-[#E8FF00] text-lg sm:text-xl">
                          ₹{finalTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-bold">Total Order Price</span>
                        <span className="font-mono font-black text-[#E8FF00] text-lg sm:text-xl">
                          ₹{cartTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[8.5px] font-mono text-[#E8FF00]/90 uppercase tracking-wider text-left">
                        🎁 FREE Home Delivery up to 20 KM from showroom!
                      </p>
                    </div>
                  )}

                  {!showCheckout ? (
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full flex items-center justify-center space-x-2 bg-[#E8FF00] hover:scale-[1.02] text-black p-4 rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-[#E8FF00]/10 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Order Checkout</span>
                    </button>
                  ) : null}

                  <div className="mt-3 text-center">
                    <span className="text-[8px] font-mono tracking-wider text-white/30 uppercase">
                      Official website order dispatch for Ahmedabad, Gujarat.
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER CARD --- */}
      <footer className="bg-black text-white py-20 border-t border-white/10 selection:bg-[#E8FF00] selection:text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <span className="font-display font-black text-2xl text-white tracking-tighter uppercase">CHAMUNDA <span className="text-[#E8FF00] font-black">CYCLE SALES</span></span>
              <div className="text-[10px] font-mono tracking-wider uppercase text-[#E8FF00] font-bold mt-2">
                SINCE 1998 • RIDE BEYOND LIMITS
              </div>
              <p className="text-xs text-white/50 mt-3 max-w-xs font-light leading-relaxed">
                Premium high-performance speed machines in Ahmedabad, Gujarat. Configured for peak aerodynamic layups and ultimate road efficiency.
              </p>
            </div>
            <div>
              <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40">Flagship Showroom</span>
              <p className="text-xs text-white/70 mt-3 font-light leading-relaxed">
                Shop No-29, 30 Shikar avenue, near Priya palace, Nana Chiloda, Ahmedabad, Gujarat 382330
              </p>
              <p className="text-xs text-[#E8FF00] font-mono mt-2 text-[10px]">Phone: 095508 08808</p>
              <p className="text-xs text-white/40 font-mono mt-0.5 text-[9px]">⭐ 4.2 Rating (15 Google Reviews)</p>
            </div>
            <div>
              <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40">Showroom Hours</span>
              <p className="text-xs text-white/70 mt-3 font-light">Monday – Sunday: 10:00 AM – 09:00 PM</p>
              <p className="text-xs text-[#E8FF00] font-mono mt-1 text-[10px]">Open · Closes 9:00 PM</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/30 font-mono uppercase tracking-wider">
            <span>© 2026 Chamunda Cycle Sales. All rights reserved.</span>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Compliance Specs</a>
              <a href="#" className="hover:text-white transition-colors">Layout Schematics</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
