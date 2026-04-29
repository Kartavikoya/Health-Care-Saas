import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useStore } from "../../store/useStore";

function getAuthErrorMessage(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    switch ((error as { code: string }).code) {
      case "auth/invalid-credential":
        return "The email or password is incorrect.";
      case "auth/invalid-email":
        return "Enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again in a few minutes.";
      default:
        return "Unable to sign in to Firebase right now.";
    }
  }

  return "Unable to sign in to Firebase right now.";
}

export default function Login() {
  const authReady = useStore((state) => state.authReady);
  const user = useStore((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useStore((s) => s.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authReady && user) {
      navigate("/", { replace: true });
    }
  }, [authReady, navigate, user]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Enter both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        password,
      );
      setUser({
        uid: response.user.uid,
        email: response.user.email ?? trimmedEmail,
        displayName: response.user.displayName ?? "Care Coordinator",
        role: "Operations Lead",
      });
      navigate("/", { replace: true });
    } catch (loginError) {
      setError(getAuthErrorMessage(loginError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_40px_120px_-48px_rgba(15,23,42,0.35)] backdrop-blur xl:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white xl:flex xl:flex-col xl:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.25),transparent_32%)]" />
          <div className="relative">
            <h1 className="heading-display mt-6 max-w-lg text-5xl font-bold leading-tight">
              B2B healthcare operations with calm, data-first workflows.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
              Authenticate with Firebase, monitor operational health, review
              analytics, and manage patient details from one responsive
              workspace.
            </p>
          </div>

          <div className="relative grid gap-4 md:grid-cols-3">
            {[
              ["98.2%", "Care plan adherence"],
              ["24m", "Critical alert turnaround"],
              ["42", "Active patient programs"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="heading-display text-3xl font-bold">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <p className="eyebrow">Secure sign in</p>
            <h2 className="heading-display mt-3 text-4xl font-bold text-slate-950">
              Welcome back
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in with a Firebase Authentication account provisioned for
              this project to access the healthcare workspace.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Work email
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  placeholder="care.ops@hospital.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </span>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? "Signing in..." : "Login to workspace"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              Session handling is synchronized with Firebase, and protected
              routes unlock automatically once authentication state is
              restored.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
