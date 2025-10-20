import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ✅ Saat auth masih loading, tampilkan skeleton/loader sementara
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100 text-gray-600">
        <div className="animate-pulse text-center">
          <p className="text-lg font-medium">Memuat data pengguna...</p>
          <p className="text-sm text-gray-500">Harap tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // ✅ Jika belum login, arahkan ke /login sambil menyimpan lokasi sebelumnya
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Jika sudah login, lanjutkan ke halaman anak
  return <Outlet />;
};
