# Deploy pe Cloudflare Pages

Acest document descrie exact cum se publică aplicația Vue 3 + TypeScript + Vite (`frontend/`) pe
Cloudflare Pages, pornind de la un repository GitHub.

## 1. Verificări efectuate înainte de deploy

- `vite.config.ts` are `base: "/"` (setat explicit) și `build.outDir: "dist"` — build-ul de
  producție se generează corect în `dist/`.
- `public/_redirects` conține regula `/* /index.html 200`, necesară pentru ca rutele Vue Router
  (`/despre`, `/noutati/:slug` etc.) să funcționeze la refresh sau la acces direct pe URL, nu doar
  prin navigare client-side.
- Toate referințele către imagini (`src/assets`, rezolvate prin `import.meta.glob` în
  `src/services/content.ts`), PDF-uri și fișierele JSON din `src/data` au fost verificate — vezi
  secțiunea „Referințe verificate” mai jos.
- Nu există chei API, token-uri, parole sau alte secrete în cod (verificat prin căutare în tot
  codul sursă) — aplicația e 100% statică, fără backend sau variabile de mediu sensibile.
- `.gitignore` exclude `node_modules`, `dist`, fișierele `*.local` și `*.tsbuildinfo` — nu exclude
  `public/_redirects` sau `.node-version`, care trebuie urcate în Git.
- `.node-version` (conține `20`) și `engines.node` din `package.json` fixează versiunea Node
  folosită de Cloudflare la build, ca să nu depindă de versiunea implicită a platformei.
- `npm run build` (`vue-tsc -b && vite build`) rulează fără nicio eroare TypeScript sau Vite.
- `npm run lint` rulează fără erori.

### Referințe verificate în `public/` și `src/data/`

| Referință | Sursă | Stare |
|---|---|---|
| `/documents/plan-dezvoltare-institutionala-2024-2029.pdf` | `src/data/announcements.json` | ⚠️ fișierul PDF lipsește fizic din `public/documents/` (există doar `.gitkeep`) — trebuie încărcat de administrator înainte ca link-ul să funcționeze în producție. Comportament identic cu proiectul sursă. |
| `/uploads/2026/05/2026-05-22-10-00_page_1.pdf`, `/uploads/2025/05/2025-05-23-11-06.pdf` | `src/data/educational-offer.json` | ⚠️ idem — doar `.gitkeep` în `public/uploads/2025/05/` și `public/uploads/2026/05/`, fișierele reale trebuie adăugate acolo |
| `/__l5e/assets-v1/.../declaratie-*.pdf` | `src/data/announcements.json` | ⚠️ URL extern, hostat pe CDN-ul Lovable — funcțional doar dacă acel CDN rămâne disponibil; nu are echivalent local |
| `noutati-etwinning.jpg`, `noutati-tiny-hand.jpg`, `noutati-water.jpg` | `src/data/news.json` (rezolvate din `src/assets/`) | ✅ verificate, incluse corect în `dist/assets/` la build |
| `hero-kids.jpg`, `program-mica.jpg`, `program-mijlocie.jpg`, `program-mare.jpg`, `program-engleza.jpg` | componente pagini | ✅ verificate, incluse corect în `dist/assets/` la build |
| `robots.txt`, `sitemap.xml` | `public/` | ✅ copiate 1:1 în `dist/` la build |

Cele trei referințe marcate ⚠️ nu sunt o eroare de configurare — sunt documente reale care lipsesc
și în proiectul sursă (fișiere ce urmează să fie încărcate periodic de administrația grădiniței).
Nu s-a inventat conținut de înlocuire.

## 2. Setările exacte pentru Cloudflare Pages

Când conectezi proiectul (Cloudflare Dashboard → **Workers & Pages** → **Create application** →
**Pages** → **Connect to Git**), folosește exact aceste valori:

| Setare | Valoare |
|---|---|
| **Framework preset** | `Vue` (sau `Vite`, dacă `Vue` nu apare în listă — ambele setează aceleași comenzi mai jos) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** (dacă repo-ul conține și alte foldere, ex. `Gradinita Zâmbetelor/`) | `frontend` |
| **Production branch** | `main` |
| **Environment variable** `NODE_VERSION` | `20` (redundant cu `.node-version`, dar recomandat explicit) |

