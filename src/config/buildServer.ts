import type { ServerOptions } from 'vite';
import type { BuildOptions } from './types';

export const buildServer = (options: BuildOptions): ServerOptions => {
  return {
    open: options.isDev,
    port: options.port,
    proxy: {
      '/api': {
        target: options.env.VITE_API_LINK,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api/'),
      },
    },
    /*
    proxy: {
      '/soliq': {
        target: 'https://my3.soliq.uz/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/soliq/, '/api/'),
      },
    },
    */
  };
};
