"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollectorDashboard() {
  const [batches, setBatches] = useState<any[]>([]);

  // Load scanned batches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my_batches") || "[]");
    setBatches(saved);
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Welcome, Collector Arif</h1>
      <p className="text-white/60 -mt-2">Role: Collector</p>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/scan   ">
          {" "}
          {/* ← penting: pastikan route benar */}
          <Button className="h-24 w-full text-lg font-semibold">
            📷 Scan QR
          </Button>
        </Link>

        <Button variant="secondary" className="h-24 w-full text-lg" disabled>
          Received List
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Incoming Batches</h2>

      {/* If no batches */}
      {batches.length === 0 && (
        <p className="text-white/50 mt-2">
          Belum ada batch yang discan. Silakan scan batch QR → 📷
        </p>
      )}

      {/* Dynamic batch cards */}
      {batches.map((batch) => (
        <Card className="bg-white/10 border-white/20 mb-4" key={batch.id}>
          <CardHeader>
            <CardTitle>{batch.id}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            <p>From Farmer: {batch.farmer_name || "Unknown"}</p>
            <p>
              Pond {batch.pond_id || "-"} • Harvest Date:{" "}
              {batch.harvest_date
                ? new Date(batch.harvest_date).toLocaleDateString()
                : "-"}
            </p>

            <Link href={`/batch/${batch.id}`}>
              <Button variant="outline" className="w-full mt-3 text-white">
                Record Arrival →
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
