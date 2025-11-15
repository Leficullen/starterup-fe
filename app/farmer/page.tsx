import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FarmerDashboard() {
  return (
    <div className="mx-30 my-20 to-accent p-10 rounded-2xl text-background shadow-lg border-2 mt-30">
      <div className="bg-linear-to-r from-primary to-accent px-5 py-3 rounded-md">
        <h1 className="text-2xl font-semibold text-background">
          Hello, Pak Hasan
        </h1>
        <p className="text-background">Role: Farmer</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/farmer/create-batch">
          <Button className="bg-background shadow-lg  border-2 rounded-lg w-fit px-[20%] text-lg text-primary hover:text-background hover:bg-primary font-bold border-primary ">
            + Create Batch
          </Button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">Your Batches</h2>

      <Card className="bg-white w-[30%] border-zinc-400/40 border-4 mb-4 hover:border-primary/50 smooth">
        <CardHeader>
          <CardTitle>BATCH-2025-001</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>Pond: A3</p>
          <p>Weight: 180 kg</p>
          <Link href="/batch/BATCH-2025-001">
            <Button className="w-full mt-3 ">
              View Details →
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
