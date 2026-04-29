import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashbaord";
import Analytics from "../features/analytics/Analytics";
import Patients from "../features/patients/Patients";
import { useStore } from "../store/useStore";

function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useStore((s) => s.user);
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
