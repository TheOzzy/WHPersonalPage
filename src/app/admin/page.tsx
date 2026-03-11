"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="container-xxl py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="landing-card" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="landing-section-title text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger p-2 mb-3" style={{ fontSize: "14px" }}>{error}</div>}
          
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, color: "#562F00" }}>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 600, color: "#562F00" }}>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn landing-btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
