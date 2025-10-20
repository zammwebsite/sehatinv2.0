import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './', // ✅ penting agar routing tidak putih di deploy
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // ✅ pastikan variabel env diproteksi null check
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // ✅ arahkan ke src (konvensi umum)
      },
    },
    build: {
      outDir: 'dist', // ✅ output standard
      sourcemap: false,
    },
  };
});
