"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import { GET } from "@/lib/api";

// make an indication of at which point the batch is completed
// connect the batches data to the completion
// batch.latestEvent
interface BatchEvent {
  actor_role: string;
  action: string;
  actor_name: string;
  created_at: string;
}

export default function BatchTimeline() {
  // connect timeline to data
  const [batch, setBatch] = useState<BatchEvent[]>([
      {
        actor_role: "farmer",
        action: "farmer",
        actor_name: "batch.actor_role",
        created_at: "2025-01-14",
      },
      ]
  )
  const { id } = useParams();  // ← THIS fetches the [id]

  useEffect(() => {
    const fetchData = async () => {
      const res = await GET(`/batches/${id}/history`);
      const data = await res.json()
      console.log(data)

      setBatch(data.events);
    }
    fetchData()
  }, [])  //set batch later 

  useEffect(() => {
    console.log(batch)}
    ,
    [batch] 
  )

  // does GET/batches/id/history use the event id or the batch id, and does it return an array of objects or?

  

  const [completed, setCompleted] = useState(false)

  //make different status badges (completed state, and )
  //make an event so that when something is completed then the stuff will change the appearance
  //do I need another fetch request for just the batches id for latest event?


  return (
    <div className="p-6 pt-28 min-h-screen mx-auto bg-[url('/laut_gelap.jpg')] bg-cover text-foreground flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-6 text-background text-center">
        Batch History Tracking
      </h1>

      {/* Container */}
      <div className="bg-background/20 via-primary to-accent backdrop-blur-xl p-6 rounded-2xl shadow-xl w-full max-w-md border border-background/20">
        <div className="flex flex-col items-center space-y-6">
          {batch.map((item, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              {/* Short separator line */}
              {i > 0 && <div className="w-px h-6 bg-gray-300 mb-2"></div>}

              {/* Card */}
              <Card className="w-full bg-background/20 border-foreground/20 text-background">
                <CardHeader>
                  <CardTitle>{item.actor_role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-foreground/70">{item.actor_name}</p>
                  <p className="text-xs text-foreground/50 mt-2">{item.created_at}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
