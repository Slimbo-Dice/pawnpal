// PawnPal — service worker
// Strategy: cache-first for app shell, network fallback, last-known good when offline.
// To ship a new version: bump CACHE_VERSION below and re-deploy.

const CACHE_VERSION = 'pawnpal-v1.8';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

// Install: cache the core app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clear out any older cached versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: serve from cache when available, fall back to network, then to cached
// index.html for navigation requests (so deep links work offline).
self.addEventListener('fetch', event => {
  // Only handle GET. Skip everything else (e.g. POST, OPTIONS).
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (Google Fonts) — let the browser HTTP cache handle them.
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful same-origin responses for next time
        if (response && response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline + nothing cached: serve the app shell for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
