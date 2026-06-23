/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, MapPin, Phone, ArrowUpRight, Award, Flame, UserCheck } from 'lucide-react';
import { Package } from '../types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  packages: Package[];
  onSelectPackage: (pkgId: string) => void;
  onJoinClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  packages,
  onSelectPackage,
  onJoinClick
}) => {
  return (
    <div className="space-y-16">
      {/* Visual Ambient Banner Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl p-6 md:p-12 lg:p-16">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl -z-10"></div>

        <div className="max-w-4xl space-y-6 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-amber-500 uppercase tracking-widest text-[9px] font-bold font-mono">Government Approved direct selling and network agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-amber-100 to-amber-500 bg-clip-text text-transparent"
          >
            Empower Your Future.<br />
            Earn Passive Wealth.
          </motion.h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
            Welcome to <span className="font-extrabold text-white">ApexConnect Marketing</span>, your premier destination for exceptional health-enhancing ionizers, state-of-the-art smartwatch trackers, and urban leisure apparel. Join our active binary legs to unlock referral commissions, direct incentives, and compound team matches!
          </p>

          {/* Quick Info contacts drawer banner requested on Home section */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs font-mono text-slate-400">
            <div className="flex items-start gap-2.5 bg-[#161618] p-3 rounded-2xl border border-white/5">
              <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="leading-relaxed text-left">
                <span className="block font-bold text-slate-200">Agency Center Address</span>
                Mukundpatti, Khamaria, Bhadohi, UP, First Floor, 221306, India
              </p>
            </div>

            <div className="flex items-start gap-2.5 bg-[#161618] p-3 rounded-2xl border border-white/5">
              <Phone className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="leading-relaxed text-left">
                <span className="block font-bold text-slate-200">Customer Helpline Support</span>
                +91 90269 38545<br />
                +91 92361 24695
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onJoinClick}
              className="px-6 py-3.5 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer active:scale-95 shadow-lg shadow-amber-500/10"
            >
              Start Earning - Join Now
            </button>
            <a
              href="#joining-packages"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Explore Packages</span>
              <ArrowUpRight className="w-4 h-4 text-amber-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Product Packages Section requested in item 4 */}
      <section id="joining-packages" className="space-y-8 scroll-mt-20 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Affordably Packaged Career Plans
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Choose one of our premium joining kits packed with retail goods of greater worth. Immediate active placement on either left or right downline legs upon purchase authorization.
            </p>
          </div>

          <div className="bg-[#161618] px-3.5 py-1.5 rounded-full border border-white/5 flex items-center gap-2 text-slate-400 text-[10px] font-mono">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Popular choice: Gold Package with highest referral payout percentage</span>
          </div>
        </div>

        {/* Package Grid representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => {
            const isGold = pkg.name === 'Gold';
            const isSilver = pkg.name === 'Silver';

            let cardStyleClass = "";
            if (pkg.name.toLowerCase() === 'bronze' || idx === 0) {
              cardStyleClass = "bg-gradient-to-br from-amber-950/20 to-black border-amber-900/40";
            } else if (pkg.name.toLowerCase() === 'silver' || idx === 1) {
              cardStyleClass = "bg-gradient-to-br from-gray-700/20 to-black border-gray-400/40";
            } else {
              cardStyleClass = "bg-gradient-to-br from-amber-500/20 to-black border-amber-500/60 ring-1 ring-amber-500/50 ring-offset-2 ring-offset-black";
            }

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden flex flex-col justify-between ${cardStyleClass}`}
              >
                {/* Popular label for Gold */}
                {isGold && (
                  <span className="absolute top-4 right-4 z-10 bg-amber-500 text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-0.5 shadow-md">
                    <Sparkles className="w-3 h-3 fill-black text-black" />
                    BEST VALUE
                  </span>
                )}

                {/* Cover Image representing materials */}
                <div className="relative h-44 overflow-hidden bg-black/40">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  {/* Floating price indicator */}
                  <div className="absolute bottom-4 left-4 bg-black/80 px-2.5 py-1.5 rounded-xl border border-white/5 backdrop-blur-md">
                    <span className="text-[9px] text-amber-500 font-extrabold block font-mono uppercase">Joining Price</span>
                    <span className="text-xl font-extrabold text-white font-mono">₹{pkg.price}</span>
                  </div>
                </div>

                {/* Card description */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="text-left space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">{pkg.name} Package</h3>
                      <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>
                    </div>

                    {/* Gifts inclusion specifications requested */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider font-mono">Products you get:</span>
                      <ul className="space-y-1.5 text-xs uppercase tracking-wider text-[10px] font-semibold opacity-80">
                        {pkg.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Trigger CTA */}
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-2 rounded text-[10px] font-black uppercase mt-4 cursor-pointer text-center flex items-center justify-center gap-1.5 border transition-all ${
                      isGold
                        ? 'bg-amber-500 text-black border-transparent hover:bg-amber-400 font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Choose {pkg.name} & Register</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
