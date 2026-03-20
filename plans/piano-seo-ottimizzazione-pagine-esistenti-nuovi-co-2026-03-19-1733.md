# Piano SEO — Ottimizzazione Pagine Esistenti + Nuovi Contenuti

## Contesto

Il sito BX Deals (33 prodotti, 8 categorie reali) ha una buona base SEO (JSON-LD, OG, sitemap, SSG) ma non sfrutta le keyword a volume più alto emerse dalla ricerca su Ubersuggest. In particolare:

- **"trottole beyblade x" (2.9K vol.)** non compare in nessun contenuto
- **Pagine di categoria inesistenti** — keyword come "beyblade x stadium" (390), "beyblade x lanciatore" (320) non hanno pagine dedicate
- **Nessun contenuto informativo/guide** — "amazon giappone" (1K), "beyblade x tier list" (320) non intercettati
- **Metadata migliorabili** — title About generico, keyword mancanti, search_terms non usati

Dati keyword completi in `keyword-research.md`.

---

## Sprint 1 — Ottimizzazioni on-page (pagine esistenti)

### 1.1 Layout globale — keyword + Schema Organization
**File**: `src/app/layout.tsx`

- Aggiungere keyword mancanti all'array: `trottole beyblade x`, `beyblade x trottole`, `beyblade x italia`, `beyblade x shop`, `beyblade x dove comprare`, `beyblade x takara tomy`
- Aggiungere JSON-LD `Organization` nel body:
  ```json
  { "@type": "Organization", "name": "BX Deals", "url": "https://beyblade-x-deals.vercel.app" }
  ```

### 1.2 Homepage — keyword nel testo + JSON-LD WebSite
**File**: `src/app/page.tsx`

- Integrare "trottole" nel paragrafo intro: *"Confronta i prezzi delle **trottole** Beyblade X..."*
- Aggiungere un breve blocco di testo dopo `<ProductGrid>` con keyword naturali: trottole beyblade x, beyblade x italia, amazon giappone, beyblade x takara tomy
- Aggiungere JSON-LD `WebSite` con `SearchAction` (per Google sitelinks searchbox)

### 1.3 Pagina About — title + FAQ aggiuntive
**File**: `src/app/about/page.tsx`

- Cambiare title da `"Come funziona"` a `"Come comprare Beyblade X da Amazon Giappone | Guida"`
- Cambiare description: aggiungere "amazon giappone", "spedizione italia"
- Aggiungere 3 FAQ al JSON-LD FAQPage:
  - "Amazon Giappone spedisce in Italia?" (40 vol.)
  - "Quanto costa la spedizione da Amazon Giappone?"
  - "Come si paga su Amazon Giappone?"

### 1.4 Pagine prodotto — metadata arricchiti
**File**: `src/app/products/[slug]/page.tsx`

- Nella `generateMetadata`, aggiungere campo `keywords` usando `product.search_terms` + categoria + "beyblade x"
- Aggiungere "trottola" nella description per prodotti di categoria Beyblade/Starter/Booster
- Preparare il breadcrumb per linkare alle pagine categoria (implementate nello Sprint 2)

### 1.5 Footer — link interni
**File**: `src/components/layout/footer.tsx`

- Aggiungere sezione link: "Categorie" (link alle future pagine categoria) + "Guide" (link a About con anchor text ricco: "Guida Amazon Giappone")

---

## Sprint 2 — Pagine di categoria (8 nuove pagine SSG)

### Mapping categorie → slug SEO

| Categoria (dati) | Slug URL | Keyword target | Volume |
|-------------------|----------|----------------|--------|
| Beyblade | `/categoria/trottole` | trottole beyblade x, beyblade x beys | 2.9K+1.3K |
| Stadium | `/categoria/stadium` | beyblade x stadium, beyblade x arena | 390+2.4K |
| Starter | `/categoria/starter` | beyblade x starter | ~200 |
| Set | `/categoria/set` | beyblade x set | ~100 |
| Launcher | `/categoria/lanciatore` | beyblade x lanciatore | 320 |
| Random booster | `/categoria/random-booster` | beyblade x random booster | ~100 |
| Accessory | `/categoria/accessori` | beyblade x accessori | ~50 |
| Booster | `/categoria/booster` | beyblade x booster | ~50 |

**Nota**: lo slug "trottole" per Beyblade intercetta la keyword ad alto volume (2.9K). Lo slug "stadium" intercetta sia "stadium" che "arena" nel testo.

### 2.1 Mapping categorie
**Nuovo file**: `src/lib/categories.ts`

Mapping statico: per ogni categoria → slug, titolo H1/meta, description, paragrafo intro, keyword.

### 2.2 Funzioni dati
**File**: `src/lib/data.ts`

Aggiungere: `getProductsByCategory(category)`, `getCategorySlugs()`.

### 2.3 Pagina categoria SSG
**Nuovo file**: `src/app/categoria/[slug]/page.tsx`

