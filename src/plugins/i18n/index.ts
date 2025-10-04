import type { MessageSchema } from './types';
import { createI18n } from 'vue-i18n';

import ru from './locales/ru';

import { DEFAULT_LANGUAGE, flagIcons, getCurrentLocale, langNames } from './models';

export const i18n = createI18n<[MessageSchema], 'ru-RU' | 'en-US' | 'uz-UZ'>({
  legacy: true,
  locale: getCurrentLocale(),
  fallbackLocale: DEFAULT_LANGUAGE,
  globalInjection: false,
  warnHtmlMessage: false,
  messages: {
    'ru-RU': ru,
    'en-US': ru,
    'uz-UZ': ru,
  },
});

export const locales = i18n.global.availableLocales.map((ln) => {
  return { name: langNames[ln], value: ln, icon: flagIcons[ln] };
});
