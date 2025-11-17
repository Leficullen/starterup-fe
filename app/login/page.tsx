"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin, getMe } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await userLogin({ email, password });
    if (res.ok && res.user && res.user.role) {
      const role = res.user.role.toLowerCase();
      const dest = role === "exporter" ? "/exporter" : `/${role}`;
      router.push(dest);
    } else {
      setError(res.message || "Login failed");
    }
    setLoading(false);
  };

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