- `generateStaticParams()` → 8 slug
- `generateMetadata()` → title tipo "Trottole Beyblade X — Prezzi Amazon JP vs IT | BX Deals"
- H1 ottimizzato per keyword
- Paragrafo descrittivo (2-3 frasi) unico per categoria
- Griglia prodotti (riusa `ProductCard` esistente)
- JSON-LD `CollectionPage` + `BreadcrumbList` (Home > Categoria)
- Canonical URL

### 2.4 Breadcrumb linkati
**File**: `src/app/products/[slug]/page.tsx`

Trasformare breadcrumb categoria da `<span>` a `<Link href="/categoria/...">`. Aggiornare anche il JSON-LD BreadcrumbList con URL categoria.

### 2.5 Sitemap aggiornata
**File**: `src/app/sitemap.ts`

Aggiungere le 8 pagine categoria con priority 0.9, changeFrequency weekly.

### 2.6 Navbar aggiornata
**File**: `src/components/layout/navbar.tsx`

Aggiungere link "Categorie" con dropdown delle categorie principali (o link semplice a homepage con scroll alle categorie).

### 2.7 Types allineati
**File**: `src/lib/types.ts`

Aggiornare `ProductCategory` per riflettere le categorie reali nei dati: Beyblade, Stadium, Starter, Set, Launcher, Random booster, Accessory, Booster (rimuovere Parts, String Launcher, Grip, Custom Parts, Blade che non esistono nei dati).

---

## Sprint 3 — Contenuti guide (2 nuove pagine SSG)

### 3.1 Struttura guide
**Nuovo file**: `src/app/guida/layout.tsx` (opzionale, per stile condiviso)

### 3.2 Guida "Come comprare da Amazon Giappone"
**Nuovo file**: `src/app/guida/comprare-da-amazon-giappone/page.tsx`

- **Target**: amazon giappone (1K), amazon giappone spedisce in italia (40), beyblade x dove comprare (90)
- **Title**: "Come Comprare Beyblade X da Amazon Giappone — Guida 2026"
- **Contenuto**: registrazione Amazon JP, ricerca prodotti, pagamento, spedizione in Italia, spedizione consolidata con esempi, dogana/IVA, FAQ con JSON-LD FAQPage
- Link interni ai prodotti più convenienti

### 3.3 Guida "Migliori Beyblade X"
**Nuovo file**: `src/app/guida/migliori-beyblade-x/page.tsx`

- **Target**: beyblade x tier list (320), beyblade x più forte al mondo (390), migliori beyblade (70)
- **Title**: "Migliori Beyblade X 2026: Tier List e Dove Comprarli"
- **Contenuto**: classifica per tipo (attacco, difesa, stamina), link alle pagine prodotto, sezione "migliori offerte" (prodotti col risparmio % più alto)
- JSON-LD `ItemList`

### 3.4 Sitemap + navbar
- Aggiungere le 2 guide alla sitemap (priority 0.7)
- Aggiungere "Guide" nella navbar

---

## Riepilogo impatto

| Sprint | Pagine | Impatto SEO | Effort |
|--------|--------|-------------|--------|
| 1 — On-page | 0 nuove, 5 modifiche | Medio | Basso |
| 2 — Categorie | 8 nuove + file supporto | **Alto** | Medio |
| 3 — Guide | 2 nuove | **Alto** (contenuto) | Medio |

**Pagine totali dopo**: 35 attuali + 8 categorie + 2 guide = **45 pagine SSG**

---

## File da modificare/creare

### Modifiche a file esistenti
- `src/app/layout.tsx` — keyword, Schema Organization
- `src/app/page.tsx` — testo con keyword, JSON-LD WebSite
- `src/app/about/page.tsx` — title, description, FAQ aggiuntive
- `src/app/products/[slug]/page.tsx` — keywords metadata, breadcrumb linkati
- `src/app/sitemap.ts` — URL categorie + guide
- `src/lib/data.ts` — funzioni per categoria
- `src/lib/types.ts` — allineamento categorie reali
- `src/components/layout/footer.tsx` — link interni
- `src/components/layout/navbar.tsx` — link Guide/Categorie

### Nuovi file
- `src/lib/categories.ts` — mapping SEO categorie
- `src/app/categoria/[slug]/page.tsx` — pagina categoria SSG
- `src/app/guida/comprare-da-amazon-giappone/page.tsx` — guida acquisti JP
- `src/app/guida/migliori-beyblade-x/page.tsx` — tier list

---

## Verifica

1. `npx next dev -p 3900` — verificare che tutte le pagine si carichino
2. Controllare `/sitemap.xml` — deve contenere ~45 URL
3. Verificare JSON-LD con Google Rich Results Test su:
   - Homepage (WebSite + Organization)
   - Una pagina categoria (CollectionPage)
   - Una pagina prodotto (Product con breadcrumb aggiornato)
   - Pagina About (FAQPage con nuove FAQ)
4. `npx next build` — deve completare senza errori, tutte le pagine SSG
5. Verificare breadcrumb linkati funzionanti su pagine prodotto
6. Push su GitHub → Vercel ri-deploya → verificare URL live
