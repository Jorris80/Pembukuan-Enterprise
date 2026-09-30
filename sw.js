/* Service worker — Pembukuan Enterprise.
 * Strategi: app shell cache-first (bisa dibuka offline); panggilan API TIDAK pernah di-cache oleh SW
 * (data keuangan selalu dari server; draf offline diantrekan oleh aplikasi di IndexedDB). */
const VERSION = 'pe-v1.0.0';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;                       // POST API lewat jaringan langsung
  if (url.hostname.endsWith('google.com') || url.hostname.endsWith('googleusercontent.com')) return;
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {  // font: stale-while-revalidate
    e.respondWith(caches.open(VERSION).then(c => c.match(e.request).then(hit => {
      const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net; })));
    return;
  }
  if (url.origin !== location.origin) return;
  if (e.request.mode === 'navigate') {                           // navigasi: jaringan dulu, fallback shell
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); /* BUGFIX #7: clone sinkron sebelum body dipakai */
      if (r.ok) caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
