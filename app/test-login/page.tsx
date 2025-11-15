"use client";
import { useState } from "react";

export default function TestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin() {
    const res = await fetch(
      "https://develop-hackathon-api.224668.xyz/hackathon/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    localStorage.setItem("authToken", data.token);
    alert("Token disimpan! Anda bisa test API.");
  }

  return (
    <div className="mt-50 p-6">
      <h1 className="font-bold text-xl">Test Login Sementara</h1>

      <input
        type="email"
        className="border p-2 mt-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mt-2"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={doLogin}
        className="bg-blue-500 text-white p-2 mt-3 rounded"
      >
        Login Sementara
      </button>
    </div>
  );
}
