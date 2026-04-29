export type PatientStatus = "Critical" | "Stable" | "Recovering";
export type PatientRisk = "High" | "Medium" | "Low";
export type PatientViewMode = "grid" | "list";
export type NotificationPermissionState =
  | NotificationPermission
  | "unsupported";

export interface UserSession {
  uid: string;
  email: string;
  displayName: string;
  role: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: PatientStatus;
  room: string;
  physician: string;
  riskLevel: PatientRisk;
  adherence: number;
  nextAppointment: string;
  lastVisit: string;
}

export interface AnalyticsPoint {
  month: string;
  admissions: number;
  discharges: number;
  satisfaction: number;
}

export interface DepartmentLoad {
  name: string;
  utilization: number;
  target: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  targetPath: string;
}
