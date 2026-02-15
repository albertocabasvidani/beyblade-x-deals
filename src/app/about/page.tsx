import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Come funziona',
  description: 'Come funziona BX Deals: spedizione consolidata Amazon JP, stima dei costi e affiliate disclosure.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Come funziona</h1>

      <div className="mt-6 flex flex-col gap-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Perch&eacute; comprare dal Giappone?</h2>
          <p>
            I prodotti Beyblade X sono spesso significativamente pi&ugrave; economici su Amazon Giappone rispetto ad Amazon Italia.
            Anche considerando i costi di spedizione internazionale, il risparmio pu&ograve; arrivare fino al 60% su alcuni articoli.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Spedizione consolidata</h2>
          <p>
            Amazon Giappone offre la <strong>spedizione consolidata</strong> per gli articoli FBA
            (Fulfilled By Amazon). Questo significa che puoi ordinare pi&ugrave; prodotti e pagarli
            con un&apos;unica spedizione, riducendo notevolmente il costo per articolo.
          </p>
          <p className="mt-2">
            La nostra stima della spedizione &egrave; basata su una formula calibrata su ordini reali
            (testata su ordini fino a 18 articoli con errore pari a &euro;0). La formula tiene conto del
            numero di articoli e del peso/dimensione di ciascuno.
          </p>
          <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-800">
            <strong>Nota:</strong> la stima &egrave; indicativa. Il costo reale della spedizione viene calcolato
            al momento del checkout su Amazon JP e pu&ograve; variare leggermente.
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">FBA vs FBM</h2>
          <p>
            <strong>FBA (Fulfilled By Amazon)</strong>: il prodotto &egrave; nel magazzino Amazon e la spedizione
            si consolida con gli altri articoli FBA. Questo &egrave; ci&ograve; che vogliamo.
          </p>
          <p className="mt-2">
            <strong>FBM (Fulfilled By Merchant)</strong>: il prodotto viene spedito direttamente dal venditore
            con costi di spedizione separati e spesso imprevedibili. Per questo motivo, mostriamo solo prodotti FBA.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Aggiornamento prezzi</h2>
          <p>
            I prezzi vengono aggiornati periodicamente. La data dell&apos;ultimo aggiornamento &egrave; indicata
            nella pagina del catalogo. Verifica sempre il prezzo attuale su Amazon prima di effettuare un acquisto.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Affiliate Disclosure</h2>
          <p>
            In qualit&agrave; di Affiliato Amazon, questo sito riceve un guadagno dagli acquisti idonei
            effettuati tramite i link presenti su questo sito. Questo non comporta alcun costo aggiuntivo
            per l&apos;utente e ci aiuta a mantenere il servizio attivo e aggiornato.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Amazon e il logo Amazon sono marchi registrati di Amazon.com, Inc. o delle sue affiliate.
          </p>
        </section>
      </div>
    </div>
  );
}
