# Migration Plan — React (TanStack Start) → Vue 3 + TypeScript + Tailwind

Sursă: `Gradinita Zâmbetelor/` (proiect React 19 + TanStack Start/Router, generat Lovable)
Țintă: `frontend/` (Vue 3 + Vite + TypeScript + Vue Router + Tailwind CSS v4)

## 1. Structura actuală a proiectului React

```
Gradinita Zâmbetelor/
  src/
    routes/            # TanStack Router — file-based routing
      __root.tsx        # shell HTML, header/footer, meta implicit, 404 + error boundary
      index.tsx          # "/"
      despre.tsx          # "/despre"
      oferta.tsx           # "/oferta"
      anunturi.tsx          # "/anunturi"
      contact.tsx            # "/contact"
      galerie.tsx             # "/galerie"
      noutati.tsx              # "/noutati" — layout cu <Outlet/>
      noutati.index.tsx         # "/noutati/" — listă articole
      noutati.$slug.tsx          # "/noutati/:slug" — detaliu articol
      sitemap[.]xml.ts            # server route GET /sitemap.xml (SSR only)
    components/
      site-header.tsx    # navbar + meniu mobil (useState local)
      site-footer.tsx
      page-hero.tsx        # hero reutilizabil pt. pagini interioare
      ui/                   # shadcn/ui — 46 fișiere, NEFOLOSITE (vezi §8)
    hooks/use-mobile.tsx    # NEFOLOSIT (doar de ui/sidebar.tsx, la rândul lui nefolosit)
    lib/
      utils.ts               # cn() — NEFOLOSIT (doar de ui/*, nefolosit)
      noutati.data.tsx         # date mock articole (JSX inline ca "content")
      error-capture.ts          # SSR-only (h3/nitro), fără echivalent client
      error-page.ts               # HTML brut pt. pagina de eroare 500 SSR
      lovable-error-reporting.ts    # raportează erori către window.__lovableEvents
    router.tsx, routeTree.gen.ts (generat), server.ts, start.ts   # infra SSR/TanStack Start
    styles.css              # Tailwind v4 (CSS-first), teme oklch, fonturi
  public/
    robots.txt
    documents/.gitkeep        # gol — niciun PDF prezent local
    uploads/2025/05/.gitkeep    # gol
    uploads/2026/05/.gitkeep     # gol
  src/assets/                 # imagini locale + fișiere *.asset.json (indirecție CDN Lovable)
```

## 2. Lista paginilor / rutelor (identice ca URL în Vue Router)

| Rută              | Componentă React     | Pagină Vue                          |
|--------------------|-----------------------|---------------------------------------|
| `/`                 | `routes/index.tsx`      | `pages/HomePage.vue`                    |
| `/despre`            | `routes/despre.tsx`      | `pages/DesprePage.vue`                   |
| `/oferta`             | `routes/oferta.tsx`       | `pages/OfertaPage.vue`                    |
| `/anunturi`            | `routes/anunturi.tsx`      | `pages/AnunturiPage.vue`                   |
| `/contact`              | `routes/contact.tsx`        | `pages/ContactPage.vue`                     |
| `/galerie`               | `routes/galerie.tsx`         | `pages/GaleriePage.vue`                      |
| `/noutati`                | `routes/noutati.tsx` (layout) | `pages/noutati/NoutatiLayout.vue` (`<router-view/>`) |
| `/noutati/` (index)        | `routes/noutati.index.tsx`    | `pages/noutati/NoutatiIndexPage.vue`           |
| `/noutati/:slug`             | `routes/noutati.$slug.tsx`      | `pages/noutati/NoutatiSlugPage.vue`             |
| * (404)                       | `notFoundComponent` din `__root.tsx` | `pages/NotFoundPage.vue`                          |
| `/sitemap.xml`                  | server route (SSR)               | fișier static `public/sitemap.xml` (vezi §9)        |

Parametri/query: singurul parametru dinamic e `:slug` pe `/noutati/:slug` — păstrat identic.

## 3. Componente reutilizabile efectiv folosite

- `SiteHeader` — navbar sticky, logo, meniu desktop cu stare activă, buton "Înscrieri", meniu mobil (toggle `useState` → `ref`).
- `SiteFooter` — 4 coloane (brand, linkuri, contact, program), an curent dinamic.
- `PageHero` — banner reutilizabil (eyebrow/title/subtitle) folosit pe toate paginile interioare.

Toate cele 3 devin componente Vue `<script setup lang="ts">` echivalente, props tipate identic.

## 4. Management de stare

Nu există stare globală reală (Context API, Redux, Zustand) — doar:
- `useState(open)` local în `SiteHeader` → `ref(false)` local Vue. **Nu se folosește Pinia** (nu există stare partajată între componente/pagini; conform cerinței, Pinia se adaugă doar dacă e necesar).
- `QueryClientProvider`/`@tanstack/react-query` sunt montate la root dar **niciun apel de date nu le folosește** — infrastructură moartă. Nu se portează (nicio funcționalitate depinde de ea).

## 5. Requesturi API

