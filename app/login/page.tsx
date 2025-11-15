"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-400 to-slate-900">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/20">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          TraceShrimp 🦐
        </h1>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-white/20 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/20 text-white"
          />

          <Link href="/farmer">
            <Button className="w-full">Login</Button>
          </Link>

          <p className="text-sm text-center text-white/60">Forgot password?</p>
        </div>
      </div>
    </div>
  );
}
