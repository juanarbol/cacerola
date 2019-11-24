importScripts("precache-manifest.9104c3b5f5464dd393ebee7b0cc6336b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const filesToCache = [
  '/',
  'bundle-*.js',
  'index.html',
  '*.mp3',
  'manifest-*.json'
];

const staticCacheName = 'cacerola';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
    .catch(error => console.error('CACHING: ' + error))
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(response => {
          return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
    }).catch(error => {
      console.error(error)
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

