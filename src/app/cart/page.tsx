'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/cart-provider';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { CartSummary } from '@/components/cart/cart-summary';
import { getAllProducts } from '@/lib/data';
import { calculateCartTotals } from '@/lib/shipping';
import type { Product } from '@/lib/types';

// Note: this is a client component but we import data statically (JSON bundled at build time)
const allProducts: Product[] = getAllProducts();

export default function CartPage() {
  const { items, clearCart } = useCart();

  const cartProducts = items
    .map(ci => {
      const product = allProducts.find(p => p.id === ci.productId);
      return product ? { product, quantity: ci.quantity } : null;
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const totals = calculateCartTotals(
    allProducts,
    items
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h1 className="mt-4 text-xl font-bold text-slate-900">Carrello vuoto</h1>
        <p className="mt-2 text-sm text-slate-500">Aggiungi prodotti dal catalogo per stimare il costo totale con spedizione consolidata.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors"
        >
          Vai al catalogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Simulatore Carrello</h1>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-500 transition-colors"
        >
          Svuota carrello
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-2">
          {cartProducts.map(({ product, quantity }) => (
            <CartItemRow key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <CartSummary products={allProducts} items={items} totals={totals} />
        </div>
      </div>
    </div>
  );
}
