import type { UserConfig } from 'vite';
import type { BuildOptions } from './types';
import { buildCSS } from './buildCSS';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildServer } from './buildServer';

export const buildVite = (options: BuildOptions): UserConfig => {
  return {
    plugins: buildPlugins(options),
    server: buildServer(options),
    css: buildCSS(/* options */),
    resolve: buildResolvers(/* options */),
  };
};
