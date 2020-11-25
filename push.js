var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BKJ7oS0isKOAfG_UTi6WUVKtPU-Fc-q-5M8N-jk41KZb0wncpBcBTyHTzw4GpaJt6A-LIMN0Zr523-_Z9D6336w",
    "privateKey": "66i89iIs-Meru6GbRQWomE79KDVUPb8f67H0cLhvrus"
};

webPush.setVapidDetails(
    "mail:saputrahari99@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eXNoFWd0KrQ:APA91bEJ8vp5RXKIb2uJ6vicYAhTSqMYoM62eRPrHCo8Lk8X0Gr2aW9YxaMgaInVzNE6BYQhltDk8uu2U-KAMLV-DeE05bpJ4Jpf9ojnwu2FwoFhkz5CjO7fkftSzA89VpKoFMWU-B_f",
    "keys": {
        "p256dh": "BHTpCBeTgHabzlcaSQdcU2yHIqoGEBAFbeEt30ede9SpbXWrWJEW+5DAFJD/q2qNEsWB6gxvp00/svOvAH2iT3Y=",
        "auth": "Mc7Pm41FIhJUhDDtE1Pk8Q=="
    }
};

var payload = "Selamat! Aplikasi Anda telah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "859617731550",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);