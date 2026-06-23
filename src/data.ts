/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Package, Testimonial, TeamMember } from './types';

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Apex Chrono Pro Smartwatch",
    price: 1499,
    description: "Premium health tracker smartwatch with dynamic heart-rate monitor, multi-sport activity tracking, and crystal-clear high-definition AMOLED screen.",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    category: "Accessories"
  },
  {
    id: "prod-2",
    name: "Alkaline Hydration Pot",
    price: 999,
    description: "Eco-friendly advanced alkaline ionizer pot. Naturally increases water pH up to 9.5, filters micro-impurities, and adds healthy minerals.",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",
    category: "Wellness"
  },
  {
    id: "prod-3",
    name: "Classic Oxford Crew Shirt",
    price: 499,
    description: "Ultra-comfy, 100% premium breathable cotton casual shirt. Tailored fit perfect for both executive formal meetings and relaxed weekends.",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    category: "Apparel"
  },
  {
    id: "prod-4",
    name: "Urban Stretch Lounge Pants",
    price: 699,
    description: "Tough yet highly flexible executive stretch trousers. Crafted with heat-wicking performance fiber for all-day comfort.",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80",
    category: "Apparel"
  },
  {
    id: "prod-5",
    name: "Vantage Horizon Polarized Goggles",
    price: 399,
    description: "Sleek and robust UV-400 polarized shades with lightweight metal frames. Blocks glare and guarantees crystal-clear vision under direct sunlight.",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    category: "Accessories"
  }
];

