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

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Questo non &egrave; un e-commerce</h2>
          <p>
            BX Deals <strong>non vende nulla</strong>. &Egrave; uno strumento gratuito per scoprire
            quanto puoi risparmiare acquistando Beyblade X dal Giappone invece che dall&apos;Italia.
          </p>
          <p className="mt-2">
            Per acquistare, devi iscriverti su <strong>Amazon.co.jp</strong> (puoi farlo con il tuo
            account Amazon esistente) e usare i link ai prodotti per aggiungerli al <em>tuo</em> carrello
            su Amazon. L&apos;acquisto avviene direttamente tra te e Amazon Giappone &mdash; noi non
            gestiamo ordini, pagamenti o spedizioni.
          </p>
        </section>

        <section className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Guida rapida</h2>
          <ol className="flex flex-col gap-3">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
              <div>
                <strong>Cerca i prodotti</strong>
                <p className="mt-0.5 text-slate-600">
                  Sfoglia il catalogo: trovi solo i Beyblade che Amazon Giappone vende e spedisce in Italia (FBA).
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
              <div>
                <strong>Simula il carrello</strong>
                <p className="mt-0.5 text-slate-600">
                  Aggiungi i prodotti al carrello per vedere il costo totale con la spedizione consolidata stimata.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
              <div>
                <strong>Acquista su Amazon JP</strong>
                <p className="mt-0.5 text-slate-600">
                  Clicca sui link ai prodotti per aprirli su Amazon.co.jp, aggiungili al tuo carrello e completa l&apos;ordine.
                </p>
              </div>
            </li>
          </ol>
        </section>

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
            I prodotti grandi (come le arene) hanno costi di spedizione molto pi&ugrave; alti.
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
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Perch&eacute; non trovo il Beyblade X o Y?</h2>
          <p>
            Su BX Deals trovi <strong>solo i Beyblade venduti e spediti da Amazon</strong> (FBA)
            direttamente in Italia. Sono quelli su cui il risparmio &egrave; maggiore e la spedizione
            consolidata funziona davvero.
          </p>
          <p className="mt-2">
            Se un prodotto non &egrave; presente, probabilmente non &egrave; disponibile come FBA su Amazon JP
            oppure non viene spedito in Italia. Controlliamo periodicamente e aggiungiamo nuovi prodotti
            quando diventano disponibili.
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
