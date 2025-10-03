import type { CSSOptions } from 'vite';

export const buildCSS = (/* options: BuildOptions */): CSSOptions => {
  return {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/styles/responsive.scss" as *;',
      },
    },
  };
};
