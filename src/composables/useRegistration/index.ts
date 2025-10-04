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
    const cardNumber = userStore.phoneForRegistration.replace(/^\+/, '') + Math.floor(1000 + Math.random() * 9000);

    return {
      phone: userStore.phoneForRegistration,
      surName, name, middleName,
      birthday: `${birthDate.value.split('/').reverse().join('-')} 00:00:00.000`,
      cardNumber, cardTrack: cardNumber,
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

    if (data.id) {
      await $axios.post('/api/1/loyalty/iiko/customer_category/add', {
        customerId: data.id,
        categoryId: '2a5d42e7-c7a8-4a39-aa3f-9a29453b1bc7',
        organizationId: import.meta.env.VITE_API_ORG_ID,
      });
    }

    const { data: guest, error: guestError }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(userStore.phoneForRegistration), { loading });
    if (!guest || guestError) return;
    userStore.setUserInfo(guest);
    await $router.push({ name: 'main' });
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
