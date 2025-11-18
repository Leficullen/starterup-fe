"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, getBatches } from "@/lib/api";
import FarmerCard from "@/components/ui/farmerCard";
import { GET } from "@/lib/api";

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const profile = await getMe();
      if (!profile?.role) return router.push("/");
      if (profile.role.toLowerCase() !== "farmer")
        return router.push(`/${profile.role}`);

      setMe(profile);

      const resp = await getBatches({ farmer_id: profile.id });
      if (resp.ok && resp.data) setBatches(resp.data);

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) return <div className="text-black texl-4xl">Loading...</div>;

  return (
    <div className="mx-[5%] my-20 to-accent md:p-[2%] p-[3%] rounded-2xl text-background shadow-lg border-2 mt-30">
      <div className="bg-linear-to-r from-primary to-accent px-[3%] md:px-[1%] py-3 rounded-md">
        <h1 className="text-lg md:text-2xl font-semibold text-background">
          {/* testing email */}
          Hello, Pak Hasan {me?.email}
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

      <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">
        Your Batches
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.length === 0 ? (
          <p className="text-foreground/70">
            No batches yet. Create your first batch!
          </p>
        ) : (
          batches.map((batch) => (
            <FarmerCard
              key={batch.id}
              batchCode={batch.qr_code}
              date={new Date(batch.catch_time).toLocaleDateString()}
              location={batch.metadata?.pond_id || "Unknown"}
              href={`/batch/${batch.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
