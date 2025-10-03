import type { AliasOptions, ResolveOptions } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export const buildResolvers = (/* options: BuildOptions */): (ResolveOptions & { alias: AliasOptions }) => {
  return {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('../', import.meta.url)) },
    ],
  };
};
