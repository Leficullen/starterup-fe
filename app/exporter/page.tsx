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
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const profile = await getMe();
        if (!isMounted) return;
        if (!profile || !profile.role) {
          router.push("/");
          return;
        }

        const role = (profile.role || "").toLowerCase();
        if (role !== "exporter") {
          const dest = role === "exporter" ? "/exporter" : `/${role}`;
          router.push(dest);
          return;
        }
        setMe(profile);
        setLoading(false);
      } catch (error) {
        console.error("Error loading profile:", error);
        router.push("/");
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return <div className="text-black text-4xl">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Hello, IndoShrimp Plant</h1>
      <p className="mt-2">Role: Processing Facility</p>

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

      {/* Card */}
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
    </div>
  );
}
