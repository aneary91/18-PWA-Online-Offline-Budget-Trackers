const CACHE_NAME = "my-site-cache-site-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/db.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('/api/')){
        e.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache)=>{
                return fetch(e.request)
                .then((response)=>{
                })
                .catch((error)=>{
                    return cache.match(e.request)
                })
            })
            .catch(error=>
                console.log(error))
        );
        return 
    }
    e.respondWith(
        fetch(e.request)
        .catch(()=>{
            return cache.match(e.request)
            .then((response)=>{
                if (response) {
                    return response
                }
            })
        })
    );
});

