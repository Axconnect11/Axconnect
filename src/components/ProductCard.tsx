/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingCart, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-[#161618] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/10 transition-all flex flex-col group h-full"
    >
      {/* Product Image Holder */}
      <div className="relative aspect-square overflow-hidden bg-black/40">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-black/95 text-amber-500 font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-xs flex items-center gap-1">
          <Tag className="w-3 h-3 text-amber-500" />
          {product.category}
        </span>

        {/* Rating overlay */}
        <div className="absolute bottom-4 right-4 bg-black/95 border border-white/10 px-2 py-1 rounded-xl flex items-center gap-1 backdrop-blur-xs shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
          <span className="text-white text-[10px] font-bold font-mono">{product.rating}</span>
        </div>
      </div>

      {/* Description Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white group-hover:text-amber-500 transition-colors tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price Tag & Shopping trigger actions */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">MRP Price</span>
            <span className="text-lg font-extrabold text-white font-mono flex items-center gap-0.5">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg shadow-amber-500/10 focus:outline-none"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
