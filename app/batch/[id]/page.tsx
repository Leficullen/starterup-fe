"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import { GET } from "@/lib/api";

// make an indication of at which point the batch is completed
// batch.latestEvent
// maybe for status rejected?
//latest event should have different styling

interface BatchEvent {
  id: string,
  actor_role: string;
  action: string;
  actor_name: string;
  created_at: string;
}

export default function BatchTimeline() {
  // connect timeline to data
  const [batch, setBatch] = useState<BatchEvent[]>([
      {
        id: '',
        actor_role: "farmer",
        action: "farmer",
        actor_name: "batch.actor_role",
        created_at: "2025-01-14",
      },
      ]
  )
  const [latestEvent, setLatestEvent] = useState()
  const { id } = useParams();  // ← THIS fetches the [id]

  useEffect(() => {
    const fetchData = async () => {
      const res0 = await GET(`/batches/${id}`);
      const data0 = await res0.json()
      const res = await GET(`/batches/${id}/history`);
      const data = await res.json()
      console.log(data)
      console.log(data0)

      setBatch(data.events);
      setLatestEvent(data0.batch.latest_event.id)
    }
    fetchData()
  }, [])  //set batch later 
  

  const [completed, setCompleted] = useState(false)

  //make different status badges (completed state, and )
  //make an event so that when something is completed then the stuff will change the appearance
  //do I need another fetch request for just the batches id for latest event?
  const renderRoleContent = (item: any) => {
    switch (item.actor_role?.toLowerCase()) {
      case "exporter":
        return (
          <>
            <p>Status: {item.payload.metadata?.statusExporter}</p>
            <p>Spec file: {item.payload.metadata?.specName}</p>
          </>
        );

      case "collector":
        return (
          <>
            <p>Weight: {item.payload.metadata?.weight}</p>
            <p>Status: {item.payload.metadata?.statusCollector}</p>
            <p>Photo file: {item.payload.metadata?.photoName}</p>
          </>
        );

      case "processor":
        return (
          <>
            <p>Status: {item.payload.metadata?.statusProcessor}</p>
            <p>Certificate: {item.payload.metadata?.certificateName}</p>
          </>
        );

      default:
        return;
    }
  };



  return (
    <div className="p-6 pt-28 min-h-screen mx-auto bg-[url('/laut_gelap.jpg')] bg-cover text-foreground flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-6 text-background text-center">
        Batch History Tracking
      </h1>

      {/* Container */}
      <div className="bg-background/20 via-primary to-accent backdrop-blur-xl p-6 rounded-2xl shadow-xl w-full max-w-md border border-background/20">
        <div className="flex flex-col items-center space-y-6">
          {batch.slice().reverse().map((item, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              {/* Short separator line */}
              {i > 0 && <div className="w-px h-6 bg-gray-300 mb-2"></div>}

              {/* Card */}
              <Card className={`w-full ${ latestEvent !== item.id ? "bg-background/20" : "bg-primary/80"} border-foreground/20 text-background`}>
                <CardHeader>
                  <CardTitle>{item.actor_role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-foreground/70">{item.actor_name}</p>
                  <p className="text-xs text-foreground/50 mt-2">{new Date(item.created_at).toISOString().split("T")[0]}</p>
                  <div className="mt-3">
                    {renderRoleContent(item)}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
