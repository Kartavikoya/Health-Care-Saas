import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { useStore } from "../store/useStore";

export function useAuthSession() {
  const setAuthReady = useStore((state) => state.setAuthReady);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "unknown@hospital.example",
          displayName: firebaseUser.displayName ?? "Care Coordinator",
          role: "Operations Lead",
        });
      } else {
        setUser(null);
      }

      setAuthReady(true);
    });

    return unsubscribe;
  }, [setAuthReady, setUser]);
}
