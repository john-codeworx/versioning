import 'universal-fetch';

const cacheName = 'version';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './version.json',
        './index.html'
      ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (event.request.url.match(/(version.json|index.html)$/)) return fetch(event.request);

        return response || fetch(event.request);
      })
  )
});
