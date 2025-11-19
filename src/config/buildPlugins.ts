import type { PluginOption } from 'vite';
import type { BuildOptions } from './types';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';

export const buildPlugins = (options: BuildOptions): PluginOption[] => {
  return [
    vue(),

    options.isDev && mkcert(),

    {
      name: 'token-mw',
      configureServer(server) {
        server.middlewares.use('/token', async (_, res) => {
          try {
            const response = await fetch(`${options.env.VITE_API_URL}/api/Identity/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ login: options.env.VITE_API_LOGIN, password: options.env.VITE_API_PASSWORD }),
            });
            const result = await response.json() as { accessToken: string };
            console.log(result);
            if (result.accessToken) {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Set-Cookie', [`token=${result.accessToken}; Path=/; SameSite=Strict; Secure`]);
            }
            res.end(JSON.stringify({ success: Boolean(result.accessToken) }));
          }

          // eslint-disable-next-line unused-imports/no-unused-vars
          catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false }));
          }
        });
      },
    },
  ];
};
