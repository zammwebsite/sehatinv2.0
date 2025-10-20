import React, { useEffect, useRef, useState } from "react";

export const Nearby = () => {
  const mapRef = useRef<HTMLIFrameElement>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [status, setStatus] = useState("Menentukan lokasi Anda...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setStatus("Menampilkan lokasi Anda di peta...");
      },
      (err) => {
        console.error(err);
        setStatus("Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.");
      }
    );
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-gray-100">
      <header className="bg-white p-4 shadow-sm z-10 text-center">
        <h1 className="text-xl font-bold text-gray-800">Fasilitas Kesehatan Terdekat</h1>
        <p className="text-sm text-gray-500">{status}</p>
      </header>

      <div className="flex-grow relative">
        {coords ? (
          <iframe
            ref={mapRef}
            title="Peta Lokasi"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.02},${coords.lat - 0.02},${coords.lon + 0.02},${coords.lat + 0.02}&layer=mapnik&marker=${coords.lat},${coords.lon}`}
            className="w-full h-full border-0"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            <span>Memuat peta...</span>
          </div>
        )}
      </div>
    </div>
  );
};
