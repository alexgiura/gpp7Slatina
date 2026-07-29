# Visual Parity Checklist

Metodă: rulare simultană a aplicației React originale (`vite dev`, port 8080) și a aplicației Vue
(`vite`, port 5173), captură de ecran full-page cu Playwright/Chromium pe aceleași rute și aceleași
dimensiuni de viewport, comparație vizuală directă a fiecărei perechi.

Legendă: ✅ identic · ⚠️ diferență documentată (vezi `MIGRATION_REPORT.md`)

## Acasă (`/`) — verificat pe toate cele 7 dimensiuni cerute

| Viewport | Status |
|---|---|
| 375×812 | ✅ |
| 390×844 | ✅ |
| 768×1024 | ✅ |
| 1024×768 | ✅ |
| 1366×768 | ✅ |
| 1440×900 | ✅ |
| 1920×1080 | ✅ |

## Contact (`/contact`) — verificat pe toate cele 7 dimensiuni cerute

| Viewport | Status |
|---|---|
| 375×812 | ✅ (inclusiv formular, meniu mobil) |
| 390×844 | ✅ |
| 768×1024 | ✅ |
| 1024×768 | ✅ |
| 1366×768 | ✅ |
| 1440×900 | ✅ |
| 1920×1080 | ✅ |

## Restul paginilor — verificate la 375×812, 768×1024, 1440×900

| Pagină | 375×812 | 768×1024 | 1440×900 |
|---|---|---|---|
| Despre Noi (`/despre`) | ✅ | ✅ | ✅ |
| Oferta Educațională (`/oferta`) | ✅ | ✅ | ✅ |
| Anunțuri (`/anunturi`) | ✅ | ✅ | ✅ |
| Galerie (`/galerie`) | ✅ | ✅ | ✅ |
| Noutăți (`/noutati`) | ✅ | ✅ | ✅ |
| Articol Noutăți (`/noutati/scoala-etwinning-2026-2027`) | ✅ layout/tipografie/imagine principală identice · ⚠️ imaginile card-uri din listă (vezi mai jos) |
| 404 (`/pagina-inexistenta`) | ✅ | ✅ | ✅ |

## Interacțiuni verificate

- [x] Meniu mobil: deschidere/închidere, iconiță `Menu` ↔ `X`, evidențiere link activ ("Acasă")
- [x] Navigare client-side (`router-link`) între toate cele 7 pagini principale
- [x] Stare activă în nav desktop și mobil pentru fiecare rută, inclusiv `/noutati/:slug` (evidențiază "Noutăți")
- [x] Formular contact: submit → `alert("Mulțumim! Te contactăm în curând.")`, fără reload de pagină
- [x] Pagina 404 pentru rută inexistentă
- [x] Articol Noutăți inexistent → mesaj "Articol negăsit" + link înapoi
- [x] Butoane "Deschide documentul" / "Descarcă PDF" din Oferta/Anunțuri — `href`/`target`/`download` identice

## ⚠️ Diferență documentată: imaginile din Noutăți

Testat direct rulând React local (`localhost:8080`): imaginile celor 3 articole din listă și din
pagina de detaliu apar sparte (alt text, fără imagine) — confirmat prin verificare consolă (`404`
pe cele 3 URL-uri `/__l5e/assets-v1/...`). Cauza: în React, aceste imagini vin printr-o indirecție
către CDN-ul intern Lovable, funcțională doar când aplicația rulează în hostingul Lovable, nu într-un
mediu de dezvoltare local generic. Versiunea Vue folosește imaginile locale echivalente (deja
prezente, nefolosite, în repo) — rezultat: imagini funcționale în Vue, sparte în React local. Restul
paginii (layout, tipografie, spațiere, carduri) e identic.

## Console errors verificate

- React: 404 pe favicon (identic cu Vue, benign) + 404 pe cele 3 imagini CDN Noutăți (vezi mai sus).
- Vue: doar 404 pe favicon (niciun favicon definit în proiectul original — comportament identic).
- Nicio eroare JS/Vue/hidratare în consolă pe nicio pagină.
