import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/AppShell";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashbaord";
import Analytics from "../features/analytics/Analytics";
import Patients from "../features/patients/Patients";
import { useAuthSession } from "../hooks/useAuthSession";
import { useStore } from "../store/useStore";

function AppGate() {
  const authReady = useStore((state) => state.authReady);
  const user = useStore((state) => state.user);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="surface-panel w-full max-w-md p-8 text-center">
          <p className="eyebrow">Launching workspace</p>
          <h1 className="heading-display mt-3 text-3xl font-bold text-slate-950">
            Syncing your care operations session
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Checking Firebase authentication state and restoring your
            workspace.
          </p>
        </div>
      </div>
    );
  }

  return user ? <AppShell /> : <Navigate to="/login" replace />;
}

function LoginGate() {
  const authReady = useStore((state) => state.authReady);
  const user = useStore((state) => state.user);

  if (!authReady) {
    return null;
  }

  return user ? <Navigate to="/" replace /> : <Login />;
}

export default function AppRoutes() {
  useAuthSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginGate />} />
        <Route element={<AppGate />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patients" element={<Patients />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
