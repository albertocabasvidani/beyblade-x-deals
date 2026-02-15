'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatEur } from '@/lib/format';
import { useCart } from './cart-provider';

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export function CartItemRow({ product, quantity }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const subtotal = (product.price_jp_eur || 0) * quantity;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <Link href={`/products/${product.slug}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill sizes="64px" className="object-contain p-1" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`} className="text-sm font-medium hover:text-brand line-clamp-1">
          {product.name}
        </Link>
        <p className="text-xs text-slate-500">{formatEur(product.price_jp_eur)} ciascuno</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          +
        </button>
      </div>

      <div className="w-20 text-right">
        <p className="text-sm font-bold">{formatEur(subtotal)}</p>
      </div>

      <button
        onClick={() => removeItem(product.id)}
        className="text-slate-400 hover:text-red-500 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
