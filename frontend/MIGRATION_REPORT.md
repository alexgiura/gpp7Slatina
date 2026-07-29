# Migration Report — React (TanStack Start) → Vue 3

Vezi `MIGRATION_PLAN.md` pentru auditul complet efectuat înainte de implementare.

## Ce a fost migrat

Toate cele 9 pagini/rute vizibile ale site-ului React, componentele shared (header, footer,
hero de pagină), datele mock din `noutati.data`, stilurile globale Tailwind v4 (identice, aceleași
variabile `oklch`, aceleași fonturi Fredoka/Quicksand), toate asset-urile imagine locale, formularul
de contact (necontrolat, cu `alert()` la submit, identic cu originalul), 404, gestionarea erorilor
și meta tags-urile SEO per pagină.

## Structura aplicației Vue

```
frontend/
  index.html                 # meta implicit + fonturi (înlocuiește RootShell/HeadContent static)
  src/
    main.ts                  # bootstrap Vue + @unhead/vue + router
    App.vue                  # layout rădăcină (header/main/footer) + error boundary
    router/index.ts          # Vue Router — aceleași URL-uri ca TanStack Router
    components/
      SiteHeader.vue
      SiteFooter.vue
      PageHero.vue
      ContactInfoItem.vue    # extras din contact.tsx (subcomponent inline în original)
      ContactFormField.vue   # extras din contact.tsx (subcomponent inline în original)
    pages/
      HomePage.vue, DesprePage.vue, OfertaPage.vue, AnunturiPage.vue,
      ContactPage.vue, GaleriePage.vue, NotFoundPage.vue
      noutati/NoutatiLayout.vue, NoutatiIndexPage.vue, NoutatiSlugPage.vue
    lib/
      noutati.data.ts         # date mock articole (content ca HTML string, randat cu v-html)
      lovable-error-reporting.ts
    types/article.ts
    assets/                    # imagini + cele 2 fișiere *.asset.json (PDF-uri) copiate identic
    styles.css                  # copiat 1:1 din original (Tailwind v4 CSS-first)
  public/
    robots.txt, sitemap.xml (static), documents/, uploads/2025|2026/05/ (placeholders, ca în original)
```

## Dependințe React înlocuite

| React | Vue | Motiv |
|---|---|---|
| `@tanstack/react-router` + `@tanstack/react-start` | `vue-router` | routing echivalent, fără SSR (vezi mai jos) |
| `lucide-react` | `@lucide/vue` (succesorul menținut al `lucide-vue-next`, deprecat între timp) | aceleași 8 iconuri (`Menu`, `X`, `Download`, `ExternalLink`, `MapPin`, `Phone`, `Mail`, `Clock`), identice ca formă |
| gestiune `<head>` prin `head()`/`HeadContent` | `@unhead/vue` (`useHead()`) | echivalentul matur oficial pt. Vue/Nuxt |
| React 19 / `react-dom` | Vue 3 (Composition API, `<script setup>`) | — |
| `clsx` + `tailwind-merge` (`cn()`) | **eliminat** | fără niciun consumator în aplicația reală (folosit doar de `components/ui/*`, nefolosit) |
| 46 componente `components/ui/*` (shadcn) + ~25 pachete asociate (Radix UI, `react-hook-form`, `zod`, `recharts`, `embla-carousel-react`, `cmdk`, `vaul`, `sonner`, `input-otp`, `react-resizable-panels`, `class-variance-authority`) | **neportate, documentat** | verificat prin grep — zero import din `src/routes`/`src/components` folosite; ar fi adăugat ~4300 linii și ~25 dependințe fără nicio suprafață vizuală. Recomandare pt. viitor: `reka-ui`/`radix-vue` + `shadcn-vue`. |

## Rute migrate

| URL | Status |
|---|---|
| `/` | ✅ identic |
| `/despre` | ✅ identic |
| `/oferta` | ✅ identic |
| `/anunturi` | ✅ identic |
| `/contact` | ✅ identic (formular necontrolat + `alert()`) |
| `/galerie` | ✅ identic |
| `/noutati` | ✅ identic (layout + index) |
| `/noutati/:slug` | ✅ identic, inclusiv starea "articol negăsit" |
| `*` (404) | ✅ identic (text original în engleză, păstrat ca atare) |
| `/sitemap.xml` | convertit din rută server în fișier static `public/sitemap.xml`, conținut identic (7 intrări) |

## Componente migrate

