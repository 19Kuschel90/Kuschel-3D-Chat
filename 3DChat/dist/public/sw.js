const version = "1.03",
    preCache = "PRECACHE-" + version,
    cacheList = [
        "/",
        "css/main.css",
        "img/drawing.svg"
    ];

/*  Service Worker Event Handlers */

self.addEventListener("install", function(event) {

    console.log("Installing the service worker!");

    self.skipWaiting();

    caches.open(preCache)
        .then(cache => {

            cache.addAll(cacheList);

        });

});

self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(cacheNames => {
            cacheNames.forEach(value => {

                if (value.indexOf(version) < 0) {
                    caches.delete(value);
                }

            });

            console.log("service worker activated");

            return;

        })

    );

});

self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
        .then(function(response) {

            if (response) {
                return response;
            }

            return fetch(event.request);
        })
    );

});