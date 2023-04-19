importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const CACHE = "offline-pages";
const offlineFallbackPage = "/offline.html";
const bgSyncQueueName = "bg-sync-queue";

const offlinecache = [
  '/',
  '/android/',
  '/css/base.css',
  '/js/darkmode.js',
  '/js/darkmodetoggle.js',
  '/img/bayton_logos/bayton_rectangle_light.svg',
  '/img/bayton_logos/bayton_rectangle.svg',
  offlineFallbackPage
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE)
        .then((cache) => cache.addAll(offlinecache)),
      self.registration.registerBackgroundSync({
        name: bgSyncQueueName,
        options: {
          maxRetentionTime: 60 * 24 // Retry for up to 24 hours
        }
      }),
      self.registration.periodicSync.register('sync-data', {
        minInterval: 60 * 60 * 24 // Sync every 24 hours
      })
    ])
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

self.addEventListener('sync', (event) => {
  if (event.tag === bgSyncQueueName) {
    event.waitUntil(handleBackgroundSync());
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(handlePeriodicSync());
  }
});

async function handleBackgroundSync() {
  // Handle background sync requests here
}

async function handlePeriodicSync() {
  // Handle periodic sync requests here
}