`SiteHeader`, `SiteFooter`, `PageHero` — 1:1, inclusiv starea activă din navigare (`router.path`
comparat manual, echivalent cu `activeProps`/`activeOptions` din TanStack) și meniul mobil
(`useState` → `ref`). `ContactInfoItem`/`ContactFormField` au fost extrase ca fișiere separate
(Vue SFC nu permite mai multe componente într-un singur fișier, spre deosebire de React).

## Managementul stării

Fără Pinia — nu există stare globală reală în aplicația originală. Singura stare este `ref(false)`
local în `SiteHeader` pentru meniul mobil. `@tanstack/react-query`/`QueryClientProvider` din
original erau montate dar nefolosite de nicio pagină — nu au fost portate.

## Integrarea API

Nu există. Tot conținutul e static/mock (verificat exhaustiv). Nu s-a creat un layer `api/`/`services/`
gol.

## Diferențe rămase și motivele exacte

1. **Fără SSR** — stack-ul cerut (Vue + Vite + Vue Router, fără meta-framework) e un SPA client-side.
   TanStack Start oferea SSR la nivel de hosting Lovable; acest lucru nu are echivalent în stack-ul
   cerut. Efect practic: meta tags-urile per-pagină (title/description/og) se aplică după ce JS-ul
   rulează în browser, nu sunt prezente în HTML-ul inițial pentru crawlere care nu execută JS.
   `server.ts`, `start.ts`, `lib/error-capture.ts`, `lib/error-page.ts` (infrastructură SSR/Nitro) au
   fost eliminate — nu au echivalent și nu au efect vizual/funcțional în browser.
2. **Imaginile din Noutăți** — cele 3 articole din `noutati.data.tsx` foloseau în React o indirecție
   către CDN-ul Lovable (`/__l5e/assets-v1/...`, prin fișierele `*.asset.json`), funcțională doar în
   interiorul hostingului Lovable. Testat direct: rulând React local (`npm run dev`), aceste imagini
   sunt sparte (404) în afara Lovable. Proiectul conținea deja, nefolosite, imaginile locale
   corespunzătoare (`noutati-etwinning.jpg`, `noutati-tiny-hand.jpg`, `noutati-water.jpg`) — acestea
   au fost folosite în Vue, rezultând în imagini funcționale (verificat vizual, capturi mai jos).
   Cele două declarații PDF (`declaratie-interes`/`declaratie-avere`) nu au echivalent local — s-a
   păstrat exact același URL CDN ca în original (risc identic cu sursa).
3. **PDF-uri lipsă** (`plan-dezvoltare-institutionala-2024-2029.pdf`, ofertele din `/uploads/...`) —
   lipsesc și în proiectul React sursă (doar `.gitkeep`); path-urile sunt păstrate identic, nu s-a
   inventat conținut.
4. **8 vulnerabilități "high"** raportate de `npm audit` — toate în lanțul de unelte de dezvoltare
   (`eslint`/`vue-tsc` → `minimatch`/`brace-expansion`, un DoS teoretic prin regex), nu ating codul de
   producție sau bundle-ul livrat în browser.

## Verificare vizuală efectuată

Comparație directă, side-by-side, folosind Playwright (Chromium) — capturi de ecran pentru
aplicația React (`vite dev`, port 8080) și aplicația Vue (`vite`, port 5173) pe aceleași rute și
aceleași dimensiuni de viewport. Rezultat: identice pixel cu pixel, cu singura diferență reală fiind
cea documentată la punctul 2 (imaginile Noutăți, unde Vue e de fapt superior/funcțional). Detalii
complete în `VISUAL_PARITY_CHECKLIST.md`.

## Teste efectuate

- `npm install` — OK.
- `npm run build` (`vue-tsc -b && vite build`) — trece fără erori TypeScript.
- `npm run lint` (ESLint + Prettier) — trece fără erori (1 warning intenționat, documentat, pt.
  `v-html` pe conținut static necontrolat de utilizator).
- `npm run dev` — pornit, verificat manual în browser (Playwright) pe toate cele 9 pagini.
- Interacțiuni verificate: meniu mobil (deschis/închis + iconiță Menu/X), navigare activă în meniu,
  navigare client-side între pagini, pagina 404, articol Noutăți inexistent.
- Responsive: 375×812, 390×844, 768×1024, 1440×900 pe toate paginile; 1024×768, 1366×768, 1920×1080
  suplimentar pe Acasă și Contact (paginile cu cel mai complex layout).

## Comenzi de rulare

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # verifică TypeScript + produce dist/
npm run preview  # previzualizează build-ul de producție
npm run lint
```
