# BX Deals - Istruzioni Claude Code

## Progetto
App pubblica per confronto prezzi Beyblade X tra Amazon JP e IT.
Aiuta gli acquirenti italiani a trovare offerte dal Giappone con spedizione consolidata.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Hosting: Vercel free tier (auto-deploy da GitHub)
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
│   ├── products/[slug]/page.tsx    # Dettaglio prodotto (SSG) + JSON-LD
│   ├── cart/
│   │   ├── page.tsx                # Simulatore carrello (client-only)
│   │   └── layout.tsx              # noindex per motori di ricerca
│   ├── about/page.tsx              # Come funziona + FAQ + affiliate disclosure
│   ├── sitemap.ts                  # Sitemap dinamica (35 URL)
│   └── robots.ts                   # Robots.txt (disallow /cart)
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
│   ├── affiliate.ts     # Builder URL affiliati Amazon JP/IT + add-to-cart
│   ├── format.ts        # Formattatori EUR/date
│   └── exchange-rate.ts # Client frankfurter.app
├── data/
│   └── products.json    # 33 prodotti esportati dal DB SQLite
└── public/
    └── googlec6ffa36b08edc90d.html  # Verifica Google Search Console
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
- JP: `albertocv-22` (attivo, anche su Vercel env vars)
- IT: `bxdeals-21` (placeholder, da sostituire con tag reale)
- `affiliate.ts` genera:
  - URL pagina prodotto con tag (JP e IT)
  - URL add-to-cart Amazon JP con tag (singolo e bulk)
- Il pulsante principale sulle pagine prodotto usa l'URL add-to-cart (aggiunge direttamente al carrello Amazon JP)

## SEO
- **Sitemap**: `src/app/sitemap.ts` → `/sitemap.xml` (35 URL)
- **Robots**: `src/app/robots.ts` → `/robots.txt` (disallow /cart)
- **JSON-LD Product**: schema.org Product + BreadcrumbList su ogni pagina prodotto
- **JSON-LD FAQPage**: 5 FAQ nella pagina Come funziona
- **OpenGraph + Twitter cards**: su layout globale e pagine prodotto (con immagini)
- **Keywords**: "beyblade x prezzo", "amazon giappone", "spedizione italia", etc.
- **Canonical URLs**: su tutte le pagine
- **Cart noindex**: `/cart` escluso da indicizzazione (robots.txt + meta robots)
- **Google Search Console**: verificato con HTML file, sitemap inviata

## Ordinamento Default
"Più convenienti (sped. inclusa)" — ordina per `prezzo_IT - (prezzo_JP + spedizione_JP)`, dal risparmio maggiore al minore.

## Deploy
- **Vercel**: auto-deploy da GitHub su ogni push a master
- **URL**: https://beyblade-x-deals.vercel.app
- **Env vars su Vercel**: `NEXT_PUBLIC_AFFILIATE_TAG_JP=albertocv-22`
- Build ~30 secondi, 39 pagine statiche

## Business Model
Link affiliati Amazon → commissioni 3% giocattoli → raggiungere 10 vendite/mese → Creators API per prezzi automatici.

## Prossimi Passi
- Registrazione Amazon Associates JP (serve Payoneer approvato)
- Payoneer: account in review, serve receiving account JPY
- Dopo 10 vendite qualificate: accesso Creators API per prezzi automatici
- La vecchia PA-API viene dismessa il 30/04/2026, sostituita dalla Creators API (OAuth 2.0)

## Aggiornamento Dati
1. Aggiornare prezzi nell'app privata compravendite
2. Eseguire `node scripts/export-data.js` dal repo compravendite
3. Commit + push nel repo beyblade-x-deals → Vercel ri-deploya (~30s)

## Relazione con App Privata
- **compravendite** (privata): app esistente per tracking prezzi + resale (Vinted/Subito)
- **beyblade-x-deals** (pubblica): solo confronto prezzi JP vs IT, no resale
- Repos 100% indipendenti, dati copiati via JSON
- Piano originale: `c:\claude-code\Personale\compravendite\plans\beyblade-x-deals-public-2026-02-15.md`

## GitHub
- Repo: https://github.com/albertocabasvidani/beyblade-x-deals
- Branch: master

# currentDate
Today's date is 2026-02-15.
