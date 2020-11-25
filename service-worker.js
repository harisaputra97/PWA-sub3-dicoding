importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// pre cache
workbox.precaching.precacheAndRoute([
  {url: "/", revision: "2"},
  {url: "/index.html", revision: "2"},
  {url: "/detailPlayer.html", revision: "2"},
  {url: "/detailTeam.html", revision: "3"},
  {url: "/manifest.json", revision: "2"},
  {url: "/nav.html", revision: "2"},
  {url: "/push.js", revision: "1"},
  {url: "/css/materialize.min.css", revision: "1"},
  {url: "/js/api.js", revision: "1"},
  {url: "/js/db.js", revision: "2"},
  {url: "/js/helpers.js", revision: "2"},
  {url: "/js/idb.js", revision: "1"},
  {url: "/js/klaasmen.js", revision: "2"},
  {url: "/js/match.js", revision: "2"},
  {url: "/js/materialize.min.js", revision: "1"},
  {url: "/js/myscript.js", revision: "2"},
  {url: "/js/nav.js", revision: "2"},
  {url: "/js/script.js", revision: "2"},
  {url: "/js/teams.js", revision: "2"},
  {url: "/pages/favorites.html", revision: "2"},
  {url: "/pages/home.html", revision: "2"},
  {url: "/pages/klasmen.html", revision: "2"},
], {
ignoreUrlParametersMatching: [/.*/]
});

// cacheFirst
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.plugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// stale while Revalidate
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.StaleWhileRevalidate({
    cacheName: "pages"
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.StaleWhileRevalidate()
)

self.addEventListener("push", event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "images/icons/icon-512x512.png",
    vibrate: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.ServiceWorkerRegistration.showNotification("Push Notification", options)
  );
});

