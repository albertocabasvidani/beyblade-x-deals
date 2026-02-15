'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatEur } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { SavingsIndicator } from '@/components/ui/savings-indicator';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const p = product;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${p.slug}`} className="relative aspect-square overflow-hidden bg-slate-100">
        {p.image_url ? (
          <Image
            src={p.image_url}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {p.fulfilled_by_amazon && <Badge variant="fba">FBA</Badge>}
          {p.category && <Badge variant="category">{p.category}</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/products/${p.slug}`} className="hover:text-brand transition-colors">
          <h3 className="text-sm font-semibold leading-tight line-clamp-2">{p.name}</h3>
          {p.name_it && p.name_it !== p.name && (
            <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{p.name_it}</p>
          )}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-jp">{formatEur(p.price_jp_eur)}</span>
              {p.price_it_eur && (
                <span className="text-xs text-slate-400 line-through">{formatEur(p.price_it_eur)}</span>
              )}
            </div>
            {p.shipping_jp_eur && (
              <span className="text-xs text-slate-500">+ {formatEur(p.shipping_jp_eur)} sped.</span>
            )}
          </div>
          <SavingsIndicator savingsEur={p.savings_eur} savingsPct={p.savings_pct} size="sm" />
        </div>

        <AddToCartButton productId={p.id} disabled={!p.fulfilled_by_amazon || !p.price_jp_eur} />
      </div>
    </div>
  );
}
