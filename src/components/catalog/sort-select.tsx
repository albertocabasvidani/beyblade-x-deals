'use client';

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'savings' | 'savings-shipped';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: 'savings-shipped', label: 'Più convenienti (sped. inclusa)' },
  { value: 'savings', label: 'Risparmio maggiore (solo prezzo)' },
  { value: 'price-asc', label: 'Prezzo crescente' },
  { value: 'price-desc', label: 'Prezzo decrescente' },
  { value: 'name', label: 'Nome A-Z' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as SortOption)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
