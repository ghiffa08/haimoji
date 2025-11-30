const CACHE_NAME = 'haimoji-v1';
const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
  '/src/App.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // Tambahkan asset lain jika perlu
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});