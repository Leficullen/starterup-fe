"use client";

import { useState } from "react";
import { POST, GET } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("📩 Sending login request with:", { email, password });

    try {
      const res = await POST("/auth/login", { email, password });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // 1. Store token
      localStorage.setItem("authToken", data.token);

      // 2. Fetch user role
      const meRes = await GET("/auth/me");
      const meData = await meRes.json();
      console.log("DATA /auth/me:", meData);

      if (!meRes.ok) {
        setError("Failed to load user role");
        setLoading(false);
        return;
      }

      const role = meData.user.role; // e.g. "collector", "farmer", "processor"

      // 3. Redirect to dashboard role
      if (!role) {
        console.error("Role is undefined, can't redirect")
        return;
      }

      router.push(`/${role}`);
    } catch (err: any) {
      setError("Network error: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        {error && <div className="text-red-500 mb-3">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
