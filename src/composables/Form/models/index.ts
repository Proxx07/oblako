import type { ComposerTranslation } from 'vue-i18n';
import type { FormRule } from '@/composables/Form/types';
import type { MessageSchema } from '@/plugins/i18n/types';

export const formRules = ($t: ComposerTranslation<MessageSchema>) => {
  return {
    required: (): FormRule<string | number> => (value: string | number) => !!value || $t('rules.required'),
    minLength: (opt: number): FormRule<string> => (value: string) => String(value).length >= opt || $t('rules.minLength', { opt }),
    minValue: (opt: number): FormRule<number> => (value: number) => value >= opt || $t('rules.minValue', { opt }),
    birthDate: (): FormRule<string> => (value: string) => {
      const [day, month, year] = value.split('/');
      if (!day || !month || !year) return $t('rules.invalidDate');
      if (+day > 31) return $t('rules.invalidDate');
      if (+month > 12) return $t('rules.invalidDate');
      return true;
    },
    fullName: (): FormRule<string> => (value: string) => {
      if (!value) return $t('rules.required');
      const nameArray = value.split(' ');
      if (nameArray.length !== 3 || nameArray.some(str => !str)) return $t('rules.enterFullName');
      return true;
    },
    email: (): FormRule<string> => (value: string) => /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value) || $t('rules.email'),
  };
};

export type FormRules = ReturnType<typeof formRules>;
