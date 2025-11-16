import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type FarmerCardProps = {
    batchCode?: string;
    location?: string;
    date?: string | number;
    href?: string;
};

export default function FarmerCard({
    batchCode = "BATCH-2025-001",
    location = "A3",
    date = "16/11/2025",
    href = "/batch/BATCH-2025-001",
}: FarmerCardProps) {
    return (
        <Card className="bg-white border-zinc-400/40 border-2 mb-4 hover:border-primary/50 smooth">
            <CardHeader>
                <CardTitle>{batchCode}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <p>Date: {date}</p>
                <p>Location: {location}</p>
                <Link href={href}>
                    <Button className="w-full mt-3 ring-primary ring-2">View Details →</Button>
                </Link>
            </CardContent>
        </Card>
    );
}