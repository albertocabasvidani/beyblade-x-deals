import Link from 'next/link';
import { CATEGORIES_SEO } from '@/lib/categories';

const mainCategories = CATEGORIES_SEO.filter(c =>
  ['Beyblade', 'Stadium', 'Starter', 'Set', 'Launcher'].includes(c.category)
);

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-700 mb-2">Categorie</p>
            <ul className="space-y-1">
              {mainCategories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`} className="hover:text-brand transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-700 mb-2">Guide</p>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="hover:text-brand transition-colors">
                  Come comprare da Amazon Giappone
                </Link>
              </li>
              <li>
                <Link href="/guida/comprare-da-amazon-giappone" className="hover:text-brand transition-colors">
                  Guida spedizione consolidata
                </Link>
              </li>
              <li>
                <Link href="/guida/migliori-beyblade-x" className="hover:text-brand transition-colors">
                  Migliori Beyblade X
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="font-semibold text-slate-700 mb-2">BX Deals</p>
              <p className="text-xs">
                Confronto prezzi trottole Beyblade X tra Amazon Giappone e Italia.
                Risparmia con la spedizione consolidata.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
          <p>
            In qualit&agrave; di Affiliato Amazon, questo sito riceve un guadagno dagli acquisti idonei.
            I prezzi mostrati potrebbero non essere aggiornati in tempo reale.{' '}
            <Link href="/about" className="underline hover:text-brand">
              Maggiori informazioni
            </Link>
          </p>
          <p className="mt-2">
            I prezzi e la disponibilit&agrave; dei prodotti sono soggetti a variazione. Verifica sempre su Amazon prima dell&apos;acquisto.
          </p>
        </div>
      </div>
    </footer>
  );
}
