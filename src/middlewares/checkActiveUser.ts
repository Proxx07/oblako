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
        = await $axios.post<IGuest>('/api/Customer/GetCustomerInfo', { ...setPostBody(userStore.storedPhone), sms: false }, { noToast: true });
    if (data) userStore.setUserInfo(data);
    name = !data || error ? 'auth' : 'main';
  }

  globalLoaderStore.closeLoader();
  return { name };
};
