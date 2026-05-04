import { useState } from "react";
import { supabase } from "../supabase";

const Auth = ({ setUser, setToast, setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      setToast({ type: "error", message: "Enter email and password" });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToast({
        type: "error",
        message: error.message,
      });
      return;
    }

    setUser(data.user);
    setToast({ type: "success", message: "Login successful" });

    // 🔥 REDIRECT
    setPage("app");
  };

  // ✅ SIGNUP
  const handleSignup = async () => {
    if (!email || !password) {
      setToast({ type: "error", message: "Enter email and password" });
      return;
    }

    if (loading) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setToast({
      type: "success",
      message: "Check your email to verify",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1ea]">
      <div className="bg-[#f7f3ed] p-10 rounded-2xl w-80">

        <h2 className="text-xl mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded mb-3"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full border py-2 rounded"
        >
          {loading ? "Sending..." : "Sign Up"}
        </button>

      </div>
    </div>
  );
};

export default Auth;