/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShoppingCart, UserCheck, Users, Briefcase, Home, Shield, Sparkles, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamMember } from '../types';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  openCart: () => void;
  loggedInEmployee: TeamMember | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  cartCount,
  openCart,
  loggedInEmployee,
  onLogout,
  onLoginClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products & Shop', icon: ShoppingCart },
    { id: 'join', label: 'Join Apex', icon: UserCheck },
    { id: 'employee', label: 'Employee Dashboard', icon: Briefcase },
    { id: 'team', label: 'Team & Legs', icon: Users },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#111111]/90 backdrop-blur-md border-b border-white/10 text-white shadow-xl px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 shadow-lg shadow-amber-500/15">
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
            </div>
            <div>
              <span className="font-semibold text-xl tracking-tight text-white hover:text-amber-500 transition-colors">
                APEXCONNECT
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-amber-500 font-mono font-semibold">
                Direct Selling & Wellness
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  id={`nav-desk-${item.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white/5 ${
                    isActive
                      ? 'text-amber-500 bg-white/5 border border-white/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-500' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Logged in User Indicator & Action */}
            {loggedInEmployee ? (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[9px] font-extrabold text-amber-500 font-mono">
                  {loggedInEmployee.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-left leading-tight shrink-0">
                  <span className="block text-[10px] font-bold text-white max-w-[80px] truncate">
                    {loggedInEmployee.name}
                  </span>
                  <span className="block text-[8px] font-mono text-gray-400">
                    {loggedInEmployee.id}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Log out of session"
                  id="header-logout-btn"
                  className="ml-2 p-1 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                id="header-login-btn"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 hover:bg-amber-500/5 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 font-bold" />
                Sign In
              </button>
            )}

            {/* Shopping Cart button */}
            <button
              onClick={openCart}
              id="header-cart-btn"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/10 focus:outline-none"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick action join */}
            <button
              onClick={() => setActivePage('join')}
              id="header-join-btn"
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-500 text-black shadow hover:bg-amber-400 cursor-pointer active:scale-95 transition-all text-center"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Join Legs
            </button>

            {/* Hamburger / menu toggler */}
            <button
              onClick={() => setIsOpen(true)}
              id="header-hamburger-menu"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 cursor-pointer hover:text-white transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-[#111111] border-l border-white/10 text-white shadow-2xl flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold text-lg text-white">
                    Navigation Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  id="drawer-close"
                  className="p-1 px-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      id={`drawer-nav-${item.id}`}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                        isActive
                          ? 'bg-white/5 text-amber-500 border-l-4 border-amber-500 shadow-sm font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-gray-400'}`} />
                      <span className="text-sm uppercase tracking-wider text-xs">{item.label}</span>
                    </button>
                  );
                })}

                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                  {loggedInEmployee ? (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-extrabold text-amber-500 font-mono">
                          {loggedInEmployee.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left leading-tight">
                          <span className="block text-xs font-bold text-white">
                            {loggedInEmployee.name}
                          </span>
                          <span className="block text-[10px] font-mono text-gray-500">
                            {loggedInEmployee.id} • {loggedInEmployee.role}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onLogout();
                        }}
                        className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onLoginClick();
                      }}
                      className="w-full py-2.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Sign In to Account
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Corporate Footer Info */}
              <div className="mt-auto pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-col gap-2">
                <div className="flex gap-1.5 items-center">
                  <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold text-white">Authorized Agency Store</span>
                </div>
                <p className="leading-relaxed text-gray-400">
                  Mukundpatti, Khamaria, Bhadohi,<br />
                  First Floor, 221306, UP, India
                </p>
                <div className="mt-2 text-[10px] text-gray-500">
                  © 2026 ApexConnect. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
