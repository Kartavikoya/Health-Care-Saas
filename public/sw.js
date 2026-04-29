self.addEventListener("install", () => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  const targetPath = event.notification.data?.targetPath ?? "/patients";
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const targetUrl = new URL(targetPath, self.location.origin).href;

      for (const client of clients) {
        if ("navigate" in client) {
          return client.navigate(targetUrl).then((windowClient) => windowClient?.focus());
        }
      }

      return self.clients.openWindow(targetUrl);
    }),
  );
});
