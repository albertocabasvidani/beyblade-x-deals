import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://beyblade-x-deals.vercel.app';

export const metadata: Metadata = {
  title: 'Come Comprare Beyblade X da Amazon Giappone — Guida 2026',
  description: 'Guida completa per comprare trottole Beyblade X da Amazon Giappone con spedizione in Italia. Registrazione, pagamento, spedizione consolidata, dogana e costi.',
  keywords: [
    'amazon giappone', 'amazon giappone spedisce in italia',
    'come acquistare da amazon giappone', 'beyblade x dove comprare',
    'comprare beyblade x dal giappone', 'amazon jp italia',
    'spedizione consolidata amazon giappone',
  ],
  alternates: {
    canonical: `${BASE_URL}/guida/comprare-da-amazon-giappone`,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Amazon Giappone spedisce in Italia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, Amazon Giappone (amazon.co.jp) spedisce direttamente in Italia tramite corriere espresso. I prodotti FBA vengono consolidati in un unico pacco per risparmiare sulla spedizione.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa la spedizione da Amazon Giappone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La spedizione base parte da circa 16,50€ per il primo articolo FBA. Con la spedizione consolidata, ogni articolo aggiuntivo costa molto meno. Per 5 trottole Beyblade X la spedizione totale è circa 22-25€.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve un account giapponese per comprare su Amazon Giappone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, puoi registrarti su amazon.co.jp con qualsiasi email e inserire il tuo indirizzo italiano. Il sito è disponibile anche in inglese. Puoi pagare con carta di credito internazionale (Visa, Mastercard, Amex).',
      },
    },
    {
      '@type': 'Question',
      name: 'Si paga la dogana sugli acquisti da Amazon Giappone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per ordini sotto i 150€ di valore merce non si pagano dazi doganali. La maggior parte degli acquisti di Beyblade X rientra in questa soglia. Amazon Japan calcola e anticipa eventuali costi doganali al checkout.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo ci vuole per ricevere un pacco dal Giappone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con la spedizione standard di Amazon Giappone (DHL o corriere espresso), i tempi sono generalmente di 3-7 giorni lavorativi per l\'Italia.',
      },
    },
  ],
};

