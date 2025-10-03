import type { ImportMetaEnv } from '@/vite-env';

export interface BuildOptions {
  port: number
  isDev: boolean
  env: ImportMetaEnv
}
