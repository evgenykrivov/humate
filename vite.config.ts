import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-unused-modules
export default defineConfig(({ mode }) => {
  // Загружаем env-файлы в текущем режиме
  const env = loadEnv(mode, './env', '');

  return {
    envDir: './env',
    define: {
      // Делаем все переменные окружения доступными в приложении
      'import.meta.env': env,
    },
    plugins: [react(), tsconfigPaths(), svgrPlugin()],
    publicDir: 'public',
    /* If proxy is needed
    server: {
      proxy: {
        "/api": "localhost:8080"
      }
    },
    */
    build: {
      sourcemap: true,
      outDir: 'build',
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
