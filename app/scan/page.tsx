"use client";

import { useEffect, useRef, useState } from "react";
import { GET } from "@/lib/api";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  // User session info
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);

  // Scanner logic states
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI toast message
  const [uiMessage, setUiMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const router = useRouter();

  // Load logged-in user before enabling scanner
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await GET("/auth/me");
        const data = await res.json();

        if (!res.ok || !data.user?.role || !data.user?.id) {
          router.push("/login");
          return;
        }

        setRole(data.user.role);
        setUserId(data.user.id);
        setRoleLoaded(true);
      } catch {
        router.push("/login");
      }
    }

    fetchRole();
  }, [router]);

  // Generate per-user localStorage key
  function localKey() {
    return `my_batches_${userId}`;
  }

  // Initialize QR Scanner after role & user loaded
  useEffect(() => {
    if (!roleLoaded || !userId) return;
    if (!videoRef.current || scannerRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      async (qr) => {
        if (isProcessing) return;
        setIsProcessing(true);

        // Clean incoming QR text
        let raw = qr.data.trim();

        // Handle QuickChart format (...text=xxx)
        if (raw.includes("text=")) raw = raw.split("text=")[1];

        // Validate UUID format
        const uuidRegex =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        if (!uuidRegex.test(raw)) {
          showErrorMessage("Invalid Batch ID.");
          setIsProcessing(false);
          return;
        }

        // Fetch batch details from mock data
        try {
          const { getBatch, addBatchHistory } = await import("@/lib/api");
          const res = await getBatch(raw);

          if (!res.ok || !res.data) {
            showErrorMessage("Batch not found.");
            setIsProcessing(false);
            return;
          }

          const batch = res.data;


          scanner.stop();
          router.push(`/${role}/qc-report?batchId=${batch.id}`);

          // DUMMY HISTORY INFORMATION (ONLY RECEIVED FOR NOW)
          await addBatchHistory(batch.id, "Received batch", role!, userId!);

          showSuccessMessage("Batch added successfully.");

          scanner.stop();
          scannerRef.current = null;
          router.push(`/${role}/qc-report?batchId=${batch.id}`);
        } catch (err: any) {
          showErrorMessage("Network error: " + err.message);
        }

        setIsProcessing(false);
      },
      {
        highlightScanRegion: true,
        onDecodeError: () => { }, // Ignore unstable frames
      }
    );

    scanner.start().catch((err) => {
      setError("Camera error: " + err.message);
    });

    scannerRef.current = scanner;

    // Cleanup on unmount
    return () => {
      scannerRef.current?.stop();
      scannerRef.current = null;
    };
  }, [roleLoaded, role, userId, isProcessing]);

  // Cancel button
  function handleCancel() {
    scannerRef.current?.stop();
    router.push(role ? `/${role}` : "/");
  }

  // Toast message helpers
  function showSuccessMessage(msg: string) {
    setMessageType("success");
    setUiMessage(msg);
    setTimeout(() => setUiMessage(null), 3000);
  }

  function showErrorMessage(msg: string) {
    setMessageType("error");
    setUiMessage(msg);
    setTimeout(() => setUiMessage(null), 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Scan Batch QR</h1>

      <div className="w-64 h-64 rounded-2xl border-4 border-white/30 flex items-center justify-center bg-white/10">
        📷 Camera Preview
      </div>

      <Button className="w-64 mt-6">Start Scanning</Button>
    </div>
  );
}
