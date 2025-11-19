<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useThemeMode } from '@/composables/UI/';
import AppLayout from '@/layouts/AppLayout.vue';
import { getCurrentLocale, setCurrentLocale } from '@/plugins/i18n/models';

const { setTheme } = useThemeMode();

const checkTg = () => {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line no-console
  console.log(window.Telegram, window?.Telegram?.WebView?.webAppInitDataUnsafe);
};

onBeforeMount(() => {
  setCurrentLocale(getCurrentLocale());
  setTheme();
  checkTg();
});
</script>

<template>
  <AppLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="route-transition">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </AppLayout>
</template>

<style lang="scss">
#app {
  background: var(--site-bg);
  text: var(--text-color);
}
</style>
