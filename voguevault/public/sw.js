// VogueVault Service Worker

const CACHE_NAME = 'voguevault-cache-v1';
const RUNTIME_CACHE = 'voguevault-runtime-v1';

// Resources to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
  '/images/logo.png',
  '/images/hero-fallback.jpg',
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if a request should be cached
const shouldCache = (url) => {
  const parsedUrl = new URL(url);

  // Cache images
  if (
    url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/) ||
    url.includes('/images/')
  ) {
    return true;
  }

  // Cache fonts
  if (url.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    return true;
  }

  // Cache CSS and JS
  if (url.match(/\.(css|js)$/)) {
    return true;
  }

  // Cache API responses (adjust based on your API structure)
  if (url.includes('/api/articles') || url.includes('/api/categories')) {
    return true;
  }

  // Don't cache analytics, tracking, or ad-related requests
  if (
    url.includes('analytics') ||
    url.includes('tracking') ||
    url.includes('googletagmanager') ||
    url.includes('googlesyndication') ||
    url.includes('googleads') ||
    url.includes('doubleclick') ||
    url.includes('adsense') ||
    url.includes('adservice') ||
    url.includes('pagead') ||
    url.includes('grow.me') ||
    url.includes('mediavine')
  ) {
    return false;
  }

  return false;
};

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle API requests with network-first strategy
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache
          const responseToCache = response.clone();

          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For HTML pages, use network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              // Return cached page or offline page
              return cachedResponse || caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // For other requests, use cache-first strategy for cacheable resources
  if (shouldCache(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response to store in cache
              const responseToCache = response.clone();

              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
    return;
  }

  // For non-cacheable resources, just fetch from network
  event.respondWith(fetch(event.request));
});
