import type { IGuest } from './types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { useFetchStates } from '@/composables/UI';
import { useUserStore } from '@/store/userStore.ts';
import { setPostBody } from './models';

export const useAuth = () => {
  const { loading } = useFetchStates();
  const phoneNumber = ref('');
  const userStore = useUserStore();
  const $router = useRouter();

  const modelPhoneNumber = computed(() => `998${phoneNumber.value}`);

  const isPhoneValid = computed(() => modelPhoneNumber.value.length === 12);

  const getCustomerInfo = async () => {
    if (!isPhoneValid.value || loading.value) return;
    const { data, error }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(modelPhoneNumber.value), { loading });
    if (!data || error) {
      userStore.setRegistrationPhone(phoneNumber.value);
      $router.push({ name: 'registration' });
    }
    else {
      userStore.setUserInfo(data);
      userStore.setStoredPhone(phoneNumber.value);
      $router.push({ name: 'main' });
    }
  };

  return {
    loading,
    phoneNumber,
    isPhoneValid,
    getCustomerInfo,
  };
};
