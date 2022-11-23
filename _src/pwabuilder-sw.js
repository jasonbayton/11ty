// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "offline-pages";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const offlineFallbackPage = "offline.html";
const offlinecache = [
  '/',
  '/android/',
  '/css/core.css',
  '/css/doc.css',
  '/css/all.css',
  '/css/webfonts.css',
  '/js/tocbot.js',
  '/js/tocbot.min.js',
  '/js/darkmode.js',
  '/js/darkmodetoggle.js',
  '/img/bayton_logos/bayton_rectangle_light.svg',
  '/img/bayton_logos/bayton_rectangle.svg'
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});