Nu sunt necesare alte variabile de mediu — aplicația nu are backend și nu citește `import.meta.env`
pentru chei secrete.

## 3. Procesul de deploy prin GitHub

1. **Urcă proiectul pe GitHub** (dacă nu e deja):
   ```bash
   cd frontend
   git init                     # doar dacă folderul nu e deja un repo Git
   git add .
   git commit -m "Initial commit — Vue app"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
   Dacă `frontend/` face parte dintr-un monorepo (alături de `Gradinita Zâmbetelor/`), poți urca tot
   repo-ul și seta **Root directory** = `frontend` în Cloudflare (vezi tabelul de mai sus), sau poți
   urca doar `frontend/` ca repo separat — ambele funcționează.

2. **Conectează repo-ul în Cloudflare Pages**
   - Cloudflare Dashboard → **Workers & Pages** → **Create application** → tab **Pages** →
     **Connect to Git**.
   - Autorizează Cloudflare să acceseze contul/organizația GitHub și selectează repo-ul.
   - Completează setările din tabelul de mai sus (framework preset, build command, output
     directory, root directory, production branch).
   - Apasă **Save and Deploy**.

3. **Build automat**
   - Cloudflare rulează `npm install` urmat de `npm run build` (care include verificarea
     TypeScript prin `vue-tsc -b`) și publică folderul `dist/`.
   - Orice push pe branch-ul `main` declanșează automat un nou deploy de producție.
   - Push-urile pe alte branch-uri/PR-uri generează automat **Preview Deployments**, cu URL unic,
     utile pentru verificare înainte de a da merge în `main`.

4. **Verificare după deploy**
   - Deschide URL-ul generat de Cloudflare (`https://<proiect>.pages.dev`).
   - Testează navigarea directă pe o rută internă (ex. `https://<proiect>.pages.dev/despre`) și un
     refresh de pagină pe acea rută — regula din `_redirects` trebuie să servească `index.html` cu
     status `200`, nu un 404 Cloudflare.
   - Verifică în consola browser-ului că nu apar erori JS.

## 4. Conectarea unui domeniu personalizat

1. În proiectul Cloudflare Pages, mergi la tab-ul **Custom domains** → **Set up a custom domain**.
2. Introdu domeniul dorit (ex. `gradinita7slatina.ro` sau un subdomeniu, ex. `www.gradinita7slatina.ro`).
3. **Dacă domeniul este deja gestionat de Cloudflare (DNS pe Cloudflare)**:
   - Cloudflare adaugă automat înregistrarea DNS necesară (CNAME către `<proiect>.pages.dev`) și
     activează certificatul SSL automat (Universal SSL) — de obicei activ în câteva minute.
4. **Dacă domeniul este la alt registrar/DNS**:
   - Cloudflare îți arată exact înregistrarea de adăugat (de obicei un `CNAME` către
     `<proiect>.pages.dev` pentru subdomenii, sau instrucțiuni specifice pentru domeniul rădăcină).
   - Adaugă înregistrarea în panoul DNS al registrarului tău.
   - Așteaptă propagarea DNS (de la câteva minute până la 24-48h) — Cloudflare validează automat și
     activează HTTPS după ce DNS-ul e propagat corect.
5. După activare, Cloudflare redirecționează automat traficul HTTP → HTTPS și servește site-ul de pe
   domeniul personalizat, în paralel cu URL-ul implicit `<proiect>.pages.dev` (care rămâne activ ca
   alias tehnic).
6. Recomandare: setează și varianta `www` (sau invers, în funcție de preferință) ca domeniu
   secundar, cu redirect către varianta canonică, pentru consistență SEO.

## 5. Comenzi locale echivalente (pentru testare înainte de push)

```bash
cd frontend
npm install
npm run build     # trebuie să treacă fără erori TypeScript/Vite — identic cu ce rulează Cloudflare
npm run preview   # previzualizează exact folderul dist/ generat, local
```