Niciunul. Tot conținutul e static/mock (`noutati.data.tsx`, array-uri inline în `oferta.tsx`/`anunturi.tsx`). Nu se creează un layer `api/`/`services/` — ar fi abstracție nefolosită.

## 6. Biblioteci React utilizate efectiv → echivalent Vue

| React | Rol | Echivalent Vue |
|---|---|---|
| `@tanstack/react-router` | routing, `Link`, `useParams`, `Outlet`, meta per-rută | `vue-router` (`RouterLink`, `useRoute`, `<router-view/>`) |
| `@tanstack/react-start` (head/`HeadContent`/`Scripts`) | gestiune `<head>` per-rută | `@unhead/vue` (echivalentul matur, oficial recomandat de ecosistemul Vue/Nuxt pt. head management) |
| `lucide-react` (`Menu`, `X`, `Download`, `ExternalLink`, `MapPin`, `Phone`, `Mail`, `Clock`) | iconuri | `lucide-vue-next` — aceleași iconuri, aceeași grosime linie (1.5-2px stroke implicit identic), aceleași dimensiuni (`size-*`/`h-*/w-*`) |
| React 19 / `react-dom` | runtime | Vue 3 (Composition API) |
| `clsx` + `tailwind-merge` (`cn()`) | doar în `ui/*` nefolosit | **omis** — fără consumatori |
| restul dependințelor din `package.json` (`@radix-ui/*`, `react-hook-form`, `zod`, `recharts`, `embla-carousel-react`, `sonner`, `cmdk`, `vaul`, `date-fns`, `input-otp`, `react-resizable-panels`, `class-variance-authority`) | folosite **exclusiv** de `src/components/ui/*` | **omise** — vezi §8, nicio pagină reală le folosește |

## 7. Stiluri / sistem de design

Tailwind CSS v4, mod CSS-first (`@import "tailwindcss"`, `@theme inline { ... }`), fără `tailwind.config.js`. Se păstrează **fișier cu fișier, identic**:
- Toate variabilele de culoare `oklch(...)` (`--background`, `--primary`, `--secondary`, `--sky-tint`, `--ink`, etc.)
- `--radius` și scala `--radius-sm...4xl`
- Fonturile custom: `--font-display: "Fredoka"`, `--font-sans: "Quicksand"` (Google Fonts, încărcate din `<link>` — mutate în `index.html`, static, identic vizual)
- `tw-animate-css` — păstrat ca dependință/import identic
- `@layer base` (border implicit, `body`, `h1–h6`)
- Toate clasele Tailwind arbitrare din markup (`rounded-[3rem]`, `text-[oklch(0.4_0.08_220)]`, `auto-rows-[180px]`, etc.) — copiate 1:1, doar `className` → `class`.

## 8. Decizie documentată: `src/components/ui/*` (shadcn/ui) și dependințele lor

Cele 46 de fișiere din `components/ui/` (accordion, dialog, sheet, sidebar, carousel, chart, form, calendar, command, etc.) **nu sunt importate de nicio rută sau componentă folosită efectiv** (verificat prin grep pe `src/routes` + `src/components`). Nu au nicio suprafață vizuală sau funcțională în aplicația rulată. În consecință:
- **Nu se portează** — ar însemna migrarea a ~4300 linii de cod și ~25 dependințe (Radix UI, react-hook-form, zod, recharts, embla-carousel, cmdk, vaul, sonner, input-otp, react-resizable-panels) fără niciun beneficiu vizibil, contrar principiului "nu introduce abstracții/dependințe nefolosite".
- Dacă în viitor se adaugă pagini noi care au nevoie de Dialog/Sheet/Select/etc., recomandarea este `radix-vue`/`reka-ui` (portul matur, întreținut activ, al Radix UI pentru Vue) + `shadcn-vue` pentru parytate stilistică — consemnat aici pentru referință viitoare, dar **nu implementat acum**.
- Aceasta este singura abatere de la o portare linie-cu-linie a codului sursă — nu afectează cu nimic replica 1:1 a aplicației randate.

## 9. Infrastructură SSR (TanStack Start) — nu are echivalent în stack-ul cerut

Stack-ul obligatoriu cerut (Vue 3 + Vite + Vue Router, fără meta-framework SSR) înseamnă un **SPA**, ca și `Gradinita Zâmbetelor` de altfel în output-ul vizual (routes-ul e randat client-side identic, SSR-ul TanStack Start există doar pentru performanță/SEO la nivel de hosting Lovable). Fișiere fără echivalent direct, cu decizia luată pentru fiecare:

| Fișier React | Rol | Decizie în Vue |
|---|---|---|
| `server.ts`, `start.ts` | intrare server Nitro/h3, middleware erori SSR | **omise** — nu există server în build-ul Vite SPA |
| `lib/error-capture.ts` | captează erori pt. h3 (SSR) | **omis** — fără server |
| `lib/error-page.ts` | HTML brut pt. 500 SSR | **omis** — fără server |
| `lib/lovable-error-reporting.ts` | raportează erori la `window.__lovableEvents` | **păstrat, adaptat** — util identic, apelat din `app.config.errorHandler` + `router.onError` Vue |
| `routes/sitemap[.]xml.ts` | rută server care generează XML | **convertit în fișier static** `public/sitemap.xml` — conținutul e 100% static (aceleași 7 intrări), deci un fișier static e echivalentul corect pt. un SPA, fără pierdere de funcționalitate |
| meta `head()` per-rută + `<HeadContent/>` | SEO tags per pagină | `@unhead/vue` — `useHead()` în fiecare pagină, identic ca text |
| `<Scripts/>`, `RootShell` html/head static | shell HTML | `index.html` (Vite) — preconnect/`<link>` fonturi mutate static, identice |

