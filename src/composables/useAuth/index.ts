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

  const updateUserInfo = async (guest: IGuest) => {
    const cardNumber = modelPhoneNumber.value.replace(/^\+/, '') + Math.floor(1000 + Math.random() * 9000);

    const body = {
      phone: modelPhoneNumber.value,
      surName: guest.surname, name: guest.name,
      birthday: guest.birthday ? `${guest.birthday?.split('/').reverse().join('-')} 00:00:00.000` : null,
      cardNumber,
      cardTrack: cardNumber,
      email: guest.email,
      sex: guest.sex,
      organizationId: import.meta.env.VITE_API_ORG_ID,
    };

    const { data: createData, error: createError } = await $axios.post<{ id: string }>('/api/1/loyalty/iiko/customer/create_or_update', body, { loading });
    if (createData && !createError) {
      const { data, error }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(modelPhoneNumber.value), { loading });
      if (data && !error) {
        userStore.setUserInfo(data);
        userStore.setStoredPhone(modelPhoneNumber.value);
        $router.push({ name: 'main' });
      }
    }
  };

  const getCustomerInfo = async () => {
    if (!isPhoneValid.value || loading.value) return;
    const { data, error }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(modelPhoneNumber.value), { loading });
    if (!data || error) {
      userStore.setRegistrationPhone(modelPhoneNumber.value);
      $router.push({ name: 'registration' });
    }
    else {
      userStore.setUserInfo(data);
      userStore.setStoredPhone(modelPhoneNumber.value);
      if (data.cards === null || data.cards.length === 0) {
        await updateUserInfo(data);
      }
      else {
        $router.push({ name: 'main' });
      }
    }
  };

  return {
    loading,
    phoneNumber,
    isPhoneValid,
    getCustomerInfo,
  };
};
