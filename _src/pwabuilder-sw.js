// This is the "Offline copy of assets" service worker

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(doSomeStuff());
  }
});

// Load Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.2/workbox-sw.js');
workbox.setConfig({ debug: false });

// Load Expiration plugin (optional)
workbox.loadModule('workbox-expiration');

// Setup logging & versioning (used for debugging a particular service-worker version)
const version = '3508937123';
const log = (...args) => { console.log(`SW ${version} -`, ...args); };

// Setup Network-First caching strategy
workbox.routing.registerRoute(
  // Match Navigation Routes
  new workbox.routing.NavigationRoute(
    new workbox.strategies.NetworkFirst({
      cacheName: 'pwa-start-url',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 1,
          maxAgeSeconds: YEAR_IN_SECONDS,
        }),
      ],
      matchOptions: {/* Optional, see note below */},
    }),
    // Limit cache to only PWA Start URL
    { allowlist: [/^\/start-url\/$/] },
  ),
);

// Cache Start URL during installation
self.addEventListener('install', (event) => event.waitUntil(() => {
  const startUrl = 'https://www.your-domain.com/start-url/';
  return caches.open('pwa-start-url')
      .then(cache => cache.add(startUrl))
      .then(() => {
        log('Pre-cached NetworkFirst Start url:', startUrl);
      })
      .catch((error) => {
        // If pre-caching fails, continue with installation & activation 
        // since it's a nice to have, not a hard requirement
        log('Failed to pre-cache NetworkFirst Start url:', startUrl, error);
      });
  }));