export const PACKAGES: Package[] = [
  {
    id: "pkg-bronze",
    name: "Bronze",
    price: 500,
    benefits: [
      "A pair of premium Cotton Shirt",
      "A pair of durable Stretch Pants",
      "10% Direct Referral Bonus eligibility",
      "Standard binary leg entry"
    ],
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80",
    description: "Kickstart your network marketing journey with premium apparel at cost-effective value."
  },
  {
    id: "pkg-silver",
    name: "Silver",
    price: 1000,
    benefits: [
      "High pH Mineralizing Alkaline Pot",
      "15% Direct Referral Bonus eligibility",
      "10% Binary Matching Team Bonus eligibility",
      "Apex community access & training materials"
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",
    description: "Unlock exceptional wellness with our alkaline water filtration device and superior network rewards."
  },
  {
    id: "pkg-gold",
    name: "Gold",
    price: 2000,
    benefits: [
      "Apex Chrono Pro AMOLED Smartwatch",
      "High pH Mineralizing Alkaline Pot",
      "22% Direct Referral Bonus eligibility",
      "15% Binary Matching Team Bonus eligibility",
      "VIP downline status & leadership pool payouts"
    ],
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80"
    ],
    description: "The ultimate power package, offering dual premium lifestyle and health products alongside maximal career incentives."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Suresh Sharma",
    rating: 5,
    role: "Gold Member (Joined 6 months ago)",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    reviewText: "ApexConnect changed my view on passive income! I started with the Silver package and upgraded to Gold. The Alkaline hydration pot is incredible for health, and my monthly binary matching has exceeded ₹40,000 already. Very simple and transparent referral model.",
    date: "2026-04-12"
  },
  {
    id: "t-2",
    name: "Priya Patel",
    rating: 5,
    role: "Gold Leader (Joined 1 year ago)",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    reviewText: "The products are actually outstanding—not just placeholder products! The smartwatch tracks all my fitness metrics, and the shirt is extremely comfortable. Recruiting active legs has been smooth thanks to the awesome training resources.",
    date: "2026-05-30"
  },
  {
    id: "t-3",
    name: "Amit Kumar",
    rating: 4.8,
    role: "Bronze Member (Joined 2 months ago)",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    reviewText: "I joined with the Bronze Package which is only ₹500 and got a classic shirt and pant. Amazing quality for just ₹500! I have already referred three friends and earned my investment back double. Fast delivery to Bhadohi rural areas.",
    date: "2026-06-15"
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "APEX-1001",
    name: "Daksh Kumar",
    role: "Crown President",
    parentId: null,
    leftLegId: "APEX-1002",
    rightLegId: "APEX-1003",
    status: "Active",
    sponsorId: null,
    sponsorName: "Direct Corporate",
    joinDate: "2025-01-10",
    earnings: {
      total: 185400,
      withdrawn: 160000,
      directReferral: 35000,
      binaryMatching: 95000,
      teamBonus: 55400
    },
    packagePurchased: "Gold",
    teamStrength: {
      left: 148,
      right: 122,
      active: 215
    },
    workHours: [
      { day: "Mon", hours: 6 },
      { day: "Tue", hours: 7.5 },
      { day: "Wed", hours: 8 },
      { day: "Thu", hours: 5.5 },
      { day: "Fri", hours: 6.5 },
      { day: "Sat", hours: 4 },
      { day: "Sun", hours: 2 }
    ],
    email: "daksh@apex.com",
    password: "apex123"
  },
  {
    id: "APEX-1002",
    name: "Amit Sharma",
    role: "Platinum Director",
    parentId: "APEX-1001",
    leftLegId: "APEX-1004",
    rightLegId: "APEX-1005",
    status: "Active",
    sponsorId: "APEX-1001",
    sponsorName: "Daksh Kumar",
    joinDate: "2025-03-22",
    earnings: {
      total: 78200,
      withdrawn: 65000,
      directReferral: 18000,
      binaryMatching: 42000,
      teamBonus: 18200
    },
    packagePurchased: "Gold",
    teamStrength: {
      left: 74,
      right: 73,
      active: 110
    },
    workHours: [
      { day: "Mon", hours: 5 },
      { day: "Tue", hours: 6 },
      { day: "Wed", hours: 7 },
      { day: "Thu", hours: 8 },
      { day: "Fri", hours: 5 },
      { day: "Sat", hours: 3 },
      { day: "Sun", hours: 0 }
    ],
    email: "amit@apex.com",
    password: "apex123"
  },
  {
    id: "APEX-1003",
    name: "Priya Verma",
    role: "Ruby executive",
    parentId: "APEX-1001",
    leftLegId: "APEX-1006",
    rightLegId: "APEX-1007",
    status: "Active",
    sponsorId: "APEX-1001",
    sponsorName: "Daksh Kumar",
    joinDate: "2025-04-05",
    earnings: {
      total: 56900,
      withdrawn: 48000,
      directReferral: 14000,
      binaryMatching: 28000,
      teamBonus: 14900
    },
    packagePurchased: "Silver",
    teamStrength: {
      left: 60,
      right: 61,
      active: 98
    },
    workHours: [
      { day: "Mon", hours: 4 },
      { day: "Tue", hours: 5 },
      { day: "Wed", hours: 6.5 },
      { day: "Thu", hours: 7 },
      { day: "Fri", hours: 6 },
      { day: "Sat", hours: 2 },
      { day: "Sun", hours: 1 }
    ],
    email: "priya@apex.com",
    password: "apex123"
  },
  {
    id: "APEX-1004",
    name: "Rohit Sen",
    role: "Gold Manager",
    parentId: "APEX-1002",
    leftLegId: null,
    rightLegId: null,
    status: "Active",
    sponsorId: "APEX-1002",
    sponsorName: "Amit Sharma",
    joinDate: "2025-05-12",
    earnings: {
      total: 24500,
      withdrawn: 18000,
      directReferral: 8500,
      binaryMatching: 12000,
      teamBonus: 4000
    },
    packagePurchased: "Bronze",
    teamStrength: {
      left: 12,
      right: 18,
      active: 22
    },
    workHours: [
      { day: "Mon", hours: 3 },
      { day: "Tue", hours: 4 },
      { day: "Wed", hours: 5 },
      { day: "Thu", hours: 4 },
      { day: "Fri", hours: 4 },
      { day: "Sat", hours: 0 },
      { day: "Sun", hours: 0 }
    ]
  },
  {
    id: "APEX-1005",
    name: "Sneha Patel",
    role: "Sapphire Executive",
    parentId: "APEX-1002",
    leftLegId: null,
    rightLegId: null,
    status: "Active",
    sponsorId: "APEX-1002",
    sponsorName: "Amit Sharma",
    joinDate: "2025-05-18",
    earnings: {
      total: 31200,
      withdrawn: 24000,
      directReferral: 10000,
      binaryMatching: 15000,
      teamBonus: 6200
    },
    packagePurchased: "Gold",
    teamStrength: {
      left: 22,
      right: 21,
      active: 35
    },
    workHours: [
      { day: "Mon", hours: 6 },
      { day: "Tue", hours: 5.5 },
      { day: "Wed", hours: 6 },
      { day: "Thu", hours: 6.5 },
      { day: "Fri", hours: 7 },
      { day: "Sat", hours: 2 },
      { day: "Sun", hours: 0 }
    ]
  },
  {
    id: "APEX-1006",
    name: "Vikas Dubey",
    role: "Silver Associate",
    parentId: "APEX-1003",
    leftLegId: null,
    rightLegId: null,
    status: "Active",
    sponsorId: "APEX-1003",
    sponsorName: "Priya Verma",
    joinDate: "2025-06-01",
    earnings: {
      total: 12800,
      withdrawn: 8000,
      directReferral: 4500,
      binaryMatching: 6000,
      teamBonus: 2300
    },
    packagePurchased: "Silver",
    teamStrength: {
      left: 8,
      right: 6,
      active: 10
    },
    workHours: [
      { day: "Mon", hours: 2 },
      { day: "Tue", hours: 3 },
      { day: "Wed", hours: 4 },
      { day: "Thu", hours: 3 },
      { day: "Fri", hours: 3 },
      { day: "Sat", hours: 1 },
      { day: "Sun", hours: 0 }
    ]
  },
  {
    id: "APEX-1007",
    name: "Neha Gupta",
    role: "Associate Partner",
    parentId: "APEX-1003",
    leftLegId: null,
    rightLegId: null,
    status: "Active",
    sponsorId: "APEX-1003",
    sponsorName: "Priya Verma",
    joinDate: "2025-06-05",
    earnings: {
      total: 9400,
      withdrawn: 5000,
      directReferral: 3000,
      binaryMatching: 5000,
      teamBonus: 1400
    },
    packagePurchased: "Gold",
    teamStrength: {
      left: 4,
      right: 5,
      active: 8
    },
    workHours: [
      { day: "Mon", hours: 4 },
      { day: "Tue", hours: 4 },
      { day: "Wed", hours: 5 },
      { day: "Thu", hours: 3 },
      { day: "Fri", hours: 4 },
      { day: "Sat", hours: 0 },
      { day: "Sun", hours: 0 }
    ]
  }
];
