"use client";

import { useEffect, useRef, useState } from "react";
import { GET } from "@/lib/api";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<any>(null);

  const router = useRouter(); // <— ini baru

  //fetch role utk redirect anzay
  useEffect (() =>{
    async function fetchRole() {
      try {
        const res = await GET("/auth/me")
        const data = await res.json();
        setRole(data.role)
      } catch (err) {
        console.log("Gagal load woi: ", err)
      }
    }
  })

  useEffect(() => {
    let scanner: QrScanner;

    if (videoRef.current) {
      scanner = new QrScanner(
        videoRef.current,
        async (result) => {
          console.log("QR DETECTED:", result.data);
          setResult(result.data);

          // Fetch backend
          try {
            const res = await GET(`/batches/${result.data}`);
            const batch = await res.json();

            if (!res.ok) {
              alert("Batch tidak ditemukan atau token invalid.");
            } else {
              // Simpan batch
              let saved = JSON.parse(
                localStorage.getItem("my_batches") || "[]"
              );
              saved.push(batch);
              localStorage.setItem("my_batches", JSON.stringify(saved));

              alert("Batch berhasil ditambahkan ke dashboard!");

              // REDIRECT KE DASHBOARD
              if (role) {
                router.push(`/${role}`)
              } else {
                router.push("/")
              }

              scanner.stop(); 
              return;
            }
          } catch (err: any) {
            alert("Error fetching batch: " + err.message);
          }

          // Reset result kalau mau terus scan
          setTimeout(() => setResult(""), 2000);
        },
        {
          onDecodeError: () => {},
          highlightScanRegion: true,
        }
      );

      scanner.start().catch((err) => {
        setError(`Camera error: ${err.message}`);
      });
    }

    return () => {
      scanner?.stop();
    };
  }, [router]);

  return (
    <div className=" flex flex-col max-h-screen items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Scan Batch</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <video
          ref={videoRef}
          className=" object-cover rounded-lg border-4 border-primary"
          playsInline
          muted
        />
      )}

      <p className="mt-4">{result || "Point the camera at the QR code"}</p>
    </div>
  );
}
