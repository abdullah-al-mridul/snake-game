import { registerRoute } from "workbox-routing";
import { setCacheNameDetails } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
setCacheNameDetails({
  prefix: "my-web-app",
  suffix: "v1",
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ event }) => event.request.destination === "document",
  ({ event }) => {
    return caches.open("my-web-app").then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request);
      });
    });
  }
);
