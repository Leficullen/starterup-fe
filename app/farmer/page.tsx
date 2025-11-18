"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import FarmerCard from "@/components/ui/farmerCard";
import { useState, useEffect } from "react"
import { GET } from "@/lib/api";

export default function FarmerDashboard() {
  const [batches, setBatches] = useState([{
    created_at: "",
    id: "",
    qr_code: ""
  }])

  useEffect(() => {
    const fetchData = async () => {
      const res = await GET(`/batches`);
      const data = await res.json()
      console.log(data.data)
      setBatches(data.data)
    }
    fetchData()
  }, [])


  return (
    <div className="mx-[5%] my-20 to-accent md:p-[2%] p-[3%] rounded-2xl text-background shadow-lg border-2 mt-30">
      <div className="bg-linear-to-r from-primary to-accent px-[3%] md:px-[1%] py-3 rounded-md">
        <h1 className="text-lg md:text-2xl font-semibold text-background">
          Hello, Pak Hasan
        </h1>
        <p className="text-background">Role: Farmer</p>
      </div>

      <div className="flex gap-4 mt-6 w-full">
        <Link href="/farmer/create-batch" className="w-full">
          <Button className="bg-background shadow-lg border-2 rounded-lg w-full md:w-fit flex text-base md:text-lg text-primary hover:text-background hover:bg-primary font-bold border-primary">
            + Create Batch
          </Button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">Your Batches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((item, i) => (
          <FarmerCard
            key={i}
            batchCode={item.qr_code}
            date={item.created_at}
            location="A3"
            href={`/batch/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
