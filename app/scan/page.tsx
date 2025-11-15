"use client";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Scan Batch QR</h1>

      <div className="w-64 h-64 rounded-2xl border-4 border-white/30 flex items-center justify-center bg-white/10">
        📷 Camera Preview
      </div>

      <Button className="w-64 mt-6">Start Scanning</Button>
    </div>
  );
}
