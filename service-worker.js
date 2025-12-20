const CACHE_NAME = "v2";
const ASSETS = [
  "./index.html",
  "./result.html",
  "./count.js",
  "./result.js",
  "./count.css",
  "./result.css",
  "./audio1.mp3",
  "./audio2.mp3",
  "./manifest.json",
  "./clock_icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 1つでもファイルが見つからないと install に失敗するので注意
      return cache.addAll(ASSETS);
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
