<script setup lang="ts">
import { Button, Card } from 'primevue';
import { useRouter } from 'vue-router';
import { warning } from '@/assets/icons';
import VIcon from '@/components/UI/VIcon.vue';

// импорт иконки предупреждения напрямую
// хранить согласие будем в localStorage ключом 'ageConfirmed'
const $router = useRouter();

const confirmAge = () => {
  try {
    localStorage.setItem('ageConfirmed', '1');
  }
  catch (e) {
    // игнорируем, если локальное хранилище недоступно
  }
  $router.push({ name: 'auth' });
};
</script>

<template>
  <div class="age-page">
    <Card class="age-card">
      <template #content>
        <div class="age-card__inner">
          <div class="age-card__icon">
            <VIcon :icon="warning" :size="80" color="white" class="no-fill" />
          </div>

          <div class="age-card__title font-24-b">
            Вам есть 18?
          </div>

          <div class="age-card__subtitle font-16-l color-secondary">
            Сервис предназначен для лиц достигших 18 лет
          </div>

          <Button
            label="Мне есть 18"
            severity="primary"
            icon-pos="left"
            class="age-card__button"
            @click="confirmAge"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.age-page {
  min-height: 100dvh;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
}

.age-card {
  width: 100%;
  max-width: 40rem;
  background: rgba(29, 29, 29, 1);
}

.age-card__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2.4rem;
  text-align: center;
}

.age-card__title {
  color: var(--white);
}

.age-card__subtitle {
  color: var(--secondary-900);
}

.age-card__button {
  margin-top: 15px;
  width: 100%;
}
</style>
