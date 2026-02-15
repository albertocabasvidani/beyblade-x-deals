'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { CategoryFilter } from './category-filter';
import { SortSelect, type SortOption } from './sort-select';
import { SearchBar } from './search-bar';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-asc':
        return (a.price_jp_eur ?? 999) - (b.price_jp_eur ?? 999);
      case 'price-desc':
        return (b.price_jp_eur ?? 0) - (a.price_jp_eur ?? 0);
      case 'savings':
        return (b.savings_pct ?? -999) - (a.savings_pct ?? -999);
      default:
        return 0;
    }
  });
}

function matchesSearch(product: Product, query: string): boolean {
  const q = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(q) ||
    (product.name_it?.toLowerCase().includes(q) ?? false) ||
    (product.asin?.toLowerCase().includes(q) ?? false) ||
    product.search_terms.some(t => t.toLowerCase().includes(q))
  );
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('savings');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = products;
    if (category) result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => matchesSearch(p, search));
    return sortProducts(result, sort);
  }, [products, category, sort, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <p className="text-sm text-slate-500">
        {filtered.length} prodott{filtered.length === 1 ? 'o' : 'i'}
        {category && <span> in &ldquo;{category}&rdquo;</span>}
        {search && <span> per &ldquo;{search}&rdquo;</span>}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Nessun prodotto trovato</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
