/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Smartphone, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [selectedUPI, setSelectedUPI] = useState<'gpay' | 'phonepe' | 'paytm' | 'other' | null>(null);
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const cartTotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const shippingCharge = cartTotal > 1500 || cartTotal === 0 ? 0 : 99;
  const finalTotal = cartTotal + shippingCharge;

  const handleStartPayment = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('payment');
  };

  const handleSimulatePayment = () => {
    if (!selectedUPI) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      setTransactionId(`TXN-APX-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 2200);
  };

  const handleFinishCheckout = () => {
    onClearCart();
    setCheckoutStep('cart');
    setSelectedUPI(null);
    setUpiId('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-xs"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[450px] max-w-[95vw] bg-[#111111] border-l border-white/10 text-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/10">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-md font-bold text-white">
                    {checkoutStep === 'cart' && 'Your Shopping Cart'}
                    {checkoutStep === 'payment' && 'Select Secure Payment'}
                    {checkoutStep === 'success' && 'Transaction Finalized'}
                  </h2>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">
                    {checkoutStep === 'cart' && `${cartItems.length} categories`}
                    {checkoutStep === 'payment' && 'UPI Gateway Authorization'}
                    {checkoutStep === 'success' && 'Order Processed Successfully'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Step 1: Cart Listing */}
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/5 hover:border-white/10 shadow-sm"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#161618] shrink-0">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              ₹{item.product.price} each
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 rounded bg-white/5 text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 cursor-pointer text-xs border border-white/10"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white px-1.5">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 rounded bg-white/5 text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 cursor-pointer text-xs border border-white/10"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Delete Item action */}
                          <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-2">
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Promo Code entry simulation */}
                      <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mt-6 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4 text-amber-500" />
                          <div className="text-left">
                            <span className="block text-xs font-bold text-white">FREE-SHIPPING Offer</span>
                            <span className="block text-[10px] text-slate-500">Add ₹{(1500 - cartTotal > 0 ? 1500 - cartTotal : 0)} more for free delivery</span>
                          </div>
                        </div>
                        {cartTotal < 1500 && (
                          <span className="text-[10px] font-bold py-1 px-2.5 rounded bg-amber-500/10 text-amber-500 font-mono">
                            Auto-Applied
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-slate-800/40 border border-slate-800 flex items-center justify-center text-slate-600 mb-2">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="text-sm font-bold text-white">Your cart is currently empty</h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
                        Add items from our premium products catalog at direct selling rates to get started.
                      </p>
                      <button
                        onClick={onClose}
                        className="text-indigo-400 text-xs font-bold hover:underline cursor-pointer pt-2"
                      >
                        Browse all Products
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Payment Selector options */}
              {checkoutStep === 'payment' && (
                <div className="space-y-6 pt-2 text-left">
                  <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Payments are encrypted using standard 256-bit SSL tokenization. This is a secure checkout node mimicking direct Indian bank APIs.
                    </p>
                  </div>

                  {/* UPI Apps Grid */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider font-mono">UPI Applications</h3>

                    {/* Google Pay */}
                    <button
                      onClick={() => { setSelectedUPI('gpay'); setUpiId(`${userUpiPrefix()}@okaxis`); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedUPI === 'gpay'
                          ? 'bg-black/80 border-amber-500 shadow-md'
                          : 'bg-[#161618] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-extrabold text-sm font-mono border border-blue-500/10">
                          G
                        </div>
                        <div>
                          <span className="block text-xs font-extrabold text-white">Google Pay (GPay)</span>
                          <span className="block text-[10px] text-slate-500">Pay directly using GPay account authorization</span>
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedUPI === 'gpay' ? 'border-amber-500' : 'border-white/10'
                      }`}>
                        {selectedUPI === 'gpay' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                      </span>
                    </button>

                    {/* PhonePe */}
                    <button
                      onClick={() => { setSelectedUPI('phonepe'); setUpiId(`${userUpiPrefix()}@ybl`); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedUPI === 'phonepe'
                          ? 'bg-black/80 border-amber-500 shadow-md'
                          : 'bg-[#161618] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-extrabold text-sm font-mono border border-purple-500/10">
                          P
                        </div>
                        <div>
                          <span className="block text-xs font-extrabold text-white">PhonePe (UPI)</span>
                          <span className="block text-[10px] text-slate-500">Fast authentication via PhonePe app</span>
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedUPI === 'phonepe' ? 'border-amber-500' : 'border-white/10'
                      }`}>
                        {selectedUPI === 'phonepe' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                      </span>
                    </button>

                    {/* Paytm */}
                    <button
                      onClick={() => { setSelectedUPI('paytm'); setUpiId(`${userUpiPrefix()}@paytm`); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedUPI === 'paytm'
                          ? 'bg-black/80 border-amber-500 shadow-md'
                          : 'bg-[#161618] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-extrabold text-sm font-mono border border-sky-500/10">
                          Py
                        </div>
                        <div>
                          <span className="block text-xs font-extrabold text-white">Paytm Wallet & UPI</span>
                          <span className="block text-[10px] text-slate-500">Convenient transaction using mobile balance</span>
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedUPI === 'paytm' ? 'border-amber-500' : 'border-white/10'
                      }`}>
                        {selectedUPI === 'paytm' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                      </span>
                    </button>
                  </div>

                  {/* Manual UPI ID typing input */}
                  {selectedUPI && (
                    <div className="bg-black/80 p-4 rounded-2xl border border-white/10 space-y-2 text-left">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider font-mono">Verify UPI ID address</label>
                      <input
                        type="email"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Success Confirmation */}
              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-5">
                  <div className="relative">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                    <div className="absolute -inset-1 rounded-full bg-emerald-500 animate-ping opacity-15"></div>
                  </div>

                  <div>
                    <h3 className="text-md font-bold text-white">Payment Authorized</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Your payment of <span className="font-bold text-white">₹{finalTotal.toLocaleString('en-IN')}</span> was processed successfully. The items will be shipped to your default Bhadohi address.
                    </p>
                  </div>

                  {/* Receipt Frame */}
                  <div className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl space-y-3 font-mono text-xs text-left">
                    <div className="f-row flex justify-between border-b border-white/5 pb-2 text-slate-400">
                      <span>Invoice To</span>
                      <span className="font-bold text-white">Apex Member Daksh</span>
                    </div>

                    <div className="f-row flex justify-between border-b border-white/5 pb-2 text-slate-400">
                      <span>Transaction ID</span>
                      <span className="text-amber-500 font-bold">{transactionId}</span>
                    </div>

                    <div className="f-row flex justify-between border-b border-white/5 pb-2 text-slate-400">
                      <span>Gateway Mode</span>
                      <span className="text-slate-200 capitalize font-bold">UPI ({selectedUPI})</span>
                    </div>

                    <div className="f-row flex justify-between pt-2 text-slate-200 font-bold text-sm">
                      <span>Paid Total</span>
                      <span className="text-amber-500">₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Action with Checkout details */}
            {checkoutStep !== 'success' && cartItems.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0A0A0A]/90 shrink-0 space-y-4">
                <div className="space-y-1.5 font-mono text-xs text-left">
                  <div className="flex justify-between text-slate-400">
                    <span>Items Total ({cartItems.reduce((a, c) => a + c.quantity, 0)})</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Charges</span>
                    {shippingCharge === 0 ? (
                      <span className="text-amber-500 font-bold">FREE Delivery</span>
                    ) : (
                      <span>₹{shippingCharge}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/15">
                    <span>Final Amount</span>
                    <span className="text-amber-500">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Confirm CTAs */}
                {checkoutStep === 'cart' ? (
                  <button
                    onClick={handleStartPayment}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer select-none"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      disabled={isProcessing}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wider text-[10px] border border-white/10 cursor-pointer disabled:opacity-50"
                    >
                      Back to Cart
                    </button>
                    <button
                      onClick={handleSimulatePayment}
                      disabled={!selectedUPI || isProcessing}
                      className="flex-2 py-3 bg-amber-500 hover:bg-amber-400 text-black disabled:bg-white/5 disabled:text-slate-500 rounded-xl font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg disabled:shadow-none"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 border-t-white animate-spin shrink-0"></span>
                          <span>Securing...</span>
                        </>
                      ) : (
                        <span>Verify & Pay {`₹${finalTotal.toLocaleString('en-IN')}`}</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* If checkout is finalized, dismiss receipt */}
            {checkoutStep === 'success' && (
              <div className="p-5 border-t border-white/10 bg-[#0A0A0A]/80 shrink-0">
                <button
                  onClick={handleFinishCheckout}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer shadow-lg text-center"
                >
                  Confirm & Return to Shop
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Helper utility to pre-fill unique UPI user code handles
  function userUpiPrefix() {
    return "apex90269";
  }
};
