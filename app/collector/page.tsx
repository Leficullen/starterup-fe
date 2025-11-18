"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api";

export default function CollectorDashboard() {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMe().then((profile) => {
      if (!profile?.role) return router.push("/");
      if (profile.role.toLowerCase() !== "collector")
        return router.push(`/${profile.role}`);

      setMe(profile);

      // LOAD SCANNED BATCH DARI LOCAL STORAGE
      const saved = JSON.parse(
        localStorage.getItem("my_batches_mock-collector-id") || "[]"
      );
      setBatches(saved);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="text-black text-4xl">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h1 className="text-2xl font-semibold">
        Welcome, Collector {me?.name || "Arif"}
      </h1>
      <p className="text-white/60 -mt-2">Role: Collector</p>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/scan">
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
            <CardTitle>{batch.qr_code}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            <p>From Farmer: {batch.farmer_name || "Unknown"}</p>
            <p>
              Pond {batch.metadata?.pond_id || "-"} • Harvest Date:{" "}
              {batch.catch_time
                ? new Date(batch.catch_time).toLocaleDateString()
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
