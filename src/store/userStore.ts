import type { IGuest } from '@/composables/useAuth/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user-store', () => {
  const userInfo = ref<IGuest>();

  const phoneForRegistration = ref('');
  const storedPhone = useLocalStorage('phone', '');

  const userCardNumber = computed(() => {
    return userInfo.value?.cards[0]?.number ?? '';
  });

  const cardNumberPreview = computed(() => {
    const strArr = userCardNumber.value.match(/.{1,4}/g) || [];
    return strArr.join(' ');
  });

  const walletBalance = computed<number>(() => {
    if (!userInfo.value) return 0;
    return userInfo.value.walletBalances.reduce((total, wallet) => {
      return total + wallet.balance;
    }, 0);
  });

  const setUserInfo = (value: IGuest) => {
    userInfo.value = value;
  };

  const setStoredPhone = (phone: string) => {
    storedPhone.value = phone;
  };

  const setRegistrationPhone = (phone: string) => {
    phoneForRegistration.value = phone;
  };

  const resetUserData = () => {
    userInfo.value = undefined;
    setStoredPhone('');
    setRegistrationPhone('');
  };

  return {
    userInfo,
    storedPhone,
    phoneForRegistration,
    userCardNumber,
    cardNumberPreview,
    walletBalance,
    setUserInfo,
    setStoredPhone,
    setRegistrationPhone,
    resetUserData,
  };
});
