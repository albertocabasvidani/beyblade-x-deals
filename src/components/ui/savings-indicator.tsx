interface SavingsIndicatorProps {
  savingsEur: number | null;
  savingsPct: number | null;
  size?: 'sm' | 'md';
}

export function SavingsIndicator({ savingsEur, savingsPct, size = 'md' }: SavingsIndicatorProps) {
  if (savingsEur === null || savingsPct === null) {
    return <span className="text-xs text-slate-400">N/D</span>;
  }

  const isPositive = savingsEur > 0;
  const color = isPositive ? 'text-savings' : 'text-loss';
  const bg = isPositive ? 'bg-green-50' : 'bg-red-50';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold ${textSize} ${color} ${bg}`}>
      {isPositive ? (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      )}
      {isPositive ? '-' : '+'}{Math.abs(savingsPct).toFixed(0)}%
    </span>
  );
}
