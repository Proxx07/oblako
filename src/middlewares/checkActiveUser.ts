import type { IGuest } from '@/composables/useAuth/types';
import $axios from '@/api';
import { setPostBody } from '@/composables/useAuth/models';
import { useGlobalLoader } from '@/store/globalLoader.ts';
import { useUserStore } from '@/store/userStore.ts';

export const checkActiveUser = async () => {
  const globalLoaderStore = useGlobalLoader();
  if (!globalLoaderStore.loader) return true;

  await new Promise(resolve => setTimeout(resolve, 500));
  let name: 'main' | 'auth' = 'auth';

  const userStore = useUserStore();
  if (userStore.storedPhone) {
    const { data, error }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(userStore.storedPhone));
    userStore.setUserInfo(data);
    name = !data || error ? 'auth' : 'main';
  }

  globalLoaderStore.closeLoader();
  return { name };
};
