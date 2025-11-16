"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateBatch() {
  // Date in dd/mm/yyyy format (text input that inserts slashes)
  const [dateCaught, setDateCaught] = useState<string>("");

  // Coordinates (strings to allow empty value while typing)
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ date?: string; coords?: string }>(
    {}
  );

  // Format user input into dd/mm/yyyy as they type (non-invasive)
  function formatDateInput(input: string) {
    const digits = input.replace(/\D/g, "").slice(0, 8);
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
    if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
    if (digits.length > 4) parts.push(digits.slice(4));
    return parts.join("/");
  }

  // Request browser geolocation and populate lat/lng (6 decimals)
  function requestLocation() {
    setLocationError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        // clear any coord errors when location retrieved
        setErrors((s) => ({ ...s, coords: undefined }));
      },
      (err) => {
        setLocationError(err.message || "Unable to get location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function validateForm() {
    const next: { date?: string; coords?: string } = {};

    // date presence and simple format check dd/mm/yyyy
    if (!dateCaught || dateCaught.trim() === "") {
      next.date = "Date is required";
    } else {
      const m = dateCaught.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!m) {
        next.date = "Date must be in dd/mm/yyyy format";
      } else {
        const day = Number(m[1]);
        const month = Number(m[2]);
        const year = Number(m[3]);
        if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) {
          next.date = "Enter a valid date";
        }
      }
    }

    // coords presence and range
    if (!lat || !lng) {
      next.coords = "Latitude and longitude are required";
    } else {
      const la = Number(lat);
      const lo = Number(lng);
      if (!isFinite(la) || !isFinite(lo)) {
        next.coords = "Coordinates must be valid numbers";
      } else if (la < -90 || la > 90 || lo < -180 || lo > 180) {
        next.coords = "Coordinates out of range";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleGenerate() {
    if (!validateForm()) {
      return;
    }

    // TODO: wire actual generation logic. For now just clear errors and log
    setErrors({});
    // eslint-disable-next-line no-console
    console.log("Generate batch", { dateCaught, lat, lng });
  }

  return (
    <div className="p-6 max-w-md mx-auto text-white min-h-screen">
      <h1 className="text-2xl font-semibold">Create New Batch</h1>

      <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Batch Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Caught (dd/mm/yyyy) */}
          <div>
            <Input
              placeholder="dd/mm/yyyy"
              className="bg-white/20"
              value={dateCaught}
              aria-invalid={errors.date ? "true" : undefined}
              onChange={(e) => setDateCaught(formatDateInput((e.target as HTMLInputElement).value))}
            />
            {errors.date && (
              <div className="text-sm text-destructive mt-1">{errors.date}</div>
            )}
          </div>

          {/* Latitude & Longitude (manual or auto) */}
          <div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Latitude"
                type="number"
                step="any"
                className="bg-white/20"
                value={lat}
                aria-invalid={errors.coords ? "true" : undefined}
                onChange={(e) => setLat((e.target as HTMLInputElement).value)}
              />
              <Input
                placeholder="Longitude"
                type="number"
                step="any"
                className="bg-white/20"
                value={lng}
                aria-invalid={errors.coords ? "true" : undefined}
                onChange={(e) => setLng((e.target as HTMLInputElement).value)}
              />
            </div>
            {errors.coords && (
              <div className="text-sm text-destructive mt-1">{errors.coords}</div>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <Button type="button" onClick={requestLocation} className="mt-2">
              Use My Location
            </Button>
            <div className="flex-1 text-sm text-white/80 pl-2">
              {lat && lng ? (
                <span>Current: {lat}, {lng}</span>
              ) : (
                <span className="text-sm text-muted-foreground">No coordinates</span>
              )}
            </div>
          </div>

          {locationError && <div className="text-sm text-destructive mt-2">{locationError}</div>}

          <Button className="w-full" onClick={handleGenerate}>Generate Batch + QR</Button>
        </CardContent>
      </Card>
    </div>
  );
}
