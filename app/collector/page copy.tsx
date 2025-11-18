"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FarmerCard from "@/components/ui/farmerCard";
import { GET } from "@/lib/api";

export default function FarmerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function localKey(userId: string) {
    return `my_batches_${userId}`;
  }

  useEffect(() => {
    async function load() {
      try {
        // Load user session
        const res = await GET("/auth/me");
        const data = await res.json();

        if (!res.ok) return;

        setUser(data.user);

        // Load user's batches
        const saved = JSON.parse(
          localStorage.getItem(localKey(data.user.id)) || "[]"
        );

        setBatches(saved);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="mx-[5%] my-20 md:p-[2%] p-[3%] rounded-2xl text-background shadow-lg border-2">
      <div className="bg-linear-to-r from-primary to-accent px-[3%] md:px-[1%] py-3 rounded-md">
        <h1 className="text-lg md:text-2xl font-semibold text-background">
          Hello, {user.name}
        </h1>
        <p className="text-background">Role: {user.role}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6 w-full">
        <Link href="/scan" className="w-full">
          <Button className="bg-background shadow-lg border-2 rounded-lg w-full md:w-fit text-base md:text-lg text-primary hover:text-background hover:bg-primary font-bold border-primary">
            Scan QR Code
          </Button>
        </Link>
      </div>

      {/* Listing Batches */}
      <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">
        Your Batches
      </h2>

      {batches.length === 0 && (
        <p className="text-sm text-muted-foreground">No batches yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch, i) => (
          <FarmerCard key={i} batch={batch} />
        ))}
      </div>
    </div>
  );
}
