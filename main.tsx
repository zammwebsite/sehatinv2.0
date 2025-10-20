import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pastikan Tailwind dan CSS utama diimport agar style tampil
import './index.css';

// Ambil elemen root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure your index.html has <div id="root"></div>');
}

// Buat root React 18+
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
