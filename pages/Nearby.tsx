import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Nearby = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Mencari lokasi Anda...');

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLoc = [pos.coords.latitude, pos.coords.longitude] as [number, number];
          map.setView(userLoc, 15);
          L.marker(userLoc)
            .addTo(map)
            .bindPopup('Lokasi Anda')
            .openPopup();

          setStatus('Menampilkan lokasi Anda.');
        },
        () => {
          setStatus('Tidak dapat mengakses lokasi Anda.');
        }
      );
    } else {
      setStatus('Geolocation tidak didukung browser ini.');
    }
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100">
      <header className="bg-white p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">Fasilitas Kesehatan Terdekat</h1>
        <p className="text-sm text-gray-500">{status}</p>
      </header>
      <div ref={mapRef} className="w-full flex-grow" />
    </div>
  );
};
