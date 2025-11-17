"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ExporterQcReportPage() {
    const [specFile, setSpecFile] = useState<File | null>(null);
    const [specName, setSpecName] = useState<string | null>(null);
    const [receivedAt, setReceivedAt] = useState<string>("");
    const [status, setStatus] = useState<"shipping" | "accepted" | "rejected">("shipping");
    const [errors, setErrors] = useState<{ spec?: string; receivedAt?: string }>({});

    function formatDate(d: Date) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    useEffect(() => {
        setReceivedAt(formatDate(new Date()));
    }, []);

    function formatDateInput(input: string) {
        const digits = input.replace(/\D/g, "").slice(0, 8);
        const parts: string[] = [];
        if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
        if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
        if (digits.length > 4) parts.push(digits.slice(4));
        return parts.join("/");
    }

    function onSpecChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        if (f.type !== "application/pdf") {
            setSpecFile(null);
            setSpecName(null);
            setErrors((s) => ({ ...s, spec: "File harus berformat PDF" }));
            return;
        }
        setSpecFile(f);
        setSpecName(f.name);
        setErrors((s) => ({ ...s, spec: undefined }));
    }

    function validateForm() {
        const next: { spec?: string; receivedAt?: string } = {};
        if (!specFile) next.spec = "Spesifikasi kontainer (PDF) harus diunggah";
        if (!receivedAt || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(receivedAt)) {
            next.receivedAt = "Tanggal penerimaan harus berformat dd/mm/yyyy";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit() {
        if (!validateForm()) return;
        setErrors({});
        // TODO: wire to backend API
        // eslint-disable-next-line no-console
        console.log("Submit exporter QC report", { specFile, receivedAt, status });
    }

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold">Laporan QC - Exporter</h1>

            <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl w-full">
                <CardHeader>
                    <CardTitle>Spesifikasi & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Spesifikasi kontainer (PDF) */}
                    <div>
                        <label className="block text-sm mb-1">Spesifikasi kontainer (PDF)</label>
                        <input type="file" accept="application/pdf" onChange={onSpecChange} className="block w-full text-sm" />
                        {errors.spec && <div className="text-sm text-destructive mt-1">{errors.spec}</div>}
                        {specName && <div className="text-sm mt-1">Diunggah: {specName}</div>}
                    </div>

                    {/* Tanggal penerimaan batch */}
                    <div>
                        <label className="block text-sm mb-1">Tanggal penerimaan batch</label>
                        <Input
                            placeholder="dd/mm/yyyy"
                            className="bg-white/20"
                            value={receivedAt}
                            aria-invalid={errors.receivedAt ? "true" : undefined}
                            onChange={(e) => setReceivedAt(formatDateInput((e.target as HTMLInputElement).value))}
                        />
                        {errors.receivedAt && <div className="text-sm text-destructive mt-1">{errors.receivedAt}</div>}
                    </div>

                    {/* Status akhir batch */}
                    <div>
                        <label className="block text-sm mb-1">Status akhir batch</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded px-4 py-3">
                            <option value="shipping">Shipping</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <Button className="w-full" onClick={handleSubmit}>Kirim Laporan</Button>
                </CardContent>
            </Card>
        </div>
    );
}
