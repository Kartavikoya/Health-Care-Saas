import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useStore } from "../../store/useStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: res.user.email! });
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
