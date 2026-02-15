import { getAllProducts, getCategories, getExportDate } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { ProductGrid } from '@/components/catalog/product-grid';

export default function HomePage() {
  const products = getAllProducts();
  const categories = getCategories() as string[];
  const exportDate = getExportDate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Beyblade X dal Giappone
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Confronta i prezzi Amazon JP vs IT. Risparmia con la spedizione consolidata.
          <span className="ml-2 text-xs text-slate-400">
            Aggiornato: {formatDate(exportDate)}
          </span>
        </p>
      </div>

      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
