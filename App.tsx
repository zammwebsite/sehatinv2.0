
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AIChat } from './pages/AIChat';
import { HealthCheck } from './pages/HealthCheck';
import { Nearby } from './pages/Nearby';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BottomNav } from './components/BottomNav';

const AppLayout = () => {
  const { user } = useAuth();
  return (
    <>
      <main className="pb-16 md:pb-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/health-check" element={<HealthCheck />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      {user && <BottomNav />}
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
