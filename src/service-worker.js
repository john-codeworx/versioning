import '@babel/polyfill';
import 'universal-fetch';

// Use cache to check for new version (doesn't work in Firefox - in 'fetch' response.body is non-existant).
const cacheName = 'version';

self.addEventListener('install', async event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './version.json',
        './index.html'
      ]))
  );
});

self.addEventListener('fetch', async event => {
  event.respondWith(
    caches.match(event.request)
      .then(async response => {
        if (event.request.url.match(/(version.json|index.html)$/)) return fetch(event.request);

        return response || fetch(event.request);
      })
  )
});
