'use client';

import { formatEur } from '@/lib/format';
import { amazonJpCartUrl } from '@/lib/affiliate';
import type { Product } from '@/lib/types';
import type { CartItem } from '@/lib/types';

interface CartSummaryProps {
  products: Product[];
  items: CartItem[];
  totals: {
    productsTotal: number;
    shipping: { estimated: number | null; hasLargeItems: boolean; needsCalibration: boolean };
    totalWithShipping: number;
    italyTotal: number;
    savingsEur: number;
    savingsPct: number;
    itemCount: number;
  };
}

export function CartSummary({ products, items, totals }: CartSummaryProps) {
  const cartUrlItems = items
    .map(ci => {
      const p = products.find(pr => pr.id === ci.productId);
      if (!p?.asin) return null;
      return { asin: p.asin, qty: ci.quantity };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Riepilogo</h3>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Prodotti ({totals.itemCount})</span>
          <span className="font-medium">{formatEur(totals.productsTotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Spedizione stimata
            <span className="ml-1 text-xs text-slate-400">(consolidata)</span>
          </span>
          <span className="font-medium">
            {totals.shipping.estimated !== null ? formatEur(totals.shipping.estimated) : '—'}
          </span>
        </div>

        <hr className="my-1 border-slate-100" />

        <div className="flex justify-between text-base font-bold">
          <span>Totale stimato</span>
          <span>{formatEur(totals.totalWithShipping)}</span>
        </div>

        {totals.italyTotal > 0 && (
          <>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Se comprato in Italia</span>
              <span className="line-through">{formatEur(totals.italyTotal)}</span>
            </div>
            <div className={`flex justify-between text-sm font-semibold ${totals.savingsEur > 0 ? 'text-savings' : 'text-loss'}`}>
              <span>Risparmio</span>
              <span>
                {totals.savingsEur > 0 ? '-' : '+'}{formatEur(Math.abs(totals.savingsEur))} ({totals.savingsPct > 0 ? '-' : ''}{Math.abs(totals.savingsPct).toFixed(0)}%)
              </span>
            </div>
          </>
        )}
      </div>

      {totals.shipping.needsCalibration && (
        <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          La stima spedizione potrebbe essere meno precisa per articoli grandi.
        </div>
      )}

      <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        La spedizione consolidata &egrave; una stima basata su ordini precedenti. Il costo reale viene calcolato al checkout su Amazon JP.
      </div>

      {cartUrlItems.length > 0 && (
        <a
          href={amazonJpCartUrl(cartUrlItems)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#ff9900] px-4 py-3 text-sm font-semibold text-white hover:bg-[#e88b00] transition-colors"
        >
          Aggiungi tutto al carrello Amazon JP
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </a>
      )}
    </div>
  );
}
