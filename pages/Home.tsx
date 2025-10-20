
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const FeatureCard = ({ to, icon, title, description }: { to: string, icon: React.ReactNode, title: string, description: string }) => (
  <Link to={to} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="bg-green-100 text-primary rounded-full p-4 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);

export const Home = () => {
  const { profile } = useAuth();
  const greeting = `Selamat Datang, ${profile?.full_name || 'Pengguna'}!`;

  return (
    <div className="p-4 pb-20 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{greeting}</h1>
        <p className="text-gray-600">Semoga harimu sehat dan menyenangkan.</p>
      </header>
      
      <div className="bg-primary text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Status Kesehatanmu</h2>
        <p className="opacity-90">Pantau terus kondisi kesehatanmu bersama Sehatin v2 untuk hidup yang lebih berkualitas.</p>
        <Link to="/health-check" className="mt-4 inline-block bg-white text-primary font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
          Mulai Pengecekan
        </Link>
      </div>

      <main>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            to="/ai-chat"
            title="AI Chat Kesehatan"
            description="Tanya apa saja seputar kesehatan kepada asisten AI cerdas kami."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          />
          <FeatureCard 
            to="/health-check"
            title="Pengecekan Cepat"
            description="Gunakan kamera untuk estimasi detak jantung, suhu, dan tingkat stres."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          />
          <FeatureCard 
            to="/nearby"
            title="Faskes Terdekat"
            description="Temukan rumah sakit, klinik, dan puskesmas di sekitar lokasimu."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
           <FeatureCard 
            to="/profile"
            title="Profil & Riwayat"
            description="Lihat data pribadimu dan riwayat pengecekan kesehatan."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          />
        </div>
      </main>
    </div>
  );
};
