const CACHE_NAME = 'enterprise-fx-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Do not cache API requests (Gemini or Currency APIs) so you always get live data
  if (event.request.url.includes('api') || event.request.url.includes('generativelanguage') || event.request.url.includes('cdn.jsdelivr.net')) {
      return; 
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cache if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});
