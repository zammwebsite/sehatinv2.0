import React, { useEffect, useRef, useState } from 'react';

// Fix: Declare google to satisfy TypeScript for Google Maps API, which is loaded via a script tag.
declare const google: any;

export const Nearby = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // FIX: Replaced google.maps.Map with any to resolve TypeScript error.
  const [map, setMap] = useState<any | null>(null);
  // FIX: Replaced google.maps.InfoWindow with any to resolve TypeScript error.
  const [infoWindow, setInfoWindow] = useState<any | null>(null);
  const [status, setStatus] = useState('Mencari lokasi Anda...');

  const initMap = (position: GeolocationPosition) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    
    if (mapRef.current) {
      // Fix: Use global google object instead of window.google for consistency.
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        disableDefaultUI: true,
      });

      const infoWindowInstance = new google.maps.InfoWindow();
      
      setMap(mapInstance);
      setInfoWindow(infoWindowInstance);

      // Fix: Use global google object instead of window.google for consistency.
      new google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        title: "Lokasi Anda",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
        },
      });

      const request = {
        location: userLocation,
        radius: 5000, // 5km radius
        types: ['hospital', 'clinic', 'doctor', 'health'],
      };

      // Fix: Use global google object instead of window.google for consistency.
      const service = new google.maps.places.PlacesService(mapInstance);
      service.nearbySearch(request, (results, searchStatus) => {
        // Fix: Use global google object instead of window.google for consistency.
        if (searchStatus === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], mapInstance, infoWindowInstance);
          }
          setStatus(`Menampilkan fasilitas kesehatan terdekat.`);
        } else {
            setStatus('Tidak dapat menemukan fasilitas kesehatan di sekitar Anda.');
        }
      });
    }
  };

  // FIX: Replaced specific Google Maps types with any to resolve TypeScript errors.
  const createMarker = (place: any, mapInstance: any, infoWindowInstance: any) => {
    if (!place.geometry || !place.geometry.location) return;

    // Fix: Use global google object instead of window.google for consistency.
    const marker = new google.maps.Marker({
      map: mapInstance,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      const content = `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`;
      infoWindowInstance.setContent(content);
      infoWindowInstance.open(mapInstance, marker);
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        initMap,
        () => {
          setStatus('Gagal mendapatkan lokasi. Izinkan akses lokasi untuk menggunakan fitur ini.');
        }
      );
    } else {
      setStatus('Geolocation tidak didukung oleh browser ini.');
    }
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-gray-100">
       <header className="bg-white p-4 shadow-sm z-10 text-center">
        <h1 className="text-xl font-bold text-gray-800">Fasilitas Kesehatan Terdekat</h1>
        <p className="text-sm text-gray-500">{status}</p>
      </header>
      <div ref={mapRef} className="w-full flex-grow" />
    </div>
  );
};
