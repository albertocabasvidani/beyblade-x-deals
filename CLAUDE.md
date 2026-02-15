# BX Deals - Istruzioni Claude Code

## Progetto
App pubblica per confronto prezzi Beyblade X tra Amazon JP e IT.
Aiuta gli acquirenti italiani a trovare offerte dal Giappone con spedizione consolidata.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Hosting: Vercel free tier
- Dati: JSON statico esportato dal DB SQLite dell'app privata (compravendite)
- Auth: nessuna — anonimo, localStorage per carrello

## Server Dev
```bash
npx next dev -p 3900
```
**NOTA**: porta 3847 riservata al progetto compravendite.

## Struttura
```
src/
├── app/
│   ├── page.tsx                    # Homepage catalogo (SSG)
│   ├── products/[slug]/page.tsx    # Dettaglio prodotto (SSG)
│   ├── cart/page.tsx               # Simulatore carrello (client-only)
│   └── about/page.tsx              # Come funziona + affiliate disclosure
├── components/
│   ├── layout/     # navbar, footer
│   ├── catalog/    # product-card, product-grid, category-filter, sort-select, search-bar
│   ├── product/    # price-comparison, affiliate-links, price-history-chart
│   ├── cart/       # cart-provider, cart-item-row, cart-summary, add-to-cart-button
│   └── ui/         # badge, price-tag, savings-indicator
├── lib/
│   ├── data.ts          # Carica dati da JSON statico
│   ├── types.ts         # Interfacce TypeScript
│   ├── shipping.ts      # Formula spedizione consolidata
│   ├── affiliate.ts     # Builder URL affiliati Amazon JP/IT
│   ├── format.ts        # Formattatori EUR/date
│   └── exchange-rate.ts # Client frankfurter.app
└── data/
    └── products.json    # 33 prodotti esportati dal DB SQLite
```

## Dati
- I dati vengono dal DB SQLite dell'app privata `compravendite`
- Script export: `c:\claude-code\Personale\compravendite\scripts\export-data.js`
- Output: `src/data/products.json`
- Slug prodotti = ASIN in minuscolo (es. `b0g5d842sq`)

## Formula Spedizione Consolidata
```
Shipping = 16.50 + SUM × N^(-0.194)
```
- SUM = Σ(shipping_individuale_i - 16.50) × qty_i (solo FBA)
- N = numero totale articoli FBA
- Solo prodotti FBA si consolidano

## Link Affiliati
- Tag in `.env.local`: `NEXT_PUBLIC_AFFILIATE_TAG_JP`, `NEXT_PUBLIC_AFFILIATE_TAG_IT`
- Attualmente placeholder (`bxdeals-22`, `bxdeals-21`), da sostituire con tag reali
- `affiliate.ts` genera URL con tag per JP, IT e carrello bulk

## Business Model
Link affiliati Amazon → commissioni 3% giocattoli → raggiungere 10 vendite/mese → Creators API per prezzi automatici.

## Aggiornamento Dati
1. Aggiornare prezzi nell'app privata compravendite
2. Eseguire `node scripts/export-data.js` dal repo compravendite
3. Commit + push nel repo beyblade-x-deals → Vercel ri-deploya

## Relazione con App Privata
- **compravendite** (privata): app esistente per tracking prezzi + resale (Vinted/Subito)
- **beyblade-x-deals** (pubblica): solo confronto prezzi JP vs IT, no resale
- Repos 100% indipendenti, dati copiati via JSON
- Piano originale: `c:\claude-code\Personale\compravendite\plans\beyblade-x-deals-public-2026-02-15.md`

## GitHub
- Repo: https://github.com/albertocabasvidani/beyblade-x-deals
- Branch: master
