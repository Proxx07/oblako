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
            const response = await fetch(`${options.env.VITE_API_URL}/api/1/access_token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ apiLogin: options.env.VITE_API_LOGIN }),
            });
            const result = await response.json();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Set-Cookie', [`token=${result.token}; Path=/; SameSite=Strict; Secure`]);
            res.end(JSON.stringify({ success: true }));
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
