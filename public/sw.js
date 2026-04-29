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
    (async () => {
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      const targetUrl = new URL(targetPath, self.location.origin).href;
      const appClient = clients.find((client) =>
        client.url.startsWith(self.location.origin),
      );

      if (appClient) {
        if ("navigate" in appClient) {
          await appClient.navigate(targetUrl);
        }

        appClient.postMessage({
          type: "OPEN_ROUTE",
          targetPath,
        });

        if ("focus" in appClient) {
          await appClient.focus();
        }

        return;
      }

      await self.clients.openWindow(targetUrl);
    })(),
  );
});
