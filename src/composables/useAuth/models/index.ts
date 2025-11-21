export const setPostBody = (phone: string) => {
  return {
    phone: phone[0] === '+' ? phone : `+${phone}`,
    type: 'phone',
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    telegramId: `${window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || ''}`,
  };
};

export type AuthSteps = 'age' | 'phone' | 'code';
