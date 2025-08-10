// Service worker for GitHub Pages project site (relative paths)
const CACHE = 'esoteric-sb-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(caches.match('./index.html').then(r => r || fetch(evt.request)));
    return;
  }
  evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)));
});
