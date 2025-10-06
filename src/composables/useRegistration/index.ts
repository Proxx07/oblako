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

  const edit = ref(false);

  const name = ref('');
  const surName = ref('');
  const birthDate = ref('');
  const sex = ref(1);
  const email = ref('');

  const setRegistrationBody = () => {
    const cardNumber = userStore.phoneForRegistration.replace(/^\+/, '') + Math.floor(1000 + Math.random() * 9000);

    return {
      phone: userStore.phoneForRegistration,
      surName: surName.value, name: name.value,
      birthday: `${birthDate.value.split('/').reverse().join('-')} 00:00:00.000`,
      cardNumber: !edit.value ? cardNumber : (userStore.userInfo?.cards[0]?.number ?? cardNumber),
      cardTrack: !edit.value ? cardNumber : (userStore.userInfo?.cards[0]?.number ?? cardNumber),
      email: email.value,
      sex: sex.value,
      organizationId: import.meta.env.VITE_API_ORG_ID,
    };
  };

  const setFieldsValueFromUserData = () => {
    name.value = userStore.userInfo?.name || '';
    surName.value = userStore.userInfo?.surname || '';
    birthDate.value = userStore.userInfo?.birthday?.split(' ')[0]?.split('-').reverse().join('/') || '';
    sex.value = userStore.userInfo?.sex || 1;
    email.value = userStore.userInfo?.email || '';
  };

  const activateEdit = () => {
    edit.value = true;
    setFieldsValueFromUserData();
  };

  const deactivateEdit = () => {
    edit.value = false;
  };

  const phone = computed(() => userStore.phoneForRegistration);

  const getCustomer = async () => {
    const { data: guest, error: guestError }
        = await $axios.post<IGuest>('/api/1/loyalty/iiko/customer/info', setPostBody(userStore.phoneForRegistration), { loading });
    if (!guest || guestError) return;
    userStore.setUserInfo(guest);
  };

  const createCustomer = async () => {
    if (loading.value) return;
    const { data, error }
        = await $axios.post<{ id: string }>('/api/1/loyalty/iiko/customer/create_or_update', setRegistrationBody(), { loading });
    if (!data || error || edit) return;
    userStore.setStoredPhone(userStore.phoneForRegistration);
    if (data.id) {
      await $axios.post('/api/1/loyalty/iiko/customer_category/add', {
        customerId: data.id,
        categoryId: '2a5d42e7-c7a8-4a39-aa3f-9a29453b1bc7',
        organizationId: import.meta.env.VITE_API_ORG_ID,
      }, { loading });
    }

    await getCustomer();

    if (!userStore.userInfo?.id) return;
    await $router.push({ name: 'main' });
  };

  return {
    loading,
    name,
    surName,
    birthDate,
    sex,
    email,
    phone,
    createCustomer,
    edit,
    activateEdit,
    deactivateEdit,
    getCustomer,
  };
};
