import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css'; // ✅ penting agar style muncul

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure your index.html has <div id="root"></div>');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
