/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Mail, Phone, CheckCircle, Sparkles, AlertCircle, Send, Check } from 'lucide-react';
import { BIKE_STORES } from '../data';
import { Bike, InquiryDetails } from '../types';

interface InquiryFormProps {
  bikes: Bike[];
  preselectedBikeId: string | null;
}

export default function InquiryForm({ bikes, preselectedBikeId }: InquiryFormProps) {
  const [bikeId, setBikeId] = useState<string>('general');
  const [inquiryType, setInquiryType] = useState<string>('purchase');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState('email');
  const [message, setMessage] = useState('');
  
  const [error, setError] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryDetails | null>(null);

  // Sync state if preselectedBikeId changes
  useEffect(() => {
    if (preselectedBikeId) {
      setBikeId(preselectedBikeId);
      setInquiryType('purchase'); // default to purchase inquiry when a bike is clicked
    }
  }, [preselectedBikeId]);

  const selectedBike = bikes.find((b) => b.id === bikeId);

  // Handle Submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid contact email.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a contact phone number.');
      return;
    }
    if (!message.trim()) {
      setError('Please write your inquiry details or question.');
      return;
    }

    const inquiry: InquiryDetails = {
      bikeId,
      inquiryType,
      fullName,
      email,
      phone,
      preferredContact,
      message
    };

    setSubmittedInquiry(inquiry);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setBikeId('general');
    setInquiryType('purchase');
  };

  const inquiryTypeLabels: Record<string, string> = {
    purchase: 'Purchase Request',
    custom_build: 'Custom Build Questions',
    sizing: 'Sizing & Ergonomics Help',
    dealership: 'Dealership & Bulk B2B',
    support: 'After-Sales Support',
    other: 'General Inquiry'
  };

  return (
    <section id="inquiry" className="py-20 sm:py-28 bg-[#0F0F0F] scroll-mt-20 selection:bg-[#E8FF00] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-[#E8FF00] mb-3">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Chamunda Sales Desk</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            Product Inquiry & Callback
          </h2>
          <p className="mt-4 text-white/50 text-sm sm:text-base leading-relaxed font-light">
            Ask details about our high-performance fleet, customized layups, pricing, or parts availability. Fill out our official desk inquiry and get dedicated advisory response within 24 hours.
          </p>
        </div>

        {submittedInquiry ? (
          /* --- INQUIRY TICKET VIEW --- */
          <div className="max-w-xl mx-auto bg-[#141414] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
            {/* Top decorative design */}
            <div className="bg-[#E8FF00] px-6 py-6 text-center relative text-black">
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/10 px-2.5 py-1 rounded-full border border-black/10">
                <Sparkles className="w-3 h-3 text-black" />
                <span className="text-[10px] font-mono uppercase font-black tracking-wider">Registered</span>
              </div>
              <h3 className="font-display text-xl font-black tracking-tight uppercase">INQUIRY RECEIPT</h3>
              <p className="text-black/60 text-xs mt-1 uppercase font-bold tracking-wider">Our experts will contact you shortly</p>
            </div>

            {/* Ticket body */}
            <div className="p-6 sm:p-8 space-y-6 text-left">
              
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-5">
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase block tracking-wider">Contact Person</span>
                  <span className="text-sm font-bold text-white uppercase">{submittedInquiry.fullName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase block tracking-wider">Inquiry Ref</span>
                  <span className="text-sm font-bold text-[#E8FF00] font-mono">#INQ-2026-{(Math.random() * 9000 + 1000).toFixed(0)}</span>
                </div>
              </div>

              {/* Inquiry Type & Specimen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-b border-white/5 pb-5">
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase block tracking-wider">Inquiry Nature</span>
                  <span className="text-xs font-bold text-white uppercase block mt-1">
                    {inquiryTypeLabels[submittedInquiry.inquiryType] || submittedInquiry.inquiryType}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase block tracking-wider">Target Model</span>
                  <span className="text-xs font-black text-[#E8FF00] uppercase block mt-1">
                    {selectedBike ? selectedBike.name : 'General Catalog / Multiple'}
                  </span>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="border-b border-white/5 pb-5">
                <span className="text-[9px] font-mono text-white/40 uppercase block tracking-wider">Preferred Contact Way</span>
                <span className="text-xs font-semibold text-white uppercase block mt-1">
                  {submittedInquiry.preferredContact === 'whatsapp' ? '🟢 WhatsApp Message' : 
                   submittedInquiry.preferredContact === 'phone' ? '📞 Direct Telephone Call' : '✉️ Email Advisory Response'}
                </span>
                <p className="text-[10px] text-white/50 mt-1.5 font-light">
                  We will reach out to <strong className="text-white">{submittedInquiry.preferredContact === 'email' ? submittedInquiry.email : submittedInquiry.phone}</strong> based on your preference.
                </p>
              </div>

              {/* Inquiry message summary */}
              <div className="bg-black/45 border border-white/5 p-4 rounded-xl text-xs text-white/60 space-y-2 font-light">
                <span className="font-bold text-white block uppercase tracking-wider text-[10px]">Your Message Details:</span>
                <p className="italic leading-relaxed">"{submittedInquiry.message}"</p>
              </div>

              <div className="bg-[#E8FF00]/5 border border-[#E8FF00]/10 p-4 rounded-xl text-[11px] text-[#E8FF00] space-y-1 font-semibold uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Success: Submitted to Ahmedabad Hub</span>
                </div>
              </div>

              {/* Reset / New inquiry */}
              <button
                onClick={handleResetForm}
                className="w-full py-3.5 border border-white/10 hover:border-[#E8FF00] hover:text-[#E8FF00] text-white/70 rounded-full text-xs font-black transition-all uppercase font-mono tracking-widest cursor-pointer"
              >
                Send Another Inquiry
              </button>

            </div>
          </div>
        ) : (
          /* --- INQUIRY SUBMISSION FORM --- */
          <div className="max-w-4xl mx-auto bg-[#141414] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleInquirySubmit} className="space-y-6 sm:space-y-8 text-left">
              
              {/* Error messages */}
              {error && (
                <div className="flex items-center space-x-2 bg-red-950/40 text-red-400 border border-red-900/50 p-4 rounded-xl text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1: Inquiry Type & Target Bike Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-2.5">
                    Nature of Inquiry
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-widest font-black text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] cursor-pointer"
                  >
                    <option value="purchase">Purchase Consultation</option>
                    <option value="custom_build">Custom Build Options</option>
                    <option value="sizing">Biomechanical Sizing Help</option>
                    <option value="dealership">Dealership / Corporate Bulk</option>
                    <option value="support">After-Sales Technical Support</option>
                    <option value="other">General Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-2.5">
                    Target Cycle Model / Specimen
                  </label>
                  <select
                    value={bikeId}
                    onChange={(e) => setBikeId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-widest font-black text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] cursor-pointer"
                  >
                    <option value="general">None - General / Store inquiry</option>
                    {bikes.map((bike) => (
                      <option key={bike.id} value={bike.id}>
                        {bike.name} ({bike.category.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  {selectedBike && (
                    <span className="block text-[9px] text-[#E8FF00] font-mono uppercase mt-2 tracking-wider">
                      Selected: ₹{selectedBike.price.toLocaleString('en-IN')} MSRP • {selectedBike.specs.weight} Spec
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Customer Contact Information */}
              <div className="pt-6 border-t border-white/5">
                <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-3">
                  Your Contact Identity
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div className="relative text-white">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Full Legal Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-widest font-semibold placeholder:text-white/30 text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative text-white">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
                    <input
                      type="email"
                      placeholder="Contact Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-widest font-semibold placeholder:text-white/30 text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative text-white">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
                    <input
                      type="tel"
                      placeholder="Contact Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-widest font-semibold placeholder:text-white/30 text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Preferred Contact Way */}
              <div className="pt-6 border-t border-white/5">
                <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-3">
                  Preferred Channel of Response
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'email', label: 'Email Advisory' },
                    { id: 'phone', label: 'Telephone Call' },
                    { id: 'whatsapp', label: 'WhatsApp Chat' }
                  ].map((method) => {
                    const isSelected = preferredContact === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPreferredContact(method.id)}
                        className={`py-3 text-[10px] font-mono font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E8FF00] border-[#E8FF00] text-black font-bold shadow-lg shadow-[#E8FF00]/10'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                        }`}
                      >
                        {method.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Inquiry Details Textarea */}
              <div className="pt-6 border-t border-white/5">
                <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-2.5">
                  Write Your Inquiry Details / Questions *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about customized handlebars, custom decals, financing schemes, or schedule an physical hub walkthrough session..."
                  className="w-full p-4 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs uppercase tracking-wider font-semibold placeholder:text-white/30 text-white focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all resize-none"
                />
              </div>

              {/* Submit Row */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[9px] font-mono tracking-wider text-white/40 leading-relaxed max-w-md text-center sm:text-left uppercase">
                  By submitting, you authorize CHAMUNDA CYCLE SALES to process these coordinates so a regional manager can contact you. No obligation or fees required.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#E8FF00] text-black hover:scale-105 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-[#E8FF00]/10 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Desk Inquiry</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
