
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { HealthRecord } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Profile = () => {
  const { user, profile, logout } = useAuth();
  const [history, setHistory] = useState<HealthRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoadingHistory(true);
      const { data, error } = await supabase
        .from('health_checks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching health history:', error);
      } else {
        setHistory(data as HealthRecord[]);
      }
      setLoadingHistory(false);
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={profile?.avatar_url || 'https://picsum.photos/200'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{profile?.full_name || 'User'}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informasi Personal</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Username:</strong> {profile?.username || '-'}</p>
          <p><strong>Umur:</strong> {profile?.age || 'Belum diatur'}</p>
          <p><strong>Tinggi:</strong> {profile?.height ? `${profile.height} cm` : 'Belum diatur'}</p>
          <p><strong>Berat:</strong> {profile?.weight ? `${profile.weight} kg` : 'Belum diatur'}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Pengecekan Terakhir</h2>
        {loadingHistory ? (
          <div className="flex justify-center items-center h-24">
            <LoadingSpinner />
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((record) => (
              <div key={record.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {new Date(record.created_at).toLocaleString('id-ID')}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span>❤️ {record.heart_rate} bpm</span>
                  <span>🌡️ {record.temperature}°C</span>
                  <span>🧠 {record.stress_level}% Stres</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada riwayat pengecekan.</p>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-8 w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors"
      >
        Keluar
      </button>
    </div>
  );
};
