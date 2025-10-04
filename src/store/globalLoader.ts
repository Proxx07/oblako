import { defineStore } from 'pinia';
import { useToggle } from '@/composables/UI';

export const useGlobalLoader = defineStore('global-loader', () => {
  const { show: loader, close: closeLoader } = useToggle(true);
  return {
    loader, closeLoader,
  };
});
