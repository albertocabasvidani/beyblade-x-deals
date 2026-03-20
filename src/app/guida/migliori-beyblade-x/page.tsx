import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/data';
import { formatEur } from '@/lib/format';

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

export const metadata: Metadata = {
  title: 'Migliori Beyblade X 2026: Tier List e Dove Comprarli',
  description: 'Classifica dei migliori Beyblade X Takara Tomy. Tier list aggiornata con prezzi Amazon Giappone vs Italia e le offerte con il risparmio maggiore.',
  keywords: [
    'migliori beyblade x', 'beyblade x tier list', 'beyblade x più forte al mondo',
    'migliori beyblade', 'beyblade x meta', 'beyblade x beys',
    'beyblade x più forte', 'trottole beyblade x migliori',
  ],
  alternates: {
    canonical: `${BASE_URL}/guida/migliori-beyblade-x`,
  },
};

export default function GuidaMigliori() {
  const products = getAllProducts();

  const beys = products.filter(p =>
    ['Beyblade', 'Starter', 'Booster'].includes(p.category)
  );

  const bestDeals = [...beys]
    .filter(p => p.savings_pct && p.savings_pct > 0 && p.price_jp_eur)
    .sort((a, b) => (b.savings_pct ?? 0) - (a.savings_pct ?? 0))
    .slice(0, 10);

  const cheapest = [...beys]
    .filter(p => p.price_jp_eur && p.price_jp_eur > 0)
    .sort((a, b) => (a.price_jp_eur ?? 999) - (b.price_jp_eur ?? 999))
    .slice(0, 10);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Migliori Beyblade X 2026',
    numberOfItems: bestDeals.length,
    itemListElement: bestDeals.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${BASE_URL}/products/${p.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">Catalogo</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Migliori Beyblade X</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Migliori Beyblade X 2026: Tier List e Dove Comprarli
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Classifica delle trottole Beyblade X Takara Tomy con il miglior rapporto qualit&agrave;-prezzo
        comprando da Amazon Giappone
      </p>

      <div className="mt-8 flex flex-col gap-10 text-sm leading-relaxed text-slate-700">

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Top 10: Maggior risparmio JP vs IT
          </h2>
          <p className="mb-4">
            Queste trottole Beyblade X offrono il <strong>maggior risparmio percentuale</strong> comprando
            da Amazon Giappone invece che da Amazon Italia. La classifica si basa sui prezzi attuali.
          </p>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">#</th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">Nome</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">JP</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">IT</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">Risparmio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bestDeals.map((p, i) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-400">{i + 1}</td>
                    <td className="px-3 py-2">
                      <Link href={`/products/${p.slug}`} className="text-brand underline hover:text-brand-light">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-right">{p.price_jp_eur ? formatEur(p.price_jp_eur) : '—'}</td>
                    <td className="px-3 py-2 text-right">{p.price_it_eur ? formatEur(p.price_it_eur) : '—'}</td>
                    <td className="px-3 py-2 text-right font-semibold text-green-600">
                      {p.savings_pct ? `-${p.savings_pct.toFixed(0)}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Prezzi esclusa spedizione. Usa il{' '}
            <Link href="/cart" className="text-brand underline">simulatore carrello</Link>
            {' '}per calcolare il costo totale con spedizione consolidata.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Top 10: Trottole pi&ugrave; economiche dal Giappone
          </h2>
          <p className="mb-4">
            Le trottole Beyblade X con il <strong>prezzo pi&ugrave; basso</strong> su Amazon Giappone.
            Ideali per iniziare la collezione o completarla spendendo poco.
          </p>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">#</th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">Nome</th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">Categoria</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">Prezzo JP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cheapest.map((p, i) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-400">{i + 1}</td>
                    <td className="px-3 py-2">
                      <Link href={`/products/${p.slug}`} className="text-brand underline hover:text-brand-light">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-slate-500">{p.category}</td>
                    <td className="px-3 py-2 text-right font-medium">{formatEur(p.price_jp_eur!)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Come scegliere la trottola giusta
          </h2>
          <p>
            I Beyblade X si dividono in tre tipologie principali, ciascuna con punti di forza diversi:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold text-red-600">Attacco</span>
              <span>&mdash; Potenti ma instabili. Vincono con colpi devastanti nei primi secondi della battaglia.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">Difesa</span>
              <span>&mdash; Pesanti e stabili. Assorbono i colpi e vincono per resistenza.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-green-600">Stamina</span>
              <span>&mdash; Girano a lungo con poca resistenza. Vincono per durata quando l&apos;avversario si ferma.</span>
            </li>
          </ul>
          <p className="mt-3">
            Per un set equilibrato, consigliamo di avere almeno una trottola per tipo.
            Gli <Link href="/beyblade-x-starter" className="text-brand underline">starter set</Link> includono
            trottola e lanciatore e sono ideali per iniziare.
          </p>
        </section>

        <section className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Vuoi risparmiare al massimo?
          </h2>
          <p>
            Ordina pi&ugrave; trottole insieme da Amazon Giappone per sfruttare la{' '}
            <Link href="/guida/comprare-da-amazon-giappone" className="text-brand underline font-medium">
              spedizione consolidata
            </Link>
            . Con 5+ articoli il costo di spedizione per trottola scende sotto i 5&euro;.
          </p>
          <p className="mt-2">
            <Link href="/" className="text-brand underline font-medium hover:text-brand-light">
              Vai al catalogo completo &rarr;
            </Link>
          </p>
        </section>

      </div>
    </div>
  );
}
