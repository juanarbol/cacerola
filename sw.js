importScripts("precache-manifest.d494cfdd8afbf090f711d7c8ed9be022.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const filesToCache = [
  '/',
  'cara.mp3',
  'cacerolazo.mp3',
];

const staticCacheName = 'cacerola';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


