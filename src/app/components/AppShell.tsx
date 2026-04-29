import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import StatusBadge from "./StatusBadge";
import { auth } from "../services/firebase";
import { useNotificationCenter } from "../hooks/useNotificationCenter";
import { useStore } from "../store/useStore";
import logo from "../../assets/logo.png";

const navigation = [
  { label: "Dashboard", path: "/" },
  { label: "Analytics", path: "/analytics" },
  { label: "Patient Details", path: "/patients" },
];

const pageTitles: Record<string, string> = {
  "/": "Operational command center",
  "/analytics": "Performance analytics",
  "/patients": "Patient details workspace",
};

export default function AppShell() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = useStore((state) => state.user);
  const notifications = useStore((state) => state.notifications);
  const { notificationPermission, requestPermission } = useNotificationCenter();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "OPEN_ROUTE" && event.data.targetPath) {
        navigate(event.data.targetPath);
      }
    };

    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);

    return () => {
      navigator.serviceWorker?.removeEventListener(
        "message",
        handleServiceWorkerMessage,
      );
    };
  }, [navigate]);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-white/50 bg-slate-950 px-6 py-8 text-white lg:border-b-0 lg:border-r lg:border-slate-800">
        <div className="flex items-center justify-between lg:block">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-6 w-6" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-300" style={{ marginLeft: "0.5rem" }}>
              Healthify
            </span>
          </div>
        </div>

        <nav className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-lg"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 hidden rounded-3xl border border-white/10 bg-white/5 p-5 lg:block">
          <p className="text-sm font-semibold text-white">Today&apos;s focus</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Prioritize ICU handoffs, medication adherence follow-ups, and the
            post-surgery recovery queue before afternoon discharge review.
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200/70 px-6 py-5 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Healthcare operations workspace</p>
              <h2 className="heading-display mt-2 text-3xl font-bold text-slate-950">
                {pageTitles[location.pathname] ?? "Care operations"}
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={requestPermission}
                className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
              >
                {notificationPermission === "granted"
                  ? "Notifications enabled"
                  : "Enable notifications"}
              </button>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Signed in
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {user?.displayName}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSigningOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>
        </header>

        <div className="border-b border-slate-200/70 px-6 py-4 lg:px-8">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <StatusBadge
                label={`${notifications.length} recent alerts`}
                tone="info"
              />
              <p className="text-sm text-slate-500">
                Service worker notifications open directly into the patient
                workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {notifications.slice(0, 2).map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => navigate(notification.targetPath)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50"
                >
                  {notification.createdAt} - {notification.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
