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
          Beyblade X dal Giappone: conviene?
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl">
          Molti Beyblade X costano meno su Amazon Giappone che su Amazon Italia.
          Qui trovi il confronto diretto dei prezzi, con il calcolo della spedizione consolidata.
          Aggiungi i prodotti al carrello per vedere quanto spendi davvero, spedizione inclusa.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>🛃 Niente dogana sotto i 150&euro;</span>
          <span>📦 Spedizione stimata &mdash; prodotti grandi (es. arene) costano molto di più</span>
          <span className="text-slate-400">
            Aggiornato: {formatDate(exportDate)}
          </span>
        </div>
      </div>

      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