Notă onestă: fără server, meta tags per-rută se aplică client-side (la navigare), nu sunt prezente în HTML-ul inițial servit unui crawler care nu execută JS. Consemnat în `MIGRATION_REPORT.md` ca limitare cunoscută.

## 10. Assets

- Imagini locale (`hero-kids.jpg`, `program-*.jpg`) — copiate identic, aceleași dimensiuni/`object-fit`/`aspect-ratio` în markup.
- `news-etwinning.jpg.asset.json`, `news-tiny-hands.png.asset.json`, `news-water.jpg.asset.json` — indirecție către CDN-ul Lovable (`/__l5e/assets-v1/...`), inaccesibilă în afara hostingului Lovable. Proiectul conține deja, nefolosite, fișierele locale corespunzătoare aceluiași subiect: `noutati-etwinning.jpg`, `noutati-tiny-hand.jpg`, `noutati-water.jpg`. **Decizie**: folosite ca sursă reală de imagine în `noutati.data.ts` (nu e un placeholder — sunt asset-uri existente în repo, ale aceluiași subiect, singurele utilizabile în afara Lovable). Documentat în raportul final.
- `declaratie-interes-2025-s.pdf.asset.json`, `declaratie-avere2025-s.pdf.asset.json` — aceeași indirecție CDN, **fără** fișier local echivalent. Se păstrează exact același URL (`/__l5e/assets-v1/...`) — nicio alternativă validă fără acces la CDN-ul Lovable. Risc consemnat.
- `public/documents/*.pdf`, `public/uploads/2025|2026/05/*.pdf` — lipsesc și în sursa React (doar `.gitkeep`); path-urile din `anunturi.tsx`/`oferta.tsx` sunt păstrate identic (aceeași "gaură" există deja în original).
- Fără favicon în proiectul original — nu se adaugă unul nou.

## 11. Formulare

Formularul din `/contact` e necontrolat (`uncontrolled`, fără `react-hook-form`), `onSubmit` face doar `preventDefault()` + `alert(...)`. Portat identic: câmpuri necontrolate + `@submit.prevent` + `alert(...)` cu exact același text. Fără validare suplimentară față de `required`/`type` HTML native, identic cu originalul.

## 12. Riscuri migrării

1. Fidelitate meta/SEO client-only (vezi §9) — acceptat, documentat.
2. PDF-uri lipsă (declarații avere/interese, oferte, plan dezvoltare) — identice cu starea din original, nu introduc conținut fals.
3. Tailwind v4 + `@tailwindcss/vite` trebuie configurat identic (fără `tailwind.config.js`) — risc de clase "purjate" dacă `@source` nu acoperă corect `src/` — verificat la build.
4. Fonturile Google (Fredoka/Quicksand) necesită rețea la build/runtime — identic cu originalul (nu sunt auto-hostate nici în React).
5. `lucide-vue-next` trebuie să conțină exact aceleași 8 iconuri folosite — verificat.

## 13. Ordinea migrării

1. Scaffold Vite + Vue 3 + TS + Tailwind v4 + Vue Router + ESLint + alias `@` (`etapa 3`).
2. Stiluri globale (`styles.css`) + fonturi (`index.html`) — verificare vizuală instant (culori/fonturi de bază).
3. Componente shared: `SiteHeader`, `SiteFooter`, `PageHero`.
4. Layout rădăcină (`App.vue`) + router + 404 + error handler.
5. Pagini simple, fără date: `HomePage`, `DesprePage`, `GaleriePage`, `ContactPage`.
6. Pagini cu date mock: `OfertaPage`, `AnunturiPage`, `noutati/*` (+ `noutati.data.ts`).
7. `sitemap.xml` static, `robots.txt`, assets publice.
8. Build (`npm run build`), verificare erori TS/consolă, verificare responsive pe breakpoint-urile cerute.
9. `MIGRATION_REPORT.md` + `VISUAL_PARITY_CHECKLIST.md`.

## 14. Puncte de atenție pentru fidelitate 1:1

- Clasele Tailwind arbitrare (`text-[oklch(...)]`, `rounded-[3rem]`, `auto-rows-[180px]`, `size-*`) — copiate caracter cu caracter.
- `activeProps`/`activeOptions` din `Link` (stare activă în nav) → `router-link-active`/`router-link-exact-active` cu clasele Tailwind identice aplicate condiționat (echivalent `exact` pt. `/`).
- Ordinea exactă a elementelor, breakpoints (`lg:`, `md:`, `sm:`), spațieri — neschimbate.
- Textul (diacritice incluse) — copiat exact, fără parafrazare.
