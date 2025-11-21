import type { IGuest } from './types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { useFetchStates, useTimer } from '@/composables/UI';
import { useUserStore } from '@/store/userStore.ts';
import { type AuthSteps, setPostBody } from './models';

export const useAuth = () => {
  const { loading } = useFetchStates();
  const userStore = useUserStore();
  const { start, time, isTimerActive } = useTimer();
  const phoneNumber = ref('');
  const $router = useRouter();

  const authStep = ref<AuthSteps>('age');
  const modelPhoneNumber = computed(() => `998${phoneNumber.value}`);

  const code = ref('');
  const isPhoneValid = computed(() => modelPhoneNumber.value.length === 12);

  const setStep = (step: AuthSteps) => {
    authStep.value = step;
  };

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
      // organizationId: import.meta.env.VITE_API_ORG_ID,
    };

    const { data: createData, error: createError } = await $axios.post<{ id: string }>('/api/Customer/CreateOrUpdateCustomer', body, { loading });
    if (createData && !createError) {
      const { data, error }
        = await $axios.post<IGuest>('/api/Customer/GetCustomerInfo', setPostBody(modelPhoneNumber.value), { loading });
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
        = await $axios.post<IGuest>('/api/Customer/GetCustomerInfo', setPostBody(modelPhoneNumber.value), { loading, noToast: true });
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    if (error?.response?.data?.errorCode === 'OTP_VERIFICATION_REQUIRED') {
      setStep('code');
      start(1);
    }
    else {
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
    }
  };

  const otpError = ref(false);
  const verifyOtp = async () => {
    const { data }
        = await $axios.post<{ success: boolean }>('/api/Sms/VerifyOtp', { ...setPostBody(modelPhoneNumber.value), otp: code.value }, { loading });
    if (data.success) {
      getCustomerInfo();
    }
    else {
      otpError.value = true;
    }
  };

  return {
    code,
    loading,
    phoneNumber,
    authStep,
    time,
    setStep,
    isTimerActive,
    isPhoneValid,
    getCustomerInfo,
    otpError,
    verifyOtp,
  };
};
