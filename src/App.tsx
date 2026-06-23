/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Award,
  Users,
  Briefcase,
  Star,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  ArrowLeft,
  Mail,
  UserCheck,
  Smartphone,
  Check,
  Building2,
  DollarSign,
  Heart,
  Plus,
  ChevronRight,
  RefreshCw,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom files importation
import { PRODUCTS, PACKAGES, TESTIMONIALS, INITIAL_TEAM_MEMBERS } from './data';
import { Product, CartItem, TeamMember, Package } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { InteractiveTree } from './components/InteractiveTree';
import { WorkHoursChart } from './components/WorkHoursChart';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [withdrawalTx, setWithdrawalTx] = useState<{ id: string; amount: number } | null>(null);

  // Members storage (local state acts as database)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [loggedInEmployeeId, setLoggedInEmployeeId] = useState<string | null>('APEX-1001');
  const [activeEmployeeId, setActiveEmployeeId] = useState<string>('APEX-1001');

  // Login form status
  const [loginForm, setLoginForm] = useState({
    usernameOrId: '',
    password: ''
  });
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string>('');

  const loggedInEmployee = useMemo(() => {
    return teamMembers.find((m) => m.id === loggedInEmployeeId) || null;
  }, [teamMembers, loggedInEmployeeId]);

  const handleLogout = () => {
    setLoggedInEmployeeId(null);
    setLoginSuccessMessage('');
    setActivePage('home');
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoginSuccessMessage('');

    const input = loginForm.usernameOrId.trim();
    const pass = loginForm.password.trim();

    if (!input || !pass) {
      setLoginError('Please enter both your member ID/Email and password.');
      return;
    }

    // Try to match by ID (APEX-1001) or email (daksh@apex.com)
    const matched = teamMembers.find(
      (m) =>
        (m.id.toLowerCase() === input.toLowerCase() ||
         m.email?.toLowerCase() === input.toLowerCase()) &&
        m.password === pass
    );

    if (matched) {
      setLoggedInEmployeeId(matched.id);
      setActiveEmployeeId(matched.id);
      setLoginForm({ usernameOrId: '', password: '' });
      setLoginSuccessMessage(`Welcome back, ${matched.name}!`);
      
      // Auto-hide success alert and transition to dashboard after 1.5s
      setTimeout(() => {
        setLoginSuccessMessage('');
        setActivePage('employee');
      }, 1500);
    } else {
      setLoginError('Invalid Member ID or Email with password combination. Please try again.');
    }
  };

  // Multi-step Registration states
  const [regStep, setRegStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    dob: '',
    gender: 'Male',
    selectedPkgId: 'pkg-gold',
    enteredOtp: '',
    placementLeg: 'Left' as 'Left' | 'Right'
  });

  // OTP simulated alerts
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [showOtpAlert, setShowOtpAlert] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [regError, setRegError] = useState<string>('');
  const [isSavingUser, setIsSavingUser] = useState<boolean>(false);
  const [newlyCreatedMember, setNewlyCreatedMember] = useState<TeamMember | null>(null);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.product.id === product.id);
      if (existing) {
        return prevCart.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Open cart so they see the add
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((it) => (it.product.id === id ? { ...it, quantity: qty } : it))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((it) => it.product.id !== id));
  };

  const handleClearCart = () => setCart([]);

  // Pre-select package from home CTA cards
  const handleSelectPackageFromHome = (pkgId: string) => {
    setFormData((prev) => ({ ...prev, selectedPkgId: pkgId }));
    setActivePage('join');
    setRegStep(4); // jump straight to package checkout
  };

  // OTP Simulated generator triggers
  const handleRequestOtp = () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      setRegError('Please provide a valid Indian 10-digit mobile number first.');
      return;
    }
    setRegError('');
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setShowOtpAlert(true);
    // Auto-dismiss alert after 10 secs
    setTimeout(() => {
      setShowOtpAlert(false);
    }, 12000);
  };

  const handleVerifyOtp = () => {
    if (formData.enteredOtp === generatedOtp && generatedOtp !== '') {
      setIsOtpVerified(true);
      setRegError('');
      // Continue to next package selection step
      setRegStep(4);
    } else {
      setRegError('The OTP authorization code entered is incorrect. Resend and retry.');
    }
  };

  // Registration finalize
  const handleJoinSubmitPayment = () => {
    setIsSavingUser(true);
    setRegError('');

    setTimeout(() => {
      const newId = `APEX-${Math.floor(1001 + Math.random() * 8999)}`;
      const selectedPkg = PACKAGES.find((p) => p.id === formData.selectedPkgId) || PACKAGES[0];

      // Assign parent relative node
      // We will mount them under Priya Verma or Amit Sharma dynamically based on chosen leg
      const parentNode = formData.placementLeg === 'Left' ? 'APEX-1002' : 'APEX-1003';
      const parentName = formData.placementLeg === 'Left' ? 'Amit Sharma' : 'Priya Verma';

      const newMember: TeamMember = {
        id: newId,
        name: formData.email.split('@')[0].toUpperCase(),
        role: "Associate Executive",
        parentId: parentNode,
        leftLegId: null,
        rightLegId: null,
        status: "Active",
        sponsorId: 'APEX-1001',
        sponsorName: "Daksh Kumar",
        joinDate: new Date().toISOString().split('T')[0],
        earnings: {
          total: selectedPkg.price * 0.1, // immediate cashback
          withdrawn: 0,
          directReferral: selectedPkg.price * 0.1,
          binaryMatching: 0,
          teamBonus: 0,
        },
        packagePurchased: selectedPkg.name,
        teamStrength: {
          left: 0,
          right: 0,
          active: 1,
        },
        workHours: [
          { day: "Mon", hours: 0 },
          { day: "Tue", hours: 2 },
          { day: "Wed", hours: 3 },
          { day: "Thu", hours: 1 },
          { day: "Fri", hours: 4 },
          { day: "Sat", hours: 0 },
          { day: "Sun", hours: 0 },
        ],
        email: formData.email,
        password: formData.password
      };

      // Mutate members stack
      setTeamMembers((prev) => {
        // Appends to the parent's leg
        return prev.map((member) => {
          if (member.id === parentNode) {
            return {
              ...member,
              leftLegId: formData.placementLeg === 'Left' ? newId : member.leftLegId,
              rightLegId: formData.placementLeg === 'Right' ? newId : member.rightLegId,
            };
          }
          return member;
        }).concat(newMember);
      });

      setNewlyCreatedMember(newMember);
      setLoggedInEmployeeId(newId); // auto-log in the new member!
      setActiveEmployeeId(newId); // auto-select new member profile
      setIsSavingUser(false);
      setRegStep(6); // Success screen
    }, 2000);
  };

  // Resolve dynamic metrics for active selected employee profile
  const selectedEmployee = useMemo(() => {
    return teamMembers.find((m) => m.id === activeEmployeeId) || teamMembers[0];
  }, [teamMembers, activeEmployeeId]);

  return (
    <div className="bg-[#0e0e10] min-h-screen text-slate-100 font-sans flex flex-col antialiased">
      {/* Header component */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        loggedInEmployee={loggedInEmployee}
        onLogout={handleLogout}
        onLoginClick={() => setActivePage('login')}
      />

      {/* Persistent global simulated Mobile SMS Toast alert */}
      <AnimatePresence>
        {showOtpAlert && (
          <motion.div
            initial={{ opacity: 0, y: -60, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -60, x: '-50%' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-4 shadow-2xl flex gap-3.5 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-indigo-400">SMS GATEWAY ALERT</span>
                  <span className="text-[9px] font-semibold text-slate-500">Just now</span>
                </div>
                <h4 className="text-xs font-extrabold text-white mt-1">Verification OTP Received</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Use verification code <span className="font-extrabold text-white text-sm bg-indigo-500/20 px-2 py-0.5 rounded font-mono">{generatedOtp}</span> to authorize your Apex joining application.
                </p>
                <div className="mt-2 text-[9px] text-slate-500 italic">
                  *This simulates real sms arrival inside active browser sandboxes.
                </div>
              </div>
              <button
                onClick={() => setShowOtpAlert(false)}
                className="text-slate-500 hover:text-white cursor-pointer px-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container routes */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
        {activePage === 'home' && (
          <div className="space-y-16">
            {/* Banner block */}
            <HeroSection
              packages={PACKAGES}
              onSelectPackage={handleSelectPackageFromHome}
              onJoinClick={() => setActivePage('join')}
            />

            {/* About us / Company Description Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left bg-[#161618] p-8 rounded-3xl border border-white/5 shadow-xl">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-mono uppercase tracking-widest font-extrabold">Who we are</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  Redefining passive affiliate earnings of the future.
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Established in Mukundpatti, Khamaria, Bhadohi, ApexConnect has grown into a titan of smart consumer appliances and high pH wellness systems. Under our visionary directive, direct sales partners earn robust compensations through direct sponsorships, binary pairing matching incentives, and deep-downline performance pool rewards.
                </p>
                <div className="flex items-center gap-3 bg-black/40 p-4 rounded-2xl border border-[#1b1b1e]">
                  <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-white">Full Consumer Quality Certification</span>
                    <span className="block text-[11px] text-slate-500">All consumer electronics and wellness goods carry ISI and standard labels.</span>
                  </div>
                </div>
              </div>

              {/* Decorative side panel with stats */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/40 flex items-center justify-center p-6 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-500/10"></div>
                <div className="grid grid-cols-2 gap-6 w-full text-center relative z-10">
                  <div className="p-4 bg-[#161618] rounded-2xl border border-white/5">
                    <span className="block text-xl font-extrabold text-amber-500 font-mono">15,000+</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Active Partners</span>
                  </div>
                  <div className="p-4 bg-[#161618] rounded-2xl border border-white/5">
                    <span className="block text-xl font-extrabold text-amber-500 font-mono">₹4.8 Cr+</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Commissions Paid</span>
                  </div>
                  <div className="p-4 bg-[#161618] rounded-2xl border border-white/5">
                    <span className="block text-xl font-extrabold text-amber-500 font-mono">100%</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Genuine Products</span>
                  </div>
                  <div className="p-4 bg-[#161618] rounded-2xl border border-white/5">
                    <span className="block text-xl font-extrabold text-amber-500 font-mono">Bhadohi</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">First Floor Store</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Reviews block */}
            <section className="space-y-8 text-left">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-widest font-mono">Success Stories</span>
                <h2 className="text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  What active partners are sharing
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-[#161618] p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-5 shadow-inner"
                  >
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;{testimonial.reviewText}&quot;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/20"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-extrabold text-white">{testimonial.name}</h4>
                        <span className="block text-[10px] text-amber-500 font-medium">{testimonial.role}</span>
                        <span className="block text-[9px] text-slate-500 font-mono mt-0.5">{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* E-commerce grid shop listing products */}
        {activePage === 'products' && (
          <div className="space-y-8 text-left">
            <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-semibold uppercase tracking-wider font-mono">Store Catalog</span>
                <h2 className="text-xl font-bold text-white">Purchase Lifestyle & Health Products</h2>
                <p className="text-slate-400 text-xs">Buy items directly at corporate prices. Earn direct incentives when shared with references.</p>
              </div>

              {/* Shopping Cart button trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 border border-transparent text-xs text-black rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Checkout Cart Details</span>
                <span className="px-1.5 py-0.5 bg-black/20 text-black rounded text-[9px] font-mono leading-none">{cart.reduce((a, c) => a + c.quantity, 0)}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}

        {/* Joining / Affiliate registration page */}
        {activePage === 'join' && (
          <div className="max-w-2xl mx-auto space-y-8 text-left">
            {/* Header section widget inside wizard */}
            <div className="bg-[#161618] p-6 rounded-2xl border border-white/5 text-center space-y-2">
              <UserCheck className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
              <h2 className="text-xl font-bold text-white">Affiliate Registration Node</h2>
              <p className="text-slate-400 text-xs max-w-sm mx-auto text-center">Complete standard authentication, verify mobile coordinates, choose package to join the binary team legs.</p>
            </div>

            {/* Form Step Indicators */}
            <div className="flex items-center justify-between bg-black/40 p-2 border border-white/5 rounded-xl font-mono text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
              <span className={`px-2 py-1 rounded ${regStep >= 1 ? 'bg-amber-500/10 text-amber-500' : ''}`}>1. Info</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`px-2 py-1 rounded ${regStep >= 2 ? 'bg-amber-500/10 text-amber-500' : ''}`}>2. Mobile</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`px-2 py-1 rounded ${regStep >= 3 ? 'bg-amber-500/10 text-amber-500' : ''}`}>3. OTP</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`px-2 py-1 rounded ${regStep >= 4 ? 'bg-amber-500/10 text-amber-500' : ''}`}>4. Plan</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`px-2 py-1 rounded ${regStep >= 5 ? 'bg-amber-500/10 text-amber-500' : ''}`}>5. Pay</span>
            </div>

            {/* Error logs */}
            {regError && (
              <div className="bg-rose-500/10 border border-rose-500/25 p-4 rounded-xl flex items-center gap-3 text-rose-400 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            {/* Wizard Forms body */}
            <div className="bg-[#161618] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* Step 1: Gmail Account Credentials */}
                {regStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Step 1: Credentials Setup</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Gmail address</label>
                        <input
                          type="email"
                          required
                          placeholder="daksh.kumar@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!formData.email || !formData.password) {
                          setRegError('Please provide both a valid email and password.');
                          return;
                        }
                        setRegError('');
                        setRegStep(2);
                      }}
                      className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Continue registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Demographics parameters */}
                {regStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Step 2: Partner Parameters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Mobile Number</label>
                        <input
                          type="number"
                          required
                          placeholder="9026938545"
                          value={formData.mobile}
                          onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Date of Birth</label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Gender Selection</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                          className="w-full bg-slate-950 text-slate-300 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Join Under Leg Placement</label>
                        <select
                          value={formData.placementLeg}
                          onChange={(e) => setFormData((prev) => ({ ...prev, placementLeg: e.target.value as 'Left' | 'Right' }))}
                          className="w-full bg-slate-950 text-slate-300 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Left">Left Downline Leg (Amit Sharma branch)</option>
                          <option value="Right">Right Downline Leg (Priya Verma branch)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-6">
                      <button
                        onClick={() => setRegStep(1)}
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (!formData.mobile || !formData.dob) {
                            setRegError('All parameters are required to generate OTP authorization.');
                            return;
                          }
                          setRegError('');
                          handleRequestOtp();
                          setRegStep(3);
                        }}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                      >
                        Request Account OTP Codes
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: SMS Verification OTP */}
                {regStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Step 3: Verification Check</h3>
                    <p className="text-xs text-slate-400">
                      We simulated an SMS containing a 4-digit code to mobile number <span className="font-extrabold text-white"> {formData.mobile}</span>. Enter code underneath to verify.
                    </p>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-1.5">Enter Authorization Code</label>
                      <input
                        type="text"
                        placeholder="••••"
                        maxLength={4}
                        value={formData.enteredOtp}
                        onChange={(e) => setFormData((prev) => ({ ...prev, enteredOtp: e.target.value }))}
                        className="w-full text-center bg-slate-950 font-mono letter-spacing-widest text-lg text-white border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 font-mono">
                      <span>Refreshes code after 2 mins</span>
                      <button onClick={handleRequestOtp} className="text-indigo-400 hover:underline cursor-pointer">
                        Resend Code
                      </button>
                    </div>

                    <div className="flex gap-2.5 mt-6">
                      <button
                        onClick={() => setRegStep(2)}
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleVerifyOtp}
                        className="flex-grow py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                      >
                        Authorize & Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Package selection options */}
                {regStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Step 4: Select Franchise Package</h3>
                    <div className="space-y-3">
                      {PACKAGES.map((pkg) => {
                        const isSel = formData.selectedPkgId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setFormData((prev) => ({ ...prev, selectedPkgId: pkg.id }))}
                            className={`p-4 rounded-2xl border cursor-pointer text-left flex items-start justify-between transition-all ${
                              isSel
                                ? 'bg-indigo-500/10 border-indigo-500 shadow-md'
                                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <span className="block text-xs font-extrabold text-white capitalize">{pkg.name} Tier</span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">{pkg.description}</span>
                              <span className="block text-[9px] text-indigo-400 mt-2 font-semibold">Includes: {pkg.benefits.slice(0, 2).join(', ')}...</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-xs font-mono font-extrabold text-white">₹{pkg.price}</span>
                              <span className="inline-block w-4 h-4 rounded-full border border-slate-800 flex items-center justify-center mt-2">
                                {isSel && <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2.5 mt-6">
                      <button
                        onClick={() => setRegStep(3)}
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setRegStep(5)}
                        className="flex-grow py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                      >
                        Choose & Proceed to checkout
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Options for Indian Payment */}
                {regStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Step 5: Process Franchise Payout</h3>

                    {/* Show selected bundle summary */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-left flex justify-between items-center text-xs">
                      <div>
                        <span className="block font-bold text-slate-300">
                          Apex {PACKAGES.find((p) => p.id === formData.selectedPkgId)?.name} Package Code
                        </span>
                        <span className="block text-[10px] text-slate-500">Placement downline: {formData.placementLeg} Leg</span>
                      </div>
                      <span className="font-mono font-extrabold text-indigo-400 text-sm">
                        ₹{PACKAGES.find((p) => p.id === formData.selectedPkgId)?.price}
                      </span>
                    </div>

                    {/* India UPI Apps simulated checkout list (requested UPI, GPay, Phonepay) */}
                    <div className="space-y-2 text-left">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 font-mono tracking-wider mb-2">Configure Mobile UPI Gateway</label>

                      {/* GPay selector */}
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, enteredOtp: 'gpay' }))}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs ${
                          formData.enteredOtp === 'gpay'
                            ? 'bg-indigo-500/10 border-indigo-500'
                            : 'bg-slate-950/40 border-slate-800'
                        }`}
                      >
                        <span>Google Pay (GPay Instant Transfer)</span>
                        <span className="text-[10px] font-bold text-indigo-400 font-mono">UPI API</span>
                      </button>

                      {/* PhonePe selector */}
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, enteredOtp: 'phonepe' }))}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs ${
                          formData.enteredOtp === 'phonepe'
                            ? 'bg-indigo-500/10 border-indigo-500'
                            : 'bg-slate-950/40 border-slate-800'
                        }`}
                      >
                        <span>PhonePe (UPI Wallet)</span>
                        <span className="text-[10px] font-bold text-indigo-400 font-mono">BHIM API</span>
                      </button>

                      {/* Generic UPI Pay */}
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, enteredOtp: 'other' }))}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs ${
                          formData.enteredOtp === 'other'
                            ? 'bg-indigo-500/10 border-indigo-500'
                            : 'bg-slate-950/40 border-slate-800'
                        }`}
                      >
                        <span>Standard Indian Netbanking Gateway</span>
                        <span className="text-[10px] font-bold text-indigo-400 font-mono">IMPS / NEFT</span>
                      </button>
                    </div>

                    <div className="flex gap-2.5 mt-6">
                      <button
                        onClick={() => setRegStep(4)}
                        disabled={isSavingUser}
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleJoinSubmitPayment}
                        disabled={isSavingUser}
                        className="flex-grow py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        {isSavingUser ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                            <span>Processing credentials...</span>
                          </>
                        ) : (
                          <span>Authorize payment & Join</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Final Success Welcome Banner */}
                {regStep === 6 && newlyCreatedMember && (
                  <motion.div
                    key="step-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-6"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-white">Welcome to ApexConnect Family</h3>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Your partnership is validated and placing you directly into the tree!
                      </p>
                    </div>

                    {/* Member ID Tag */}
                    <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4 max-w-xs mx-auto text-left font-mono text-xs">
                      <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-500">
                        <span>Affiliate Partner</span>
                        <span className="font-bold text-white uppercase">{newlyCreatedMember.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-500">
                        <span>Corporate ID</span>
                        <span className="font-bold text-indigo-400 uppercase font-mono">{newlyCreatedMember.id}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-500">
                        <span>Level rank</span>
                        <span className="text-slate-200 capitalize">{newlyCreatedMember.role}</span>
                      </div>
                      <div className="flex justify-between text-slate-200 font-bold border-t border-slate-900 pt-2 text-sm">
                        <span>Cashback payout</span>
                        <span className="text-emerald-400">₹{newlyCreatedMember.earnings.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Reset forms & trigger Dashboard page on active new node
                        setRegStep(1);
                        setFormData({
                          email: '',
                          password: '',
                          mobile: '',
                          dob: '',
                          gender: 'Male',
                          selectedPkgId: 'pkg-gold',
                          enteredOtp: '',
                          placementLeg: 'Left'
                        });
                        setIsOtpVerified(false);
                        setActivePage('employee');
                      }}
                      className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer text-center"
                    >
                      Enter Employee Dashboard portal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Auth Interception / Sleek Login View */}
        {(activePage === 'login' || ((activePage === 'employee' || activePage === 'team') && loggedInEmployeeId === null)) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-[#161618] border border-white/10 rounded-3xl p-8 shadow-2xl text-left my-8"
          >
            {/* Header / Brand */}
            <div className="text-center space-y-3 mb-8">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Partner Portal</h2>
                <p className="text-xs text-slate-400 mt-1">
                  {activePage === 'login' 
                    ? 'Log in to your authorized partner workspace.' 
                    : `Please sign in to view your dynamic ${activePage === 'employee' ? 'Earnings Dashboard' : 'Downline Team structure'}.`
                  }
                </p>
              </div>
            </div>

            {/* Error notifications */}
            {loginError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-snug">{loginError}</p>
              </div>
            )}

            {/* Success notifications */}
            {loginSuccessMessage && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-snug">{loginSuccessMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1.5 font-mono">
                  Member ID or Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. APEX-1001 or daksh@apex.com"
                  value={loginForm.usernameOrId}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, usernameOrId: e.target.value }))}
                  className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1.5 font-mono">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                id="portal-login-submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-450 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
              >
                <span>Access Partner Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider separator */}
            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#161618] px-3 text-slate-500 font-extrabold tracking-widest font-mono">Demo Accounts Quick Access</span>
              </div>
            </div>

            {/* Demo Login Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setLoginForm({ usernameOrId: 'APEX-1001', password: 'apex123' });
                  setLoginError('');
                  // Auto-submit
                  setTimeout(() => {
                    setLoggedInEmployeeId('APEX-1001');
                    setActiveEmployeeId('APEX-1001');
                    setLoginSuccessMessage('Welcome back, DAKSH KUMAR!');
                    setTimeout(() => {
                      setLoginSuccessMessage('');
                      const targetPage = (activePage === 'login' || activePage === 'join') ? 'employee' : activePage;
                      setActivePage(targetPage);
                    }, 1200);
                  }, 200);
                }}
                className="w-full p-3 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-amber-500/20 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-mono font-bold">
                    DK
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white group-hover:text-amber-500 transition-colors">Daksh Kumar <span className="text-[10px] font-medium text-slate-500 font-mono">(APEX-1001)</span></span>
                    <span className="block text-[9px] text-slate-400 font-mono">Crown President • daksh@apex.com</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginForm({ usernameOrId: 'APEX-1002', password: 'apex123' });
                  setLoginError('');
                  // Auto-submit
                  setTimeout(() => {
                    setLoggedInEmployeeId('APEX-1002');
                    setActiveEmployeeId('APEX-1002');
                    setLoginSuccessMessage('Welcome back, AMIT SHARMA!');
                    setTimeout(() => {
                      setLoginSuccessMessage('');
                      const targetPage = (activePage === 'login' || activePage === 'join') ? 'employee' : activePage;
                      setActivePage(targetPage);
                    }, 1200);
                  }, 200);
                }}
                className="w-full p-3 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-amber-500/20 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-slate-400/10 text-slate-400 flex items-center justify-center text-[10px] font-mono font-bold">
                    AS
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white group-hover:text-amber-500 transition-colors">Amit Sharma <span className="text-[10px] font-medium text-slate-500 font-mono">(APEX-1002)</span></span>
                    <span className="block text-[9px] text-slate-400 font-mono">Platinum Director • amit@apex.com</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginForm({ usernameOrId: 'APEX-1003', password: 'apex123' });
                  setLoginError('');
                  // Auto-submit
                  setTimeout(() => {
                    setLoggedInEmployeeId('APEX-1003');
                    setActiveEmployeeId('APEX-1003');
                    setLoginSuccessMessage('Welcome back, PRIYA VERMA!');
                    setTimeout(() => {
                      setLoginSuccessMessage('');
                      const targetPage = (activePage === 'login' || activePage === 'join') ? 'employee' : activePage;
                      setActivePage(targetPage);
                    }, 1200);
                  }, 200);
                }}
                className="w-full p-3 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-amber-500/20 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-slate-400/10 text-slate-400 flex items-center justify-center text-[10px] font-mono font-bold">
                    PV
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white group-hover:text-amber-500 transition-colors">Priya Verma <span className="text-[10px] font-medium text-slate-500 font-mono">(APEX-1003)</span></span>
                    <span className="block text-[9px] text-slate-400 font-mono">Ruby Executive • priya@apex.com</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>

            <p className="text-center mt-6 text-xs text-slate-500 leading-normal font-sans">
              Not registered as a partner yet?{' '}
              <button
                type="button"
                onClick={() => setActivePage('join')}
                className="text-amber-500 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                Join Apex Legs Tree
              </button>
            </p>
          </motion.div>
        )}

        {/* Employee Dashboard Portal Page */}
        {activePage === 'employee' && loggedInEmployeeId !== null && (
          <div className="space-y-8 text-left">
            {/* Dynamic Employee switcher control */}
            <div className="bg-[#161618] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider font-mono">Corporate Identity</span>
                <h2 className="text-xl font-bold text-white flex items-center gap-1.5 mt-1">
                  <Briefcase className="w-5 h-5 text-amber-500" />
                  Active Employee Dashboard
                </h2>
                <p className="text-slate-400 text-xs text-left">Verify work log metrics, team leg depth, and payouts in real-time.</p>
              </div>

              {/* Selector to choose or change active profile */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 font-mono">Selected profile:</span>
                {loggedInEmployeeId === 'APEX-1001' ? (
                  <select
                    value={activeEmployeeId}
                    onChange={(e) => {
                      setActiveEmployeeId(e.target.value);
                      setWithdrawalTx(null); // clear temporary withdrawal overlays
                    }}
                    className="bg-black/40 text-[#f59e0b] text-xs font-bold border border-white/10 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  >
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.id} - {member.role})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20 rounded-xl px-3.5 py-2 font-sans">
                    {selectedEmployee.name} ({selectedEmployee.id} - {selectedEmployee.role})
                  </div>
                )}
              </div>
            </div>

            {/* Top metrics grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Cumulative Earnings */}
              <div className="bg-[#161618] border border-white/5 rounded-2xl p-5 shadow-lg flex items-center gap-4">
                <div className="p-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono text-left">Total Earnings</span>
                  <span className="text-xl font-extrabold text-white font-mono block mt-0.5 text-left">
                    ₹{selectedEmployee.earnings.total.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-[#10b981] font-medium block text-left">Active passive payouts</span>
                </div>
              </div>

              {/* Card 2: Left leg network */}
              <div className="bg-[#161618] border border-white/5 rounded-2xl p-5 shadow-lg flex items-center gap-4">
                <div className="p-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono text-left">Left Leg members</span>
                  <span className="text-xl font-extrabold text-white font-mono block mt-0.5 text-left">
                    {selectedEmployee.teamStrength.left}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block text-left">Binary placement left</span>
                </div>
              </div>

              {/* Card 3: Right leg network */}
              <div className="bg-[#161618] border border-white/5 rounded-2xl p-5 shadow-lg flex items-center gap-4">
                <div className="p-3.5 bg-amber-500/5 text-amber-500/80 border border-amber-500/10 rounded-xl shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono text-left">Right Leg members</span>
                  <span className="text-xl font-extrabold text-white font-mono block mt-0.5 text-left">
                    {selectedEmployee.teamStrength.right}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block text-left">Binary placement right</span>
                </div>
              </div>

              {/* Card 4: Franchise level */}
              <div className="bg-[#161618] border border-white/5 rounded-2xl p-5 shadow-lg flex items-center gap-4">
                <div className="p-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl shrink-0">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block font-mono text-left">Referral Level</span>
                  <span className="text-sm font-extrabold text-white truncate block mt-1 tracking-tight text-left">
                    {selectedEmployee.role}
                  </span>
                  <span className="text-[9px] text-amber-500 font-semibold block uppercase tracking-wide text-left mt-0.5">{selectedEmployee.packagePurchased} tier</span>
                </div>
              </div>
            </div>

            {/* Earnings Breakdown + Work Hours Chart section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side: Work Hours Custom Chart */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-left">Weekly Work Logs</h3>
                <WorkHoursChart data={selectedEmployee.workHours} />
              </div>

              {/* Right Side: Detailed Payout balances */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-left">Earnings Matrix Payouts</h3>
                <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-medium font-mono">Direct Sponsorship Bonus (20%)</span>
                    <span className="text-sm font-extrabold text-white font-mono">₹{selectedEmployee.earnings.directReferral.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-medium font-mono">Binary Leg Pairing Match</span>
                    <span className="text-sm font-extrabold text-white font-mono">₹{selectedEmployee.earnings.binaryMatching.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-medium font-mono">Downline Leadership Pool Bonus</span>
                    <span className="text-sm font-extrabold text-white font-mono">₹{selectedEmployee.earnings.teamBonus.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 text-white font-bold text-md">
                    <span className="text-sm font-bold font-sans">Accumulated Liquid Balance</span>
                    <span className="text-lg text-amber-500 font-mono">₹{selectedEmployee.earnings.total.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Transfer to Bank option */}
                  <button
                    onClick={() => {
                      setWithdrawalTx({
                        id: selectedEmployee.id,
                        amount: selectedEmployee.earnings.total
                      });
                    }}
                    className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-xs font-semibold uppercase tracking-wider text-black rounded-xl cursor-pointer hover:shadow-lg transition-all text-center"
                  >
                    Initiate Direct Bank Account Withdrawal
                  </button>

                  {/* In-app secure notification instead of window.alert */}
                  <AnimatePresence>
                    {withdrawalTx?.id === selectedEmployee.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-2 text-left space-y-1.5">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            TRANSFERRED SUCCESSFULLY
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            A direct payout transfer of <strong className="text-white">₹{withdrawalTx.amount.toLocaleString()}</strong> has been dispatched securely to the primary bank account registered under ID <code className="text-amber-500 font-mono">{withdrawalTx.id}</code>.
                          </p>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Gateway: IMPS-APX // Authorization: OK_200
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Downline team tree and joins page */}
        {activePage === 'team' && loggedInEmployeeId !== null && (
          <InteractiveTree
            teamMembers={teamMembers}
            rootId={activeEmployeeId}
            onSelectRoot={setActiveEmployeeId}
            onJoinLeadClick={() => setActivePage('join')}
          />
        )}
      </main>

      {/* Cart side panel with overlays checkout */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Corporate bottom Footer details */}
      <Footer onSuggestPage={setActivePage} />
    </div>
  );
}
