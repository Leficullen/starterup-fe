import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Batch = {
  batchId: string;
  id: string;
  batchCode: string;
  createdAt?: string;
  location?: string;
  qc?: any;
};



export default function FarmerCard({ batch }: { batch: Batch }) {
  return (
    <Card className="bg-white border-zinc-400/40 border-2 mb-4 hover:border-primary/50 smooth">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-zinc-900">
          {batch.batchCode ?? batch.batchId ?? "No Code"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        <p>Date: {batch.createdAt || "Unknown"}</p>
        <p>Location: {batch.location || "Unknown"}</p>

        <Link href={`/farmer/batch/${batch.id}`}>
          <Button className="w-full mt-3 ring-primary ring-2">
            View Details →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
