import type { IGuest } from '@/composables/useAuth/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { useFetchStates } from '@/composables/UI';
import { setPostBody } from '@/composables/useAuth/models';
import { useUserStore } from '@/store/userStore.ts';

export const useRegistration = () => {
  const $router = useRouter();

  const { loading } = useFetchStates();
  const userStore = useUserStore();

  const fullName = ref('');
  const birthDate = ref('');
  const sex = ref(1);
  const email = ref('');

  const setRegistrationBody = () => {
    const [surName, name, middleName] = fullName.value.split(' ');
    return {
      phone: userStore.phoneForRegistration,
      surName, name, middleName,
      birthday: `${birthDate.value.split('/').reverse().join('-')} 00:00:00.000`,
      email: email.value,
      sex: sex.value,
      organizationId: import.meta.env.VITE_API_ORG_ID,
    };
  };

  const phone = computed(() => userStore.phoneForRegistration);

  const createCustomer = async () => {
    if (loading.value) return;
    const { data, error }
        = await $axios.post<{ id: string }>('/api/1/loyalty/iiko/customer/create_or_update', setRegistrationBody(), { loading });
    if (!data || error) return;
    userStore.setStoredPhone(userStore.phoneForRegistration);
    const { data: guest, error: guestError }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(userStore.phoneForRegistration), { loading });
    if (!guest || guestError) return;
    userStore.setUserInfo(guest);
    $router.push({ name: 'main' });
  };

  return {
    loading,
    fullName,
    birthDate,
    sex,
    email,
    phone,
    createCustomer,
  };
};
