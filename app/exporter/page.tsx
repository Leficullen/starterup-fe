import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProcessorDashboard() {
  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h1 className="text-2xl font-semibold">Hello, IndoShrimp Plant</h1>
      <p className="text-white/60 -mt-2">Role: Processing Facility</p>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/scan">
          <Button className="h-24 w-full text-lg font-semibold">
            📷 Scan QR
          </Button>
        </Link>
        <Button className="h-24 w-full text-lg" variant="secondary" disabled>
          QC Reports
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Batches to Process</h2>

      {/* Card */}
      <Card className="bg-white/10 border-white/20 mb-4">
        <CardHeader>
          <CardTitle>BATCH-2025-001</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>Collector: Arif</p>
          <p>Received: 178 kg</p>
          <p>Status: Ready for QC</p>
          <Link href="/batch/BATCH-2025-001">
            <Button variant="outline" className="w-full mt-3 text-white">
              Add QC Result →
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 mb-4">
        <CardHeader>
          <CardTitle>BATCH-2025-000</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Status: QC Completed</p>
          <Button variant="outline" className="w-full mt-3 text-white">
            View QC →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
