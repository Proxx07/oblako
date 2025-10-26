import type { InputTextPassThroughOptionType, InputTextProps } from 'primevue';
import type { RendererElement, RendererNode, VNode } from 'vue';

export const inputFieldPt = (instance?: VNode<RendererNode, RendererElement, InputTextProps>): InputTextPassThroughOptionType => {
  return {
    root: {
      class: (!instance || !instance.props?.size) ? 'font-16-l' : instance.props.size === 'small' ? 'font-14-l' : 'font-24-l',
    },
  };
};
