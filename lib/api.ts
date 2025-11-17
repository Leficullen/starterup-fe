import { ok } from "assert";
import { METHODS } from "http";

//define API URL
export const API_URL = "https://develop-hackathon-api.224668.xyz/hackathon/v1";

//define function GET
export async function GET(path: string) {
  //define token yang udh didapat dari local storage yahahaaha
  const token = localStorage.getItem("authToken");

  //nge-fetch cuyyy
  return fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function POST(path: string, body: any) {
  const token = localStorage.getItem("authToken");

  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

// LOGIN SECTION
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json().catch(() => null);

    // Persist token if API returns it
    if (res.ok && json && json.token) {
      localStorage.setItem("authToken", json.token);
    }

    return {
      ok: res.ok,
      status: res.status,
      user: json?.user,
      message: json?.message || "Login failed",
    } as any;
  } catch (error) {
    console.error("Login fetch error:", error);
    return { ok: false, status: 0, message: "Network error" };
  }
}

export async function getMe() {
  try {
    const token = localStorage.getItem("authToken");

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.user;
  } catch (error) {
    console.error("getMe fetch error:", error);
    return null;
  }
}
