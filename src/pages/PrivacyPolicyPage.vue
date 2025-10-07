<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';

const $router = useRouter();

const flag = ref(false);

onMounted(() => {
  flag.value = true;
});

const onClose = () => {
  $router.push('/auth');
};
</script>

<template>
  <PrivacyPolicy v-model="flag" @close="onClose" />
</template>
