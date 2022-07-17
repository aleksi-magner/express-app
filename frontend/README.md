# Vue 3 + Vite

### Создание базового приложения Vite

```shell
yarn create vite frontend
yarn
```

```javascript
import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
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
  },
});
```
