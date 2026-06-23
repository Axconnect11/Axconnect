/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
  category: 'Apparel' | 'Wellness' | 'Accessories';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Package {
  id: string;
  name: 'Bronze' | 'Silver' | 'Gold';
  price: number;
  benefits: string[];
  imageUrl: string;
  imageUrls?: string[]; // Gold has smartwatch and alkalizer pot
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  parentId: string | null;
  leftLegId: string | null;
  rightLegId: string | null;
  status: 'Active' | 'Inactive';
  sponsorId: string | null;
  sponsorName: string;
  joinDate: string;
  earnings: {
    total: number;
    withdrawn: number;
    directReferral: number;
    binaryMatching: number;
    teamBonus: number;
  };
  packagePurchased: 'Bronze' | 'Silver' | 'Gold' | 'None';
  teamStrength: {
    left: number;
    right: number;
    active: number;
  };
  workHours: {
    day: string;
    hours: number;
  }[];
  email?: string;
  password?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  role: string;
  avatarUrl: string;
  reviewText: string;
  date: string;
}

export interface RegistrationData {
  email: string;
  phone: string;
  dob: string;
  gender: string;
  selectedPackageId: string;
  otpCode: string;
}
