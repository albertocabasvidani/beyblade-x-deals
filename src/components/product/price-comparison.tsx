import type { Product } from '@/lib/types';
import { formatEur } from '@/lib/format';
import { SavingsIndicator } from '@/components/ui/savings-indicator';

interface PriceComparisonProps {
  product: Product;
}

export function PriceComparison({ product }: PriceComparisonProps) {
  const p = product;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Confronto Prezzi</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400">Amazon JP</span>
          <span className="text-2xl font-bold text-jp">{formatEur(p.price_jp_eur)}</span>
          {p.shipping_jp_eur && (
            <span className="text-xs text-slate-500">+ {formatEur(p.shipping_jp_eur)} spedizione</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400">Amazon IT</span>
          <span className="text-2xl font-bold text-it">{formatEur(p.price_it_eur)}</span>
          <span className="text-xs text-slate-500">spedizione inclusa</span>
        </div>
      </div>

      {p.savings_eur !== null && p.savings_pct !== null && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
          <span className="text-sm text-slate-600">Risparmio (solo prodotto)</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${p.savings_eur > 0 ? 'text-savings' : 'text-loss'}`}>
              {p.savings_eur > 0 ? '-' : '+'}{formatEur(Math.abs(p.savings_eur))}
            </span>
            <SavingsIndicator savingsEur={p.savings_eur} savingsPct={p.savings_pct} />
          </div>
        </div>
      )}
    </div>
  );
}
