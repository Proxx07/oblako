export const setPostBody = (phone: string) => {
  return {
    phone: phone[0] === '+' ? phone : `+${phone}`,
    type: 'phone',
    organizationId: import.meta.env.VITE_API_ORG_ID,
  };
};

export type AuthSteps = 'age' | 'phone' | 'code';
