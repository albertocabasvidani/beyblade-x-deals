'use client';

import { useCart } from './cart-provider';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function AddToCartButton({ productId, disabled, size = 'sm' }: AddToCartButtonProps) {
  const { items, addItem, removeItem } = useCart();
  const inCart = items.some(i => i.productId === productId);

  if (disabled) {
    return (
      <button disabled className="w-full rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-400 cursor-not-allowed">
        Non disponibile
      </button>
    );
  }

  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';

  if (inCart) {
    return (
      <button
        onClick={() => removeItem(productId)}
        className={`w-full rounded-lg border-2 border-brand bg-white font-medium text-brand hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors ${sizeClasses}`}
      >
        Nel carrello &times;
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem(productId)}
      className={`w-full rounded-lg bg-brand font-medium text-white hover:bg-brand-light transition-colors ${sizeClasses}`}
    >
      + Aggiungi
    </button>
  );
}
