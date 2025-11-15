import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function BatchTimeline() {
  const timeline = [
    {
      stage: "Farm",
      detail: "Harvested",
      actor: "Farmer Hasan",
      date: "2025-01-14",
    },
    {
      stage: "Collector",
      detail: "Received 180kg",
      actor: "Collector Arif",
      date: "2025-01-15",
    },
    {
      stage: "Processor",
      detail: "Quality check OK",
      actor: "PT IndoShrimp",
      date: "2025-01-16",
    },
    {
      stage: "Exporter",
      detail: "Shipped",
      actor: "SEA Food Export",
      date: "2025-01-17",
    },
  ];

  return (
    <div className="p-6 min-hscreen mx-auto text-foreground">
      <h1 className="text-2xl font-semibold mb-4">Batch History</h1>

      <div className="space-y-4 justify-between items-center flex h-full">
        {timeline.map((item, i) => (
          <Card key={i} className="bg-foreground/10 border-foreground/20">
            <CardHeader>
              <CardTitle>{item.stage}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{item.detail}</p>
              <p className="text-foreground/70">{item.actor}</p>
              <p className="text-xs text-foreground/50 mt-2">{item.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
