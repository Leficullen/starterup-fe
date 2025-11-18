import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Button } from "./button";

interface FarmerCardProps {
  batchCode: string;
  date: string;
  location: string;
  href: string;
}

export default function FarmerCard({
  batchCode,
  date,
  location,
  href,
}: FarmerCardProps) {
  return (
    <Card className="bg-white md:w-full border-zinc-400/40 border-4 hover:border-primary/50 smooth">
      <CardHeader>
        <CardTitle>BATCH ID: {batchCode}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p>Pond Location: {location}</p>
        <p>Harvest Date: {date}</p>
        <Link href={href}>
          <Button className="w-full mt-3 ring-primary ring-2">
            View Details →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
