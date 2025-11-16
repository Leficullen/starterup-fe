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
    <div className="p-6 pt-28  min-h-screen mx-auto bg-[url('/laut_gelap.jpg')] bg-cover text-foreground flex flex-col items-center">  
      <h1 className="text-3xl font-semibold mb-4 text-background text-center">Batch History Tracking</h1>
      <div className="bg-background/20 via-primary to-accent backdrop-blur-xl p-8 rounded-2xl shadow-xl w-2/3  border border-background/20">
        <div className="space-y-4 items-center flex flex-col">
          {timeline.map((item, i) => (
            <div className="w-2/3">
              <div className="mb-4 ml-25 w-px h-10 bg-gray-300"></div>
              <div className="flex flex-row gap-4">
                <div className="pt-2 w-1/10 h-1/10">
                  <img src="/icon_grey.png" />
                </div>
                <Card key={i} className="w-full bg-background/20 border-foreground/20 text-background">
                  <CardHeader>
                    <CardTitle>{item.stage}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{item.detail}</p>
                    <p className="text-foreground/70">{item.actor}</p>
                    <p className="text-xs text-foreground/50 mt-2">{item.date}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
