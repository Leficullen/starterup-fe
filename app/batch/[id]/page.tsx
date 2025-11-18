"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBatchHistory, getMe } from "@/lib/api";

export default function BatchTimeline() {
  const params = useParams();
  const batchId = params.id as string;
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<any>(null);

  // LOAD USER PROFILE
  useEffect(() => {
    getMe().then((profile) => {
      setMe(profile);

      getBatchHistory(batchId).then((historyRes) => {
        if (historyRes.ok && historyRes.events) {
          // UBAH HISTORY JADI TIMELINE
          const events = historyRes.events.map((event: any) => ({
            stage:
              event.actor_role.charAt(0).toUpperCase() +
              event.actor_role.slice(1),
            detail: event.action,
            actor: event.actor_id,
            date: new Date(event.created_at).toLocaleDateString(),
          }));
          setTimeline(events);
        }
        setLoading(false);
      });
    });
  }, [batchId]);

  if (loading) return <div className="text-black text-4xl">Loading...</div>;

  return (
    <div className="p-6 min-hscreen mx-auto text-foreground">
      <h1 className="text-2xl font-semibold mb-4">Batch History</h1>

      <div className="space-y-4 justify-between items-center flex h-full">
        {/* validate history kosong */}
        {timeline.length === 0 ? (
          <p className="text-foreground/70">No history yet.</p>
        ) : (
          timeline.map((item, i) => (
            <Card key={i} className="bg-foreground/10 border-foreground/20">
              <CardHeader>
                <CardTitle>{item.stage}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* history info (editable nanti) */}
                <p className="font-medium">{item.detail}</p>
                <p className="text-foreground/70">{item.actor}</p>
                <p className="text-xs text-foreground/50 mt-2">
                  {item.date} hai
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
