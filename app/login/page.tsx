"use client";

import { useState } from "react";
import { POST, GET } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen flex items-center justify-center bg-[url('/pantai_cuk.jpg')] bg-cover ">
      <form
        onSubmit={handleLogin}
        className="w-full md:max-w-md mx-auto max-w-xs bg-background/20 backdrop-blur-2xl p-6 rounded-lg shadow-xl "
      >
        <h1 className="text-3xl font-bold text-center text-background">Login</h1>

        {error && <div className="text-red-500  text-center text-sm">{error}</div>}

        <Input
          type="email"
          placeholder="Email"
          className="ring ring-background mt-3  bg-background/20 px-2 rounded-md w-full mb-3 smooth text-foreground/80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="ring ring-background px-2 bg-background/20 rounded-md w-full mb-4  smooth text-foreground/80"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-background font-semibold w-full py-2 rounded-xl hover:-translate-y-0.5 smooth shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
