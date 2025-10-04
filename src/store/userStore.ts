import type { IGuest } from '@/composables/useAuth/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user-store', () => {
  const userInfo = ref<IGuest>();

  const phoneForRegistration = ref('+998934823461');
  const storedPhone = useLocalStorage('phone', '');

  const setUserInfo = (value: IGuest) => {
    userInfo.value = value;
  };

  const setStoredPhone = (phone: string) => {
    storedPhone.value = phone;
  };

  const setRegistrationPhone = (phone: string) => {
    phoneForRegistration.value = phone;
  };

  return {
    userInfo,
    storedPhone,
    phoneForRegistration,
    setUserInfo,
    setStoredPhone,
    setRegistrationPhone,
  };
});
