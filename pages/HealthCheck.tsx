
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const HealthCheck = () => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{ heartRate: number; temp: number; stress: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraOn(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup camera on component unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleCheck = () => {
    if (!user) return;
    setIsChecking(true);
    setResults(null);
    setTimeout(async () => {
      // Simulate health check results
      const heartRate = Math.floor(Math.random() * (95 - 65 + 1) + 65);
      const temp = parseFloat((Math.random() * (37.2 - 36.5) + 36.5).toFixed(1));
      const stress = Math.floor(Math.random() * (40 - 10 + 1) + 10);
      
      const newResults = { heartRate, temp, stress };
      setResults(newResults);
      setIsChecking(false);

      // Save results to Supabase
      const { error: insertError } = await supabase.from('health_checks').insert({
        user_id: user.id,
        heart_rate: newResults.heartRate,
        temperature: newResults.temp,
        stress_level: newResults.stress
      });

      if (insertError) {
        console.error("Error saving results:", insertError);
        setError("Gagal menyimpan hasil pengecekan.");
      }
    }, 4000); // Simulate a 4-second check
  };

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Pengecekan Kesehatan Cepat</h1>
      <p className="text-gray-600 mb-6">Posisikan wajah Anda di depan kamera dan mulai pengecekan untuk mendapatkan estimasi kondisi kesehatan Anda.</p>
      
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg mx-auto mb-6">
        <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!isCameraOn && 'hidden'}`}></video>
        {!isCameraOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Kamera nonaktif
          </div>
        )}
        {isChecking && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <LoadingSpinner />
            <p className="mt-4 text-lg">Menganalisis...</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {!isCameraOn ? (
        <button onClick={startCamera} className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-primary-focus transition-colors">
          Buka Kamera
        </button>
      ) : (
        <div className="flex justify-center space-x-4">
          <button onClick={handleCheck} disabled={isChecking} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-400">
            {isChecking ? 'Memeriksa...' : 'Mulai Cek'}
          </button>
          <button onClick={stopCamera} disabled={isChecking} className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors disabled:bg-gray-400">
            Tutup Kamera
          </button>
        </div>
      )}

      {results && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-left animate-fade-in-up">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Pengecekan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500">Detak Jantung</p>
              <p className="text-3xl font-bold text-primary">{results.heartRate} <span className="text-lg">bpm</span></p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500">Suhu Wajah</p>
              <p className="text-3xl font-bold text-primary">{results.temp} <span className="text-lg">°C</span></p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500">Tingkat Stres</p>
              <p className="text-3xl font-bold text-primary">{results.stress}<span className="text-lg">%</span></p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">*Hasil merupakan estimasi dan tidak dapat digunakan sebagai diagnosis medis.</p>
        </div>
      )}
    </div>
  );
};
