"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProcessorQcReportPage() {
    const [receivedAt, setReceivedAt] = useState<string>("");
    const [certFile, setCertFile] = useState<File | null>(null);
    const [certName, setCertName] = useState<string | null>(null);
    const [labFile, setLabFile] = useState<File | null>(null);
    const [labFileName, setLabFileName] = useState<string | null>(null);
    const [labPreview, setLabPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<"in progress" | "accepted" | "rejected">("in progress");
    const [errors, setErrors] = useState<{ receivedAt?: string; cert?: string; labFile?: string }>({});
    const [certPreview, setCertPreview] = useState<string | null>(null);

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
        if (!certFile) {
            setCertPreview(null);
            return;
        }
        // Show preview only for images
        if (certFile.type.startsWith("image/")) {
            const url = URL.createObjectURL(certFile);
            setCertPreview(url);
            return () => {
                URL.revokeObjectURL(url);
                setCertPreview(null);
            };
        }
        setCertPreview(null);
    }, [certFile]);

    function formatDateInput(input: string) {
        const digits = input.replace(/\D/g, "").slice(0, 8);
        const parts: string[] = [];
        if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
        if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
        if (digits.length > 4) parts.push(digits.slice(4));
        return parts.join("/");
    }

    function onCertChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const allowed = ["application/pdf", "image/png", "image/jpeg"];
        if (!allowed.includes(f.type)) {
            setCertFile(null);
            setCertName(null);
            setErrors((s) => ({ ...s, cert: "File harus PDF, JPG, atau PNG" }));
            return;
        }
        setCertFile(f);
        setCertName(f.name);
        setErrors((s) => ({ ...s, cert: undefined }));
    }

    function validateForm() {
        const next: { receivedAt?: string; cert?: string; labFile?: string } = {};
        if (!receivedAt || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(receivedAt)) {
            next.receivedAt = "Waktu penerimaan harus berformat dd/mm/yyyy";
        }
        if (!certFile) next.cert = "Certificate of healthy shrimp harus diunggah (PDF/JPG/PNG)";
        if (!labFile) next.labFile = "Hasil uji laboratorium harus diunggah (PDF/JPG/PNG)";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit() {
        if (!validateForm()) return;
        setErrors({});
        // TODO: send to backend (FormData with file)
        // eslint-disable-next-line no-console
        console.log("Submit processor QC report", { receivedAt, certFile, labFile, status });
    }

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col items-center justify-center text-black">
            <h1 className="text-2xl font-semibold">Laporan QC - Processor</h1>

            <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl w-full">
                <CardHeader>
                    <CardTitle>Informasi Pemeriksaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Waktu penerimaan di fasilitas pemrosesan */}
                    <div>
                        <label className="block text-sm mb-1 text-black">Waktu penerimaan</label>
                        <Input
                            placeholder="dd/mm/yyyy"
                            className="bg-white/20 text-black"
                            value={receivedAt}
                            aria-invalid={errors.receivedAt ? "true" : undefined}
                            onChange={(e) => setReceivedAt(formatDateInput((e.target as HTMLInputElement).value))}
                        />
                        {errors.receivedAt && <div className="text-sm text-destructive mt-1">{errors.receivedAt}</div>}
                    </div>

                    {/* Unggahan certificate of healthy shrimp (PDF/JPG/PNG) */}
                    <div>
                        <label className="block text-sm mb-1 text-black">Certificate of Healthy Shrimp (PDF / JPG / PNG)</label>
                        <input type="file" accept="application/pdf,image/png,image/jpeg" onChange={onCertChange} className="block w-full text-sm text-black" />
                        {errors.cert && <div className="text-sm text-destructive mt-1">{errors.cert}</div>}
                        {certName && <div className="text-sm text-black mt-1">Diunggah: {certName}</div>}
                        {certPreview && <img src={certPreview} alt="cert preview" className="mt-2 max-h-40 object-contain rounded" />}
                    </div>

                    {/* Hasil uji laboratorium (file) */}
                    <div>
                        <label className="block text-sm mb-1 text-black">Hasil uji laboratorium (PDF / JPG / PNG)</label>
                        <input type="file" accept="application/pdf,image/png,image/jpeg" onChange={(e) => {
                            const f = e.target.files && e.target.files[0];
                            if (!f) return;
                            const allowed = ["application/pdf", "image/png", "image/jpeg"];
                            if (!allowed.includes(f.type)) {
                                setLabFile(null);
                                setLabFileName(null);
                                setErrors((s) => ({ ...s, labFile: "File harus PDF, JPG, atau PNG" }));
                                return;
                            }
                            setLabFile(f);
                            setLabFileName(f.name);
                            setErrors((s) => ({ ...s, labFile: undefined }));
                        }} className="block w-full text-sm text-black" />
                        {errors.labFile && <div className="text-sm text-destructive mt-1">{errors.labFile}</div>}
                        {labFileName && <div className="text-sm text-black mt-1">Diunggah: {labFileName}</div>}
                        {labPreview && <img src={labPreview} alt="lab preview" className="mt-2 max-h-40 object-contain rounded" />}
                    </div>

                    {/* Status pemeriksaan */}
                    <div>
                        <label className="block text-sm mb-1 text-black">Status pemeriksaan</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded px-3 py-2 bg-white/10 text-black">
                            <option value="in progress">In progress</option>
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
