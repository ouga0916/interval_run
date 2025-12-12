self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./result.html",
        "./count.js",
        "./result.js",
        "./count.css",
        "./result.css",
        "./audio1.mp3",
        "./audio2.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
