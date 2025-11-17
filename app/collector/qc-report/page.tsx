"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function QcReportPage() {
    const [receivedAt, setReceivedAt] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<"in progress" | "accepted" | "rejected">(
        "in progress"
    );
    const [errors, setErrors] = useState<{ receivedAt?: string; weight?: string; photo?: string }>({});

    function formatDate(d: Date) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    useEffect(() => {
        setReceivedAt(formatDate(new Date()));
    }, []);

    useEffect(() => {
        if (!photo) {
            setPhotoPreview(null);
            return;
        }
        const url = URL.createObjectURL(photo);
        setPhotoPreview(url);
        return () => {
            URL.revokeObjectURL(url);
            setPhotoPreview(null);
        };
    }, [photo]);

    function formatDateInput(input: string) {
        const digits = input.replace(/\D/g, "").slice(0, 8);
        const parts: string[] = [];
        if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
        if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
        if (digits.length > 4) parts.push(digits.slice(4));
        return parts.join("/");
    }

    function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files && e.target.files[0];
        if (f) {
            setPhoto(f);
            setErrors((s) => ({ ...s, photo: undefined }));
        }
    }

    function validateForm() {
        const next: { receivedAt?: string; weight?: string; photo?: string } = {};
        if (!receivedAt || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(receivedAt)) {
            next.receivedAt = "Waktu penerimaan harus berformat dd/mm/yyyy";
        }
        if (!weight || Number(weight) <= 0 || Number.isNaN(Number(weight))) {
            next.weight = "Berat harus berupa angka lebih dari 0";
        }
        if (!photo) {
            next.photo = "Foto harus diunggah";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit() {
        if (!validateForm()) return;
        setErrors({});
        // TODO: send to backend
        // eslint-disable-next-line no-console
        console.log("Submit QC report", { receivedAt, weight: Number(weight), status, photo });
    }

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold">Buat Laporan QC</h1>

            <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle>Informasi Penerimaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Waktu penerimaan */}
                    <div>
                        <label className="block text-sm mb-1">Waktu penerimaan</label>
                        <Input
                            placeholder="dd/mm/yyyy"
                            className="bg-white/20"
                            value={receivedAt}
                            aria-invalid={errors.receivedAt ? "true" : undefined}
                            onChange={(e) => setReceivedAt(formatDateInput((e.target as HTMLInputElement).value))}
                        />
                        {errors.receivedAt && <div className="text-sm text-destructive mt-1">{errors.receivedAt}</div>}
                    </div>

                    {/* Berat */}
                    <div>
                        <label className="block text-sm mb-1">Berat (kg)</label>
                        <Input
                            placeholder="Berat dalam kg"
                            type="number"
                            step="any"
                            min={0}
                            className="bg-white/20"
                            value={weight}
                            aria-invalid={errors.weight ? "true" : undefined}
                            onChange={(e) => setWeight((e.target as HTMLInputElement).value)}
                        />
                        {errors.weight && <div className="text-sm text-destructive mt-1">{errors.weight}</div>}
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm mb-1">Foto penerimaan</label>
                        <input type="file" accept="image/*" onChange={onPhotoChange} className="block w-full text-sm text-black/80 border-2 rounded p-3" />
                        {errors.photo && <div className="text-sm text-destructive mt-1">{errors.photo}</div>}
                        {photoPreview && <img src={photoPreview} alt="preview" className="mt-2 max-h-40 object-contain rounded" />}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm mb-1">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded px-4 py-3">
                            <option value="in progress">In progress</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <Button className="w-full" onClick={handleSubmit}>Submit Laporan QC</Button>
                </CardContent>
            </Card>
        </div>
    );
}
