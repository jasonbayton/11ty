importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Define the name of the cache
const CACHE = "offline-pages";

// Define the name of the background sync queue
const bgSyncQueueName = "bg-sync-queue";

// Define the offline fallback page
const offlineFallbackPage = "offline";

// Define an array of URLs to be cached offline
const offlinecache = [
  '/',
  '/android/',
  '/css/base.css',
  '/js/darkmode.js',
  '/js/darkmodetoggle.js',
  '/img/bayton_logos/bayton_rectangle_light.svg',
  '/img/bayton_logos/bayton_rectangle.svg',
  '/offline/'
];

// Event listener for the message event
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Event listener for the install event
self.addEventListener('install', async (event) => {
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
  caches.open(CACHE).then(cache => {
    console.log('Offline cache contents:', cache.keys());
  });
});

// Check if navigation preload is supported
if (workbox.navigationPreload.isSupported()) {
  // Enable navigation preload
  workbox.navigationPreload.enable();
}

// Register a route to cache all requests
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      // Print a message to the console when a response is fetched from the network
      new workbox.expiration.ExpirationPlugin({
        onCacheEntryAdded: () => console.log('New entry added to cache.'),
        onCacheEntryUpdated: () => console.log('Entry updated in cache.'),
        onCacheEntryDeleted: () => console.log('Entry deleted from cache.'),
        onQuotaExceeded: () => console.warn('Quota exceeded.'),
        onExpirationComplete: () => console.log('Expired entries removed from cache.')
      })
    ]
  })
);

// Event listener for the fetch event
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
        console.log('Network request for offline page failed. Serving offline page from cache.');
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        if (cachedResp) {
          return cachedResp;
        }
        // If no cached response is available, show the offline page
        return caches.match('/offline/');
      }
    })());
    caches.open(CACHE).then(cache => {
      console.log('Cache contents:', cache.keys());
  });
  }
});

// Event listener for the sync event
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
    const cacheName = "static-assets";
    const urlsToCache = [
      "/offline/",
      "/css/base.css",
      "/js/darkmode.js",
      "/js/darkmodetoggle.js",
      "/img/bayton_logos/bayton_rectangle_light.svg",
      "/img/bayton_logos/bayton_rectangle.svg",
    ];
    const cache = await caches.open(cacheName);
    await cache.addAll(urlsToCache);

    // Update cache with new content
    const updateCache = async () => {
      const response = await fetch("/api/data");
      const cache = await caches.open("data-cache");
      cache.put("/api/data", response.clone());
    };
    await updateCache();

    // Provide fallback page when there is no network connectivity
    const fallbackPage = async () => {
      const cache = await caches.open("offline-cache");
      const cachedResponse = await cache.match("/offline/");
      return cachedResponse || Response.error();
    };

    // Invalidate outdated cache entries
    const invalidateCache = async () => {
      const cache = await caches.open("data-cache");
      const keys = await cache.keys();
      const now = Date.now();
      keys.forEach(async (key) => {
        const response = await cache.match(key);
        const headers = response.headers;
        const dateHeader = headers.get("date");
        const date = new Date(dateHeader).getTime();
        if (now - date > 24 * 60 * 60 * 1000) {
          await cache.delete(key);
        }
      });
    };
    await invalidateCache();

    console.log("Periodic Sync Successful");
  } catch (err) {
    console.error("Periodic Sync Failed: ", err);
  }
}

