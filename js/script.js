/* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("[ServiceWorker] Service Worker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("[registerServiceWorker] Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(err) {
            console.error("[registerServiceWorker] Registrasi Service Worker gagal.", err);
        });
}


function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("[requestPermission] Notifikasi tidak diizinkan!");
                return;
            }
            else if (result === "default") {
                console.error("[requestPermission] Pengguna menutup kotak dialog Notifikasi!");
                return;
            }

            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BKJ7oS0isKOAfG_UTi6WUVKtPU-Fc-q-5M8N-jk41KZb0wncpBcBTyHTzw4GpaJt6A-LIMN0Zr523-_Z9D6336w")
                    }).then(function(subscribe) {
                        console.log("[requestPermission] Berhasil melakukan subscribe");
                        console.log("[Endpoint]: ", subscribe.endpoint);
                        console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("[requestPermission] Tidak dapat melakukan subscribe", e.message);
                    })
                })
            }
        });
    }
}

function showNotificationBadge() {
  const title = 'Badge';
  const options = {
    'badge': '/images/badge/1.png'
  };
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error('fitur notifikasi tidak diizinkan!');
  }
}