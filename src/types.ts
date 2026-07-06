/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BikeCategory = 'road' | 'gravel' | 'mountain' | 'urban';

export interface BikeSpecs {
  frame: string;
  fork: string;
  groupset: string;
  brakes: string;
  wheels: string;
  weight: string; // e.g. "7.4 kg"
  motor?: string; // Optional for urban/e-bikes
  battery?: string; // Optional for urban/e-bikes
  range?: string; // Optional for urban/e-bikes
}

export interface ColorOption {
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
}

export interface Bike {
  id: string;
  name: string;
  category: BikeCategory;
  tagline: string;
  description: string;
  price: number;
  baseWeight: number; // in grams for calculations
  rating: number;
  reviewCount: number;
  image: string;
  specs: BikeSpecs;
  tags: string[];
  colors: ColorOption[];
}

export interface CustomizerState {
  baseBikeId: string;
  selectedColor: ColorOption;
  handlebar: 'drop' | 'flat' | 'integrated';
  tireWidth: number; // in mm
  saddle: 'carbon' | 'gel' | 'comfort';
  addMudguards: boolean;
  addRack: boolean;
  addBottleCages: boolean;
  addKickstand: boolean;
}

export interface SizingInput {
  heightCm: number;
  inseamCm: number;
  ridingStyle: 'race' | 'endurance' | 'trail' | 'commute';
}

export interface SizingResult {
  frameSize: string;
  frameSizingLabel: string; // e.g. "54cm (Medium)"
  saddleHeightCm: string;
  reachMm: number;
  stackMm: number;
  description: string;
}

export interface InquiryDetails {
  bikeId: string;
  inquiryType: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  message: string;
}

export type AccessoryCategory = 'safety' | 'utility' | 'comfort' | 'gear';

export interface Accessory {
  id: string;
  name: string;
  category: AccessoryCategory;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
}

