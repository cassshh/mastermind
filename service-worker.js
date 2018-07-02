const DOMAIN = 'mastermind-';
const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  offline: DOMAIN + 'offline-v' + CACHE_VERSION
};

self.addEventListener('install', event => {
  // Activate directly after installing
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Remove old caches
  const keepCaches = Object.keys(CURRENT_CACHES).map(k => CURRENT_CACHES[k]);
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names
          .filter(
            name => name.startsWith(DOMAIN) && keepCaches.indexOf(name) === -1
          )
          .map(name => caches.delete(name))
      );
    })
  );
  // Claim all the client to use sw without reloading
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(resp => {
        return (
          resp ||
          fetch(event.request).then(resp =>
            caches
              .open(CURRENT_CACHES.offline)
              .then(cache =>
                cache.put(event.request, resp.clone()).then(() => resp)
              )
          )
        );
      })
    );
  }
});
