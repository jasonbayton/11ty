importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';

const CACHE_NAME = 'my-cache-v1';

// Precache a list of URLs
precacheAndRoute([
  '/',
  '/android/',
  '/css/base.css',
  '/js/darkmode.js',
  '/js/darkmodetoggle.js',
  '/img/bayton_logos/bayton_rectangle_light.svg',
  '/img/bayton_logos/bayton_rectangle.svg',
  '/offline.html'
]);

// Use the CacheFirst strategy to serve precached URLs
workbox.routing.registerRoute(
  ({url}) => {
    return precacheUrls.indexOf(url.pathname) !== -1;
  },
  new CacheFirst({
    cacheName: CACHE_NAME
  })
);

// Serve offline fallback page for all navigation requests
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/offline.html')
);
