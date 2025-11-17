"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/pantai_cuk.jpg')] bg-cover ">
      <div className="bg-background/20 via-primary to-accent backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full mx-[30%] border border-background/20">
        <h1 className="text-4xl font-semibold text-background mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4 text-xl">
          <Input
            type="email"
            placeholder="Email"
            className="bg-background/20 text-foreground/70 backdrop-blur-2xl"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-background/20 text-foreground/70 backdrop-blur-2xl"
          />

          <Link href="/farmer">
            <Button className="w-full text-xl py-2">Login</Button>
          </Link>

          <p className="text-base text-center text-foreground/70/60 mt-5">
            Didn't have any account?{" "}
            <Link href="/register">
              <span className="text-white hover:text-accent">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
