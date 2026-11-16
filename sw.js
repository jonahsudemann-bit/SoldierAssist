
const CACHE = "soldierassist-v7";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "./index.html",
        "./manifest.json",
        "./icon.svg"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (new URL(event.request.url).origin !==
      self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response =>
        response || Response.error()
      )
    )
  );
});
