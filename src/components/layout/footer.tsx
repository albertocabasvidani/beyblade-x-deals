import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-slate-500">
          <p>
            <strong>BX Deals</strong> &mdash; Confronto prezzi Beyblade X tra Amazon Giappone e Italia
          </p>
          <p className="max-w-xl text-xs">
            In qualit&agrave; di Affiliato Amazon, questo sito riceve un guadagno dagli acquisti idonei.
            I prezzi mostrati potrebbero non essere aggiornati in tempo reale.{' '}
            <Link href="/about" className="underline hover:text-brand">
              Maggiori informazioni
            </Link>
          </p>
          <p className="text-xs text-slate-400">
            I prezzi e la disponibilit&agrave; dei prodotti sono soggetti a variazione. Verifica sempre su Amazon prima dell&apos;acquisto.
          </p>
        </div>
      </div>
    </footer>
  );
}
