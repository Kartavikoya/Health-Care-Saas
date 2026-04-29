import { create } from "zustand";
import {
  departmentLoad,
  mockPatients,
  monthlyAdmissions,
  starterNotifications,
} from "../data/mockData";
import type {
  AnalyticsPoint,
  DepartmentLoad,
  NotificationItem,
  NotificationPermissionState,
  Patient,
  PatientViewMode,
  UserSession,
} from "../types/models";

interface Store {
  authReady: boolean;
  user: UserSession | null;
  patients: Patient[];
  selectedPatientId: string;
  patientView: PatientViewMode;
  notificationPermission: NotificationPermissionState;
  notifications: NotificationItem[];
  analytics: AnalyticsPoint[];
  departmentLoad: DepartmentLoad[];
  setAuthReady: (authReady: boolean) => void;
  setUser: (user: UserSession | null) => void;
  setPatients: (patients: Patient[]) => void;
  selectPatient: (patientId: string) => void;
  setPatientView: (view: PatientViewMode) => void;
  setNotificationPermission: (
    permission: NotificationPermissionState,
  ) => void;
  addNotification: (notification: NotificationItem) => void;
}

export const useStore = create<Store>((set) => ({
  authReady: false,
  user: null,
  patients: mockPatients,
  selectedPatientId: mockPatients[0]?.id ?? "",
  patientView: "grid",
  notificationPermission:
    typeof Notification === "undefined" ? "unsupported" : Notification.permission,
  notifications: starterNotifications,
  analytics: monthlyAdmissions,
  departmentLoad,
  setAuthReady: (authReady) => set({ authReady }),
  setUser: (user) => set({ user }),
  setPatients: (patients) =>
    set((state) => ({
      patients,
      selectedPatientId: patients.some(
        (patient) => patient.id === state.selectedPatientId,
      )
        ? state.selectedPatientId
        : (patients[0]?.id ?? ""),
    })),
  selectPatient: (selectedPatientId) => set({ selectedPatientId }),
  setPatientView: (patientView) => set({ patientView }),
  setNotificationPermission: (notificationPermission) =>
    set({ notificationPermission }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 5),
    })),
}));
