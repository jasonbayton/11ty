importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Define the names of the caches (include versioning for cache versioning)
const CACHE = "offline-pages-v1";
const STATIC_ASSETS_CACHE = "static-assets-v1";
const DATA_CACHE = "data-cache-v1";

// Define the name of the background sync queue
const bgSyncQueueName = "bg-sync-queue";

// Define the offline fallback page
const offlineFallbackPage = '/offline.html';
const offlinecache = [
  '/offline.html'
];

// Precache the offline fallback page using Workbox precaching
workbox.precaching.precacheAndRoute([
  { url: '/offline.html', revision: '1' }
]);

// Event listener for the message event
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Event listener for the install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Add the offline cache to the cache storage
      caches.open(CACHE)
        .then((cache) => cache.addAll(offlinecache)),

      // Register the background sync with the name and options
      self.registration.registerBackgroundSync({
        name: bgSyncQueueName,
        options: {
          maxRetentionTime: 60 * 24 // Retry for up to 24 hours
        }
      }),

      // Register the periodic sync with the tag and options
      self.registration.periodicSync.register('sync-data', {
        minInterval: 60 * 60 * 24 // Sync every 24 hours
      })
    ])
  );
});

// Activation event to clean up old caches
self.addEventListener('activate', (event) => {
  const expectedCaches = [CACHE, STATIC_ASSETS_CACHE, DATA_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Check if navigation preload is supported
if (workbox.navigationPreload.isSupported()) {
  // Enable navigation preload
  workbox.navigationPreload.enable();
}

// Define a plugin to notify clients when new content is available
const newContentPlugin = {
  async cacheDidUpdate({request, oldResponse, newResponse}) {
    // Notify clients if a new network response is cached
    if (newResponse) {
      const clients = await self.clients.matchAll();
      for (const client of clients) {
        client.postMessage({ type: 'NEW_CONTENT_AVAILABLE', url: request.url });
      }
    }
  }
};

// Register a route for navigation requests with a NetworkFirst strategy and the newContentPlugin
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
      newContentPlugin
    ],
  })
);

// Set a catch handler to serve the offline fallback for navigations
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match(offlineFallbackPage);
  }
  return Response.error();
});


// Event listener for the background sync event
self.addEventListener('sync', (event) => {
  if (event.tag === bgSyncQueueName) {
    event.waitUntil(handleBackgroundSync());
  }
});

// Event listener for the periodic sync event
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(handlePeriodicSync());
  }
});

// Handle background sync requests here
async function handleBackgroundSync() {
  try {
    // Get the background sync queue.
    const bgSyncQueue = await getBackgroundSyncQueue(bgSyncQueueName);

    // Iterate over the queue and handle each request.
    for (const syncRequest of bgSyncQueue) {
      const { id, request } = syncRequest;

      // Attempt to fetch the request from the network.
      const networkResponse = await fetch(request);

      // If the request was successful, update the cache with the new data.
      if (networkResponse.ok) {
        await caches.open(CACHE)
          .then((cache) => cache.put(request, networkResponse.clone()));

        // Notify clients about updated content.
        const clients = await self.clients.matchAll();
        for (const client of clients) {
          client.postMessage({ type: 'NEW_CONTENT_AVAILABLE', url: request.url });
        }

        // Remove the request from the queue.
        await removeRequestFromQueue(bgSyncQueueName, id);
      }
    }
  } catch (error) {
    console.error('Error handling background sync:', error);
  }
}

// Handle periodic sync requests here
async function handlePeriodicSync() {
  try {
    console.log("Periodic Sync Started");

    // Cache static assets for offline use
    const urlsToCache = [
      "/offline.html",
      "/manifest.json",
      "/css/core.css",
      "/css/base.css",
      "/js/fuse-search.js",
      "/js/fuse-search-worker.js",
    ];
    const staticCache = await caches.open(STATIC_ASSETS_CACHE);
    await staticCache.addAll(urlsToCache);

    // Update cache with new content from API
    const updateCache = async () => {
      const response = await fetch("/api/data");
      const dataCache = await caches.open(DATA_CACHE);
      dataCache.put("/api/data", response.clone());
    };
    await updateCache();

    // Notify clients about new API data
    const clients = await self.clients.matchAll();
    for (const client of clients) {
      client.postMessage({ type: 'NEW_DATA_AVAILABLE', url: '/api/data' });
    }

    // Invalidate outdated cache entries in DATA_CACHE
    const invalidateCache = async () => {
      const dataCache = await caches.open(DATA_CACHE);
      const keys = await dataCache.keys();
      const now = Date.now();
      keys.forEach(async (key) => {
        const response = await dataCache.match(key);
        const headers = response.headers;
        const dateHeader = headers.get("date");
        const date = new Date(dateHeader).getTime();
        if (now - date > 24 * 60 * 60 * 1000) {
          await dataCache.delete(key);
        }
      });
    };
    await invalidateCache();

    console.log("Periodic Sync Successful");
  } catch (err) {
    console.error("Periodic Sync Failed: ", err);
  }
}