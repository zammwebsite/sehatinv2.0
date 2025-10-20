import React, { useEffect, useRef, useState } from 'react';

// Pastikan deklarasi global google tetap ada
declare global {
interface Window {
initMap: () => void;
}
}

declare const google: any;

export const Nearby = () => {
const mapRef = useRef<HTMLDivElement>(null);
const [status, setStatus] = useState('Memuat peta dan lokasi Anda...');

useEffect(() => {
// Definisikan fungsi global initMap agar dikenali oleh Google Maps API callback
window.initMap = () => {
if (!navigator.geolocation) {
setStatus('Geolocation tidak didukung browser ini.');
return;
}

```
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        disableDefaultUI: true,
      });

      const infoWindow = new google.maps.InfoWindow();

      new google.maps.Marker({
        position: userLocation,
        map,
        title: 'Lokasi Anda',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#16a34a',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });

      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: userLocation,
        radius: 5000,
        types: ['hospital', 'clinic', 'doctor', 'health'],
      };

      service.nearbySearch(request, (results: any, statusResult: any) => {
        if (statusResult === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place: any) => {
            if (place.geometry && place.geometry.location) {
              const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
              });

              google.maps.event.addListener(marker, 'click', () => {
                const content = `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
              });
            }
          });
          setStatus('Menampilkan fasilitas kesehatan terdekat.');
        } else {
          setStatus('Tidak ditemukan fasilitas kesehatan di sekitar Anda.');
        }
      });
    },
    () => {
      setStatus('Gagal mendapatkan lokasi Anda. Pastikan izin lokasi aktif.');
    }
  );
};

// Tambahkan script Google Maps API dengan callback initMap
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places`;
script.async = true;
script.defer = true;
document.body.appendChild(script);

return () => {
  document.body.removeChild(script);
};
```

}, []);

return ( <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100"> <header className="bg-white p-4 shadow text-center"> <h1 className="text-xl font-bold text-gray-800">Fasilitas Kesehatan Terdekat</h1> <p className="text-sm text-gray-500">{status}</p> </header> <div ref={mapRef} className="flex-grow w-full" /> </div>
);
};
