export const setPostBody = (phone: string) => {
  return {
    phone: phone[0] === '+' ? phone : `+${phone}`,
    type: 'phone',
    telegramId: 'TG_ID',
  };
};

export type AuthSteps = 'age' | 'phone' | 'code';
