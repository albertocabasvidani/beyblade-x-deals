import { formatEur } from '@/lib/format';

interface PriceTagProps {
  value: number | null;
  variant?: 'jp' | 'it' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const colorMap = {
  jp: 'text-jp',
  it: 'text-it',
  neutral: 'text-slate-900',
};

const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function PriceTag({ value, variant = 'neutral', size = 'md', label }: PriceTagProps) {
  return (
    <div className="flex flex-col">
      {label && <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>}
      <span className={`font-bold ${colorMap[variant]} ${sizeMap[size]}`}>
        {formatEur(value)}
      </span>
    </div>
  );
}
