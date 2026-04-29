import { useEffect } from "react";
import { useStore } from "../store/useStore";

interface LocalNotificationInput {
  title: string;
  body: string;
  targetPath?: string;
}

export function useNotificationCenter() {
  const notificationPermission = useStore(
    (state) => state.notificationPermission,
  );
  const addNotification = useStore((state) => state.addNotification);
  const setNotificationPermission = useStore(
    (state) => state.setNotificationPermission,
  );

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setNotificationPermission("unsupported");
      return;
    }

    setNotificationPermission(Notification.permission);
  }, [setNotificationPermission]);

  const requestPermission = async () => {
    if (typeof Notification === "undefined") {
      setNotificationPermission("unsupported");
      return "unsupported" as const;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    return permission;
  };

  const sendLocalNotification = async ({
    title,
    body,
    targetPath = "/patients",
  }: LocalNotificationInput) => {
    const resolvedPermission =
      notificationPermission === "granted"
        ? "granted"
        : await requestPermission();

    if (resolvedPermission !== "granted") {
      return {
        ok: false,
        message:
          resolvedPermission === "denied"
            ? "Notification permission was denied by the browser."
            : "Notifications are not supported in this browser.",
      };
    }

    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: "care-team-alert",
      data: { targetPath },
    });

    addNotification({
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      targetPath,
    });

    return {
      ok: true,
      message: "Notification sent to the care team workstation.",
    };
  };

  return {
    notificationPermission,
    requestPermission,
    sendLocalNotification,
  };
}
