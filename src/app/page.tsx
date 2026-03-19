import { getAllProducts, getCategories, getExportDate } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { ProductGrid } from '@/components/catalog/product-grid';

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BX Deals',
  url: BASE_URL,
  description: 'Confronto prezzi trottole Beyblade X tra Amazon Giappone e Italia',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  const products = getAllProducts();
  const categories = getCategories() as string[];
  const exportDate = getExportDate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Trottole Beyblade X dal Giappone: conviene?
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl">
          Molte trottole Beyblade X costano meno su Amazon Giappone che su Amazon Italia.
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

      <section className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 max-w-3xl">
        <h2 className="text-base font-semibold text-slate-700 mb-2">
          Confronto prezzi Beyblade X: Amazon Giappone vs Italia
        </h2>
        <p>
          BX Deals confronta i prezzi delle trottole Beyblade X Takara Tomy tra Amazon Giappone
          e Amazon Italia. Starter, set, lanciatori, arene e booster: scopri dove conviene comprare
          e quanto risparmi con la spedizione consolidata verso l&apos;Italia.
          I prezzi vengono aggiornati regolarmente per offrirti sempre il confronto più accurato.
        </p>
      </section>
    </div>
  );
}
