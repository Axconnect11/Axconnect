/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Heart, Sparkles, Building2, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSuggestPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSuggestPage }) => {
  return (
    <footer className="bg-[#0A0A0A] text-slate-400 border-t border-white/10 mt-auto pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* About Company Widget */}
        <div className="md:col-span-1 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">APEXCONNECT</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Leading the revolution in modern health technologies and premium urban lifestyle fashion since 2025. Our hybrid binary referral model elevates financial independence and healthy community living.
          </p>
          <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Corporate CIN: U221306UP2025PTC50011</span>
          </div>
        </div>

        {/* Quick Links Widget */}
        <div className="space-y-4 text-left">
          <h3 className="font-bold text-sm uppercase tracking-wider text-white">Career & Platform</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                onClick={() => onSuggestPage('home')}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <span>Benefits & Packages</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSuggestPage('products')}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <span>Products Catalog</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSuggestPage('join')}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <span>Join Downline Legs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSuggestPage('employee')}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <span>Active Member Portal</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSuggestPage('team')}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <span>Downline Leg Tree</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Address and Reach us Widget */}
        <div className="space-y-4 md:col-span-2 text-left">
          <h3 className="font-bold text-sm uppercase tracking-wider text-white">Registered Regional Office</h3>
          <div className="space-y-3.5 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="block font-semibold text-white">First Floor, Agency Store</span>
                Mukundpatti, Khamaria, Bhadohi,<br />
                Uttar Pradesh, ZIP: 221306, India
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+919026938545" className="hover:text-amber-500 transition-colors font-semibold">
                  +91 90269 38545
                </a>
                <a href="tel:+919236124695" className="hover:text-amber-500 transition-colors font-semibold text-slate-400">
                  +91 92361 24695
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <a href="mailto:support@apexconnect.in" className="hover:text-amber-500 transition-colors">
                support@apexconnect.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Legal & Protection */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()} APEXCONNECT Marketing Private Limited. All rights reserved. Made for Daksh Kumar.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ISO 9001:2015 & WHO GMP Certified Agency
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500" /> in Uttar Pradesh
          </span>
        </div>
      </div>
    </footer>
  );
};
