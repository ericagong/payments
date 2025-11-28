import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error – missing type in Vite
        api: 'modern-compiler',
      },
    },
  },
});
