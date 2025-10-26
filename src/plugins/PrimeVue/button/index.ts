import type { ButtonDesignTokens } from '@primeuix/themes/types/button';
import type { ButtonPassThroughOptions, ButtonProps } from 'primevue/button';
import type { RendererElement, RendererNode, VNode } from 'vue';

export const buttonConfig = (): ButtonDesignTokens => {
  return {
    root: {
      paddingX: '2rem',
      paddingY: '1.8rem',
      gap: '.4rem 1.2rem',
      sm: { paddingX: '.9rem', paddingY: '1.2rem' },
      lg: { paddingX: '1.6rem', paddingY: '2.4rem' },
      label: { fontWeight: 'unset' },

      primary: {
        background: 'var(--primary-500)',
        hoverBackground: 'var(--primary-600)',
        activeBackground: 'var(--primary-600)',
        color: 'var(--primary-surface-color)',
        hoverColor: 'var(--primary-surface-color)',
        activeColor: 'var(--primary-surface-color)',
      },

      secondary: {
        color: 'var(--secondary-surface-color)',
        hoverColor: 'var(--secondary-surface-color)',
        activeColor: 'var(--secondary-surface-color)',
        background: 'var(--secondary-500)',
        hoverBackground: 'var(--secondary-600)',
        activeBackground: 'var(--secondary-700)',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        activeBorderColor: 'transparent',
      },
    },
  };
};

export const buttonPt = (instance: VNode<RendererNode, RendererElement, ButtonProps>): ButtonPassThroughOptions => {
  return {
    root: {
      class: !instance.props?.size ? 'font-16-l' : instance.props.size === 'small' ? 'font-14-l' : 'font-18-l',
    },

    icon: {
      ...((instance.props?.icon && instance.props?.icon.includes('<svg')) && {
        innerHTML: instance.props?.icon,
        classList: `p-button-icon-svg p-button-icon-${instance.props?.iconPos || 'left'} ${instance.props?.iconClass || ''}`,
        // @ts-expect-error next-line
        style: { color: instance.attrs['icon-color'] || 'currentColor' },
      }),
      ...((instance.props?.icon && !instance.props?.icon.includes('<svg')) && { class: instance.props?.icon }),
    },
  };
};
