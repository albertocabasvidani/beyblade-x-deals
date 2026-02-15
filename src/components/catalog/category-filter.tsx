'use client';

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-brand text-white'
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
        }`}
      >
        Tutti
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat === selected ? null : cat)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            selected === cat
              ? 'bg-brand text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
