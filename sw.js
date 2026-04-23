const CACHE_NAME = 'fiderana-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './lyrics.json',
  './back-icon.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(rec => {
      return rec || fetch(evt.request);
    })
  );
});