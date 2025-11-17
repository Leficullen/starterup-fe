"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateBatch() {
  return (
    <div className="p-6 max-w-md mx-auto text-white min-h-screen">
      <h1 className="text-2xl font-semibold">Create New Batch</h1>

      <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Batch Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Pond ID" className="bg-white/20 text-white" />
          <Input
            placeholder="Weight (kg)"
            type="number"
            className="bg-white/20 text-white"
          />
          {/* GENERATE QR */}
          <Button className="w-full">Generate Batch + QR</Button>
        </CardContent>
      </Card>
    </div>
  );
}
