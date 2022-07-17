import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
    build: {
      outDir: '../dist',
    },
    server: {
      host: 'localhost',
      port: 8080,
      strictPort: true,
      proxy: {
        '^/api': {
          target: env.VITE_BACKEND,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
