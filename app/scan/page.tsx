"use client";

import { useEffect, useRef, useState } from "react";
import { GET } from "@/lib/api";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

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

        // Fetch batch details
        try {
          const res = await GET(`/batches/${raw}`);
          const json = await res.json();

          if (!res.ok || !json.batch) {
            showErrorMessage("Batch not found.");
            setIsProcessing(false);
            return;
          }

          const batch = json.batch;

          scanner.stop();
          router.push(`/${role}/qc-report?batchId=${batch.id}`);

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
        onDecodeError: () => {}, // Ignore unstable frames
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Toast Modal */}
      {uiMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`${
              messageType === "success" ? "bg-green-500" : "bg-red-500"
            } rounded-lg shadow-xl px-6 py-5 text-center max-w-sm mx-auto`}
          >
            <p className="text-background text-lg">{uiMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex absolute items-center gap-3 px-4 py-2 mt-20 lg:mt-[6%]">
        <button
          onClick={handleCancel}
          className="flex items-center justify-center h-9 w-9 rounded-full border hover:bg-accent transition"
        >
          ←
        </button>

        <div className="flex flex-col">
          <span className="font-semibold text-sm">Scan Batch</span>
          <span className="text-xs text-muted-foreground">
            {roleLoaded ? `Logged in as ${role}` : "Loading..."}
          </span>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col mt-20 md:mt-40 items-center justify-center px-4 pb-8">
        <div className="relative w-full max-w-md flex flex-col items-center gap-4">
          {/* Camera Box */}
          <div className="relative w-full aspect-3/4 max-w-xs rounded-2xl border-4 border-primary/70 overflow-hidden shadow-lg bg-black/40">
            {error ? (
              <div className="flex items-center justify-center h-full text-red-500 text-sm px-3 text-center">
                {error}
              </div>
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                muted
              />
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-white">
                <div className="h-6 w-6 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
                <span>Processing...</span>
              </div>
            )}
          </div>

          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-full border border-red-500 text-red-600 text-sm hover:bg-red-500/10 transition"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
