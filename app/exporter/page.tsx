"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api";

export default function ExporterDashboard() {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMe().then((profile) => {
      if (!profile?.role) return router.push("/");
      if (profile.role.toLowerCase() !== "exporter")
        return router.push(`/${profile.role}`);

      setMe(profile);

      // NGELOAD SCANNED BATCH DARI LOCAL STORAG
      const saved = JSON.parse(
        localStorage.getItem("my_batches_mock-exporter-id") || "[]"
      );
      setBatches(saved);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="text-black text-4xl">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto text-white min-h-screen">
      <h1 className="text-2xl font-semibold">
        Hello, {me?.name || "IndoShrimp Plant"}
      </h1>
      <p className="text-white/60 -mt-2">Role: Exporter</p>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/scan">
          <Button className="h-24 w-full text-lg font-semibold">
            📷 Scan QR
          </Button>
        </Link>
        <Button className="h-24 w-full text-lg" variant="secondary" disabled>
          Export Reports
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Batches to Export</h2>

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
            <p>Processor: {batch.processor_name || "IndoShrimp Plant"}</p>
            <p>Processed: {batch.weight || "175 kg"}</p>
            <p>Status: Ready for Export</p>
            <Link href={`/batch/${batch.id}`}>
              <Button variant="outline" className="w-full mt-3 text-white">
                Export Batch →
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}

      {/* Static example cards if no batches */}
      {batches.length === 0 && (
        <>
          <Card className="bg-white/10 border-white/20 mb-4">
            <CardHeader>
              <CardTitle>BATCH-2025-001</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>Processor: IndoShrimp Plant</p>
              <p>Processed: 175 kg</p>
              <p>Status: Ready for Export</p>
              <Link href="/batch/BATCH-2025-001">
                <Button variant="outline" className="w-full mt-3 text-white">
                  Export Batch →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 mb-4">
            <CardHeader>
              <CardTitle>BATCH-2025-000</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: Exported</p>
              <Button variant="outline" className="w-full mt-3 text-white">
                View Export Details →
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
