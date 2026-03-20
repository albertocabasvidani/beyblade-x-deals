# Piano: Slug SEO categorie + dropdown guide navbar

## Contesto
Gli slug delle categorie attuali (`/categoria/trottole`, `/categoria/stadium`) non contengono la keyword principale "beyblade x". Per SEO, gli URL devono contenere la keyword target (es. `/beyblade-x-trottole`, `/beyblade-x-stadium`). Inoltre il link "Guide" nella navbar punta a una sola guida — serve un dropdown con tutte le guide.

## Modifiche

### 1. Nuovi slug con keyword in `categories.ts`
Cambiare gli slug in `CATEGORIES_SEO`:

| Slug attuale | Nuovo slug | Keyword target |
|---|---|---|
| `trottole` | `beyblade-x-trottole` | trottole beyblade x (2.9K) |
| `stadium` | `beyblade-x-stadium` | beyblade x stadium (390) |
| `starter` | `beyblade-x-starter` | beyblade x starter |
| `set` | `beyblade-x-set` | beyblade x set |
| `lanciatore` | `beyblade-x-lanciatore` | beyblade x lanciatore (320) |
| `random-booster` | `beyblade-x-random-booster` | beyblade x random booster |
| `accessori` | `beyblade-x-accessori` | beyblade x accessori |
| `booster` | `beyblade-x-booster` | beyblade x booster |

**File**: `src/lib/categories.ts`

### 2. Spostare route da `/categoria/[slug]` a `/[slug]`
Spostare `src/app/categoria/[slug]/page.tsx` → `src/app/[slug]/page.tsx`

URL finali: `/beyblade-x-trottole`, `/beyblade-x-stadium`, ecc.

**Redirect 301** dalle vecchie URL in `next.config.ts`:
```js
redirects: () => [
  { source: '/categoria/trottole', destination: '/beyblade-x-trottole', permanent: true },
  // ... per ogni categoria
]
```

I nuovi slug iniziano tutti con `beyblade-x-` → nessun conflitto con `/about`, `/cart`, `/guida/...`, `/products/...`.

**File**: `src/app/[slug]/page.tsx` (nuovo), `next.config.ts`, eliminare `src/app/categoria/[slug]/`

### 3. Aggiornare tutti i riferimenti interni
Cercare `/categoria/` in tutto il progetto e aggiornare:
- `src/app/[slug]/page.tsx` — link "Altre categorie", canonical, JSON-LD
- `src/app/products/[slug]/page.tsx` — breadcrumb
- `src/components/layout/footer.tsx` — link categorie
- `src/app/sitemap.ts` — URL categorie
- `src/app/page.tsx` — eventuali link

### 4. Dropdown guide nella navbar
Trasformare il link "Guide" in un dropdown on hover con:
- "Migliori Beyblade X 2026" → `/guida/migliori-beyblade-x`
- "Comprare da Amazon Giappone" → `/guida/comprare-da-amazon-giappone`

CSS-only con Tailwind `group` + `group-hover:block`.

**File**: `src/components/layout/navbar.tsx`

### 5. Aggiornare CLAUDE.md
Riflettere la nuova struttura URL (route `/[slug]` invece di `/categoria/[slug]`).

## File da modificare
1. `src/lib/categories.ts` — nuovi slug
2. `src/app/[slug]/page.tsx` — nuova route (copiata da categoria/[slug])
3. `src/app/categoria/[slug]/page.tsx` — eliminare
4. `next.config.ts` — redirect 301
5. `src/components/layout/navbar.tsx` — dropdown guide
6. `src/components/layout/footer.tsx` — aggiornare link
7. `src/app/sitemap.ts` — aggiornare URL
8. `src/app/products/[slug]/page.tsx` — aggiornare breadcrumb
9. `CLAUDE.md` — aggiornare struttura

## Verifica
1. `npx next build` — deve completare senza errori
2. `npx next dev -p 3900` — verificare pagine categoria ai nuovi URL
3. Verificare redirect: `/categoria/trottole` → 301 a `/beyblade-x-trottole`
4. Verificare dropdown guide nella navbar (hover)
5. Verificare sitemap `/sitemap.xml` con nuovi URL
6. Verificare breadcrumb prodotti linkano ai nuovi URL
7. Push → Vercel deploy