export default function GuidaAmazonGiappone() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">Catalogo</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Guida Amazon Giappone</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Come comprare Beyblade X da Amazon Giappone
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Guida completa per acquistare trottole Beyblade X dal Giappone con spedizione in Italia
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-slate-700">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Perch&eacute; comprare dal Giappone?
          </h2>
          <p>
            Le trottole Beyblade X Takara Tomy costano spesso <strong>dal 30% al 60% in meno</strong> su
            Amazon Giappone rispetto ad Amazon Italia. Questo perch&eacute; in Giappone i Beyblade sono
            prodotti locali venduti a prezzo di listino, mentre in Italia arrivano con margini di
            importazione e distribuzione.
          </p>
          <p className="mt-2">
            Con la <strong>spedizione consolidata</strong> di Amazon Giappone, puoi ordinare pi&ugrave;
            prodotti pagando una sola spedizione. Pi&ugrave; trottole compri, pi&ugrave; risparmi.
          </p>
          <p className="mt-3">
            <Link href="/" className="text-brand underline hover:text-brand-light">
              Confronta i prezzi nel nostro catalogo &rarr;
            </Link>
          </p>
        </section>

        <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Guida passo-passo
          </h2>
          <ol className="flex flex-col gap-4">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
              <div>
                <strong>Registrati su Amazon.co.jp</strong>
                <p className="mt-1 text-slate-600">
                  Vai su amazon.co.jp e crea un account con la tua email. Il sito &egrave; disponibile
                  in inglese (seleziona &ldquo;English&rdquo; dal menu lingua in alto). Inserisci il tuo
                  indirizzo italiano come indirizzo di spedizione.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
              <div>
                <strong>Cerca i prodotti</strong>
                <p className="mt-1 text-slate-600">
                  Usa il{' '}
                  <Link href="/" className="text-brand underline">catalogo BX Deals</Link>
                  {' '}per trovare i Beyblade X che convengono di pi&ugrave;. Clicca sui link
                  &ldquo;Vedi su Amazon JP&rdquo; per aprire direttamente la pagina del prodotto su Amazon Giappone.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
              <div>
                <strong>Aggiungi al carrello Amazon</strong>
                <p className="mt-1 text-slate-600">
                  Aggiungi i prodotti al carrello su Amazon Giappone. Cerca sempre prodotti
                  <strong> FBA (Fulfilled By Amazon)</strong>: sono quelli che si consolidano in un unico pacco.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">4</span>
              <div>
                <strong>Completa l&apos;ordine</strong>
                <p className="mt-1 text-slate-600">
                  Al checkout vedrai il costo di spedizione reale e l&apos;eventuale anticipo doganale.
                  Paga con carta di credito o debito internazionale (Visa, Mastercard, Amex).
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Spedizione consolidata: come funziona
          </h2>
          <p>
            Amazon Giappone consolida tutti gli articoli <strong>FBA</strong> (Fulfilled By Amazon)
            in un unico pacco. Questo riduce enormemente il costo di spedizione per articolo.
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">Articoli</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">Spedizione stimata</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">Per articolo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="px-4 py-2">1 trottola</td><td className="px-4 py-2">~&euro;17</td><td className="px-4 py-2">&euro;17,00</td></tr>
                <tr><td className="px-4 py-2">3 trottole</td><td className="px-4 py-2">~&euro;20</td><td className="px-4 py-2">&euro;6,67</td></tr>
                <tr><td className="px-4 py-2">5 trottole</td><td className="px-4 py-2">~&euro;23</td><td className="px-4 py-2">&euro;4,60</td></tr>
                <tr><td className="px-4 py-2">10 trottole</td><td className="px-4 py-2">~&euro;28</td><td className="px-4 py-2">&euro;2,80</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Stime basate su trottole Beyblade X standard (FBA). Prodotti grandi come le arene costano di pi&ugrave;.
            Usa il{' '}
            <Link href="/cart" className="text-brand underline">simulatore carrello</Link>
            {' '}per calcoli precisi.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Dogana e IVA
          </h2>
          <p>
            Per ordini con valore merce <strong>sotto i 150&euro;</strong>, non si pagano dazi doganali.
            La maggior parte degli acquisti di trottole Beyblade X rientra in questa soglia.
          </p>
          <p className="mt-2">
            Amazon Giappone calcola e anticipa al checkout l&apos;eventuale Import Fee Deposit
            (anticipo per dazi e IVA). Se il costo reale &egrave; inferiore, Amazon rimborsa la differenza
            entro 60 giorni.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Tempi di consegna
          </h2>
          <p>
            La spedizione standard da Amazon Giappone verso l&apos;Italia impiega generalmente
            <strong> 3-7 giorni lavorativi</strong> tramite corriere espresso (DHL o simile).
            Al checkout trovi la data di consegna stimata.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Metodi di pagamento
          </h2>
          <p>
            Amazon Giappone accetta carte di credito e debito internazionali:
            <strong> Visa, Mastercard, American Express</strong>. I prezzi vengono convertiti
            automaticamente nella valuta della tua carta. Non servono conti bancari giapponesi.
          </p>
        </section>

        <section className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Consiglio: ordina pi&ugrave; prodotti insieme
          </h2>
          <p>
            Il trucco per massimizzare il risparmio &egrave; <strong>ordinare pi&ugrave; trottole Beyblade X
            nello stesso ordine</strong>. La spedizione consolidata riduce il costo per articolo
            fino a meno di 3&euro; con 10+ prodotti.
          </p>
          <p className="mt-2">
            <Link href="/" className="text-brand underline font-medium hover:text-brand-light">
              Vai al catalogo per trovare le migliori offerte &rarr;
            </Link>
          </p>
        </section>

      </div>
    </div>
  );
}
