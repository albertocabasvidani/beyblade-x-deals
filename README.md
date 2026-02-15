# BX Deals

Confronta i prezzi dei Beyblade X tra Amazon Giappone e Amazon Italia. Scopri quanto puoi risparmiare comprando dal Giappone con la spedizione consolidata.

**Live**: https://beyblade-x-deals.vercel.app

## Funzionalita

- Catalogo 33 prodotti Beyblade X con prezzi JP vs IT
- Stima spedizione consolidata Amazon JP (formula calibrata su ordini reali)
- Simulatore carrello con calcolo totale spedizione inclusa
- Ordinamento per convenienza reale (prezzo + spedizione)
- Link diretti per aggiungere al carrello Amazon JP
- Storico prezzi per ogni prodotto
- SEO: sitemap, JSON-LD Product/FAQ, OpenGraph

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Hosting: Vercel (auto-deploy da GitHub)
- Dati: JSON statico (aggiornamento manuale)

## Sviluppo

```bash
npm install
npx next dev -p 3900
```

Apri http://localhost:3900.

## Aggiornamento Prezzi

I prezzi vengono aggiornati manualmente dall'app privata di tracking:

```bash
# Dal repo compravendite
node scripts/export-data.js

# Dal repo beyblade-x-deals
git add src/data/products.json
git commit -m "chore: aggiornamento prezzi"
git push  # Vercel ri-deploya automaticamente
```

## Variabili d'Ambiente

Crea `.env.local`:

```
NEXT_PUBLIC_AFFILIATE_TAG_JP=il-tuo-tag-jp
NEXT_PUBLIC_AFFILIATE_TAG_IT=il-tuo-tag-it
```

Su Vercel, imposta le stesse variabili nelle env vars del progetto.
