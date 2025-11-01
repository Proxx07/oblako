<script setup lang="ts">
import { Card } from 'primevue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import RubberList from '@/components/UI/RubberList.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useContactsPage } from '@/composables/useContacts';

const { socials, mapLinks, services } = useContactsPage();
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="contacts-top">
        <div class="font-24-r">
          Контакты
        </div>
        <div class="note-text">
          Свяжитесь с нами любым удобным способом
        </div>
      </div>
    </template>

    <div class="page-inner">
      <div class="font-16-r">
        Социальные сети
      </div>
      <RubberList :gap="1.2" class="list">
        <Card v-for="item in socials" :key="item.type">
          <template #content>
            <VIcon :icon="item.icon" color="var(--primary-500)" />
            <div class="font-14-l">
              {{ item.name }}
            </div>
            <a v-if="item.link" :href="item.link" target="_blank" />
          </template>
        </Card>
      </RubberList>
      <div class="font-16-r">
        Как добраться
      </div>
      <RubberList :gap="1.2" class="list">
        <Card v-for="item in mapLinks" :key="item.link">
          <template #content>
            <VIcon :icon="item.icon" color="var(--primary-500)" />
            <div class="font-14-l">
              {{ item.name }}
            </div>
            <a v-if="item.link" :href="item.link" target="_blank" />
          </template>
        </Card>
      </RubberList>

      <div class="font-16-r">
        Сервисы
      </div>
      <RubberList :gap="1.2" class="list">
        <Card v-for="item in services" :key="item.link">
          <template #content>
            <VIcon :icon="item.icon" color="var(--primary-500)" />
            <div class="font-14-l">
              {{ item.name }}
            </div>
            <a v-if="item.link" :href="item.link" target="_blank" />
          </template>
        </Card>
      </RubberList>
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss">
.contacts-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.page-inner {
  padding-top: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  align-self: stretch;
}

.list {
  :deep(.p-card-body) {
    padding: 2.4rem;
    position: relative;
    text-align: center;
    a {
      position: absolute;
      inset: 0;
    }
    .p-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
    }
  }
}
</style>
