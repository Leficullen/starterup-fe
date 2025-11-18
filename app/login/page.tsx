"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { POST, GET } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Login request sent", { email, password });

    try {
      const response = await POST("/auth/login", { email, password });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", data.token);
      const meRes = await GET("/auth/me");
      const meData = await meRes.json();
      console.log("DATA /auth/me:", meData);

      if (!meRes.ok) {
        setError("Failed to load user role");
        setLoading(false);
        return;
      }

      const role = meData.user.role;

      if (!role) {
        console.error("Role is undefined, cant redirect");
        return;
      }

      router.push(`/${role}`);
    } catch (err: any) {
      setError("Error network has occured");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/pantai_cuk.jpg')] bg-cover ">
      <div className="bg-background/20 via-primary to-accent backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full md:mx-[30%] mx-[10%] border border-background/20">
        <h1 className="text-2xl md:text-4xl font-semibold text-background mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-lg md:text-xl">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/20 text-foreground/70 backdrop-blur-2xl"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background/20 text-foreground/70 backdrop-blur-2xl"
            required
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-md md:text-xl py-1 md:py-2"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm md:text-base text-center text-foreground/70/60 mt-5">
          Didn't have any account?{" "}
          <Link href="/register">
            <span className="text-white hover:text-accent">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
