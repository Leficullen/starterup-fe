import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollectorDashboard() {
  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h1 className="text-2xl font-semibold">Welcome, Collector Arif</h1>
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

      {/* Batch Cards */}
      <Card className="bg-white/10 border-white/20 mb-4">
        <CardHeader>
          <CardTitle>BATCH-2025-001</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>From Farmer: Hasan</p>
          <p>Pond A3 • Harvested Today</p>
          <Link href="/batch/BATCH-2025-001">
            <Button variant="outline" className="w-full mt-3 text-white">
              Record Arrival →
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 mb-4">
        <CardHeader>
          <CardTitle>BATCH-2025-000</CardTitle>
        </CardHeader>
        <CardContent>
          <p>From Farmer: Sari</p>
          <p>Pond B1 • Yesterday</p>
          <Button variant="outline" className="w-full mt-3 text-white">
            View →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
