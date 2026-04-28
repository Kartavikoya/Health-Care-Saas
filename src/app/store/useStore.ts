import { create } from "zustand";

interface User {
  email: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: string;
}

interface Store {
  user: User | null;
  patients: Patient[];
  setUser: (user: User | null) => void;
  setPatients: (patients: Patient[]) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  patients: [],
  setUser: (user) => set({ user }),
  setPatients: (patients) => set({ patients }),
}));