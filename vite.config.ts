import * as process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import { buildVite } from './src/config/buildVite';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return buildVite({
    env,
    port: 8000,
    isDev: mode === 'development',
  });
});
