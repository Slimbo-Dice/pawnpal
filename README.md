# PawnPal — Hosting Guide

This folder contains everything needed to host PawnPal as a real installable app on any phone. Drag the folder onto a free hosting service, get a URL back, open it on your phone, tap **Add to Home Screen**, and you have a real icon that launches into the app full-screen with no browser chrome. Works offline once installed.

---

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | The app itself |
| `manifest.json` | Tells the browser this is an installable app |
| `service-worker.js` | Handles offline caching |
| `icon-192.png`, `icon-512.png` | Standard PWA icons (Android) |
| `icon-maskable-512.png` | Android adaptive icon (handles circle/squircle launchers) |
| `apple-touch-icon.png` | Home-screen icon (iOS) |
| `favicon-32.png` | Browser tab icon |
| `README.md` | This file |

Don't rename `index.html` — hosts serve that file by default when someone visits the URL.

---

## Hosting

### Netlify Drop (recommended)

1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this folder onto the page
3. Get a URL back like `https://pawnpal-a1b2c3.netlify.app`
4. That's your live app

### GitHub Pages

1. Create a public repo (e.g. `pawnpal`)
2. Upload all files to the repo root
3. Settings → Pages → Source: `main` branch, `/` (root)
4. Wait ~1 minute. URL: `https://YOURUSERNAME.github.io/pawnpal/`

---

## Installing on a phone

### Android (Chrome)
1. Open URL in Chrome
2. Menu → **Install app** or **Add to Home Screen**
3. Tap the icon — opens full-screen

### iOS (Safari)
1. Open URL in Safari (not Chrome)
2. Share button → **Add to Home Screen**
3. Tap the icon — opens full-screen

---

## Updating the app

Replace the files in your hosted folder (re-upload to Netlify, push to GitHub). The service worker handles update propagation — next time the app is opened, it picks up the new version. Save data stays intact across updates because localStorage is independent of the cached app shell.

When pushing updates, bump `CACHE_VERSION` in `service-worker.js` (e.g. `pawnpal-v1.12.2` → `pawnpal-v1.12.3`) so already-installed phones know to refetch.

---

## Notes

- **The hosted URL is publicly accessible.** Anyone who knows it can use the app. Saves stay private (each device's localStorage is its own world).
- **Multiple devices, same person:** each device holds its own save. Use Export/Import to move a Pal between devices or to back up.
- **The d10 is yours.** The roller is optional. The principle of the game is still the physical d10 + physical pawn; the app is the bookkeeper.
