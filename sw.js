const CACHE = 'goyo-v7';
const ASSETS = [
  '.', 'index.html', 'manifest.json', 'icon.svg',
  'sounds/rain.mp3', 'sounds/ocean.mp3', 'sounds/wind.mp3',
  'sounds/bowl.mp3', 'sounds/piano.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request))
  );
});
