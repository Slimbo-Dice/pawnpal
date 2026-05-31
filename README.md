# PawnPal — PWA Hosting Guide

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

## Step 1 — Host it

### Option A: Netlify Drop (recommended)

The fastest path. No account needed for the first deploy.

1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser
2. Drag this entire folder onto the page
3. Wait ~10 seconds. You'll get a URL like `https://glittering-pawn-a1b2c3.netlify.app`
4. That URL is your app. It's live, on the internet, on https (required for PWA features)

Without an account the URL stays live but Netlify might recycle the subdomain eventually. Sign up (free) to keep it permanently, and you can also rename the subdomain to something memorable like `pawnpal.netlify.app` if it's available.

### Option B: GitHub Pages

Slightly more setup, but free forever and ties to your GitHub account.

1. Create a new public repo on github.com (any name, e.g. `pawnpal`)
2. Upload all the files in this folder to the repo root
3. Settings → Pages → set Source to `main` branch, `/` (root)
4. Wait ~1 minute. Your URL will be `https://YOURUSERNAME.github.io/pawnpal/`

To push updates later: replace the files in the repo and the hosted version updates within a minute.

---

## Step 2 — Install on your phone

### Android (Chrome)

1. Open the URL in Chrome
2. Tap the three-dot menu → **Install app** (or **Add to Home Screen**)
3. Confirm. The icon lands on your home screen
4. Tap the icon — opens full-screen, no browser chrome

### iOS (Safari)

iOS requires Safari, not Chrome. The Safari engine is what powers PWA installs on iPhone.

1. Open the URL in Safari
2. Tap the share button (the box with the up-arrow at the bottom)
3. Scroll down, tap **Add to Home Screen**
4. Confirm. The icon lands on your home screen
5. Tap the icon — opens full-screen

iOS has minor PWA quirks compared to Android (occasional storage eviction on older versions if the phone is under storage pressure), so use Export Save periodically as a backup if you have a long-running Pal.

---

## Step 3 — Bring your existing Pal across

Your current save lives in the `pawnpal_companion.html` you've been opening locally. localStorage is scoped to the URL (origin), so saves don't carry from `file://` to `https://` automatically. That's what Export/Import is for.

1. Open the **old** `pawnpal_companion.html` on your phone (the file:// version you've been using)
2. Tap **Export Save** → a `.json` file downloads
3. Open the **new** hosted URL (the Netlify or GitHub Pages one)
4. Add to Home Screen (Step 2 above)
5. Open the installed app, tap **Import Save**, pick the `.json` you just exported
6. Your Pal carries across cleanly

After that, the hosted version is the one to use. The old file is just a backup at that point.

---

## Updating the app

When I ship a new version of `index.html`, you replace the file in your hosted folder (re-upload on Netlify, push the change to GitHub).

The service worker handles update propagation automatically — next time the app is opened, it picks up the new version. Your save data stays intact across updates because localStorage is independent of the cached app shell.

If a deeply broken update somehow lands and the app won't load even from cache, clear the service worker (Chrome: site settings → clear data; iOS: delete the home-screen icon and reinstall) and your save will reload from localStorage as soon as the fresh app shell is back.

---

## Notes on the install

- **The hosted URL is publicly accessible.** Anyone who knows it can use the app. Saves stay private (each device's localStorage is its own world).
- **Multiple devices, same person:** each device holds its own save. Use Export/Import to move a Pal between your phone and tablet, or to back up.
- **The d10 is yours.** The roller is optional. The principle of the game is still the physical d10 + physical pawn; the app is the bookkeeper.

---

That's it. Drop the folder onto Netlify, open the URL on your phone, Add to Home Screen, import your save, and PawnPal lives on your home screen like any other app.
