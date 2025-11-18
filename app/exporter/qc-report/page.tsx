"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GET, PATCH } from "@/lib/api";

// Komponen anak yang menggunakan useSearchParams() dan logika lainnya
function ExporterQcReportContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [batchId, setBatchId] = useState<string>("");
  const [specFile, setSpecFile] = useState<File | null>(null);
  const [specName, setSpecName] = useState<string | null>(null);
  const [receivedAt, setReceivedAt] = useState<string>("");
  const [status, setStatus] = useState<"accepted" | "rejected">("accepted");
  const [errors, setErrors] = useState<{
    batchId?: string;
    spec?: string;
    receivedAt?: string;
  }>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  function formatDate(d: Date) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  // TODO: Batchid
  useEffect(() => {
    setReceivedAt(formatDate(new Date()));
    const id = searchParams?.get?.("batchId");
    if (id) setBatchId(id);
  }, [searchParams]); // Tambahkan searchParams sebagai dependency

  function formatDateInput(input: string) {
    const digits = input.replace(/\D/g, "").slice(0, 8);
    const parts: string[] = [];
    if (digits.length > 0)
      parts.push(digits.slice(0, Math.min(2, digits.length)));
    if (digits.length > 2)
      parts.push(digits.slice(2, Math.min(4, digits.length)));
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
    setErrors((s) => ({ ...s, spec: undefined })); // Perbaiki: set ke undefined jika valid
  }

  function validateForm() {
    const next: { batchId?: string; spec?: string; receivedAt?: string } = {};
    if (!batchId) next.batchId = "Batch ID diperlukan untuk men-submit";
    if (!specFile) next.spec = "Spesifikasi kontainer (PDF) harus diunggah";
    if (!receivedAt || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(receivedAt)) {
      next.receivedAt = "Tanggal penerimaan harus berformat dd/mm/yyyy";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setSubmitMessage(null);
    if (!validateForm()) return;
    setErrors({});

    // Explicit metadata shape for exporter
    type ExporterMetadata = {
      receivedAtExporter: string;
      statusExporter: "accepted" | "rejected";
      specName?: string;
    };

    const metadata: ExporterMetadata = {
      receivedAtExporter: receivedAt,
      statusExporter: status,
    };
    if (specName) metadata.specName = specName;

    // debug log payload
    // eslint-disable-next-line no-console
    console.log("Sending exporter metadata:", metadata);

    try {
      const res = await PATCH(`/batches/${batchId}`, { metadata });
      // try to parse returned JSON and log resulting metadata
      let parsed: any = null;
      try {
        parsed = await res.json();
      } catch (e) {
        // non-json response
      }

      const newMetadata = parsed?.batch?.metadata ?? parsed?.metadata ?? null;
      // show success and log the new metadata
      setSubmitMessage("Metadata appended successfully.");
      // eslint-disable-next-line no-console
      console.log("New metadata after PATCH:", newMetadata ?? parsed ?? res); // ! DEBUG
      router.push("/exporter");
    } catch (err: any) {
      setSubmitMessage(err?.message || "Submit failed");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Laporan QC - Exporter</h1>

      <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl w-full">
        <CardHeader>
          <CardTitle>Spesifikasi & Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Batch ID (read from ?batchId= or enter manually) */}
          <div>
            <label className="block text-sm mb-1">Batch ID</label>
            <Input
              disabled
              placeholder="Batch ID (or provide ?batchId= in URL)"
              value={batchId}
              onChange={(e) => setBatchId((e.target as HTMLInputElement).value)}
            />
            {errors.batchId && (
              <div className="text-sm text-destructive mt-1">
                {errors.batchId}
              </div>
            )}
          </div>
          {/* Spesifikasi kontainer (PDF) */}
          <div>
            <label className="block text-sm mb-1">
              Spesifikasi kontainer (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={onSpecChange}
              className="block w-full text-sm"
            />
            {errors.spec && (
              <div className="text-sm text-destructive mt-1">{errors.spec}</div>
            )}
            {specName && (
              <div className="text-sm mt-1">Diunggah: {specName}</div>
            )}
          </div>

          {/* Tanggal penerimaan batch */}
          <div>
            <label className="block text-sm mb-1">
              Tanggal penerimaan batch
            </label>
            <Input
              placeholder="dd/mm/yyyy"
              className="bg-white/20"
              value={receivedAt}
              aria-invalid={errors.receivedAt ? "true" : undefined}
              onChange={(e) =>
                setReceivedAt(
                  formatDateInput((e.target as HTMLInputElement).value)
                )
              }
            />
            {errors.receivedAt && (
              <div className="text-sm text-destructive mt-1">
                {errors.receivedAt}
              </div>
            )}
          </div>

          {/* Status akhir batch */}
          <div>
            <label className="block text-sm mb-1">Status akhir batch</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full rounded px-4 py-3"
            >
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {submitMessage && <div className="text-sm mt-2">{submitMessage}</div>}

          <Button className="w-full" onClick={handleSubmit}>
            Kirim Laporan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExporterQcReportPage() {
  return (
    <Suspense fallback={<div className="text-black text-4xl">Loading...</div>}>
      <ExporterQcReportContent />
    </Suspense>
  );
}
