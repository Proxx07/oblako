import type { CardDesignTokens } from '@primeuix/themes/types/card';

export const cardConfig = (): CardDesignTokens => {
  return {
    root: {
      borderRadius: 'var(--radius-l)',
    },
    colorScheme: {
      light: {
        root: {
          color: 'var(--black)',
        },
      },
      dark: {
        root: {
          background: 'var(--card-bg)',
          color: 'var(--white)',
        },
      },
    },
  };
};
