import type ru from '@/plugins/i18n/locales/ru.ts';

export type MessageSchema = typeof ru;

export type DeepKeyOf<TObj extends object> = {
  [K in keyof TObj & string]: TObj[K] extends object
    ? `${K}` | `${K}.${DeepKeyOf<TObj[K]>}`
    : `${K}`;
}[keyof TObj & string];
