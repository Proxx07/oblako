<script setup lang="ts">
import { Button, Card } from 'primevue';
import { contactsLocation, contactsLocationArrow, contactsWorkingTime, forwardArrow } from '@/assets/icons';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useContactsPage } from '@/composables/useContacts';

const { contacts, workingHours, mapLinks, place } = useContactsPage();

const openLink = (url?: string) => {
  if (!url) return;
  window.open(url, '_blank');
};
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="contacts-top">
        <div class="font-24-r">
          Контакты
        </div>
        <div class="font-14-l color-secondary">
          Свяжитесь с нами любым удобным способом
        </div>
      </div>
    </template>

    <template #default>
      <div class="contacts-body">
        <div class="contacts">
          <Card v-for="c in contacts" :key="c.type" class="contact-item">
            <template #content>
              <div class="row">
                <VIcon :icon="c.icon" :size="36" color="var(--primary-500)" />
                <div class="details">
                  <div class="font-16-l">
                    {{ c.title }}
                  </div>
                  <div class="font-14-r color-secondary">
                    {{ c.value }}
                  </div>
                </div>
                <Button text :icon="forwardArrow" class="action" @click="openLink(c.link)" />
              </div>
            </template>
          </Card>

          <Card class="contact-item">
            <template #content>
              <div class="row">
                <VIcon :icon="contactsLocation" :size="36" color="var(--primary-500)" />
                <div class="details">
                  <div class="font-16-l">
                    Адрес
                  </div>
                  <div class="font-14-r color-secondary">
                    {{ place.address }}
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <Card class="schedule">
            <template #content>
              <div class="row">
                <VIcon :icon="contactsWorkingTime" :size="36" color="var(--primary-500)" />
                <div class="details">
                  <div class="font-16-l">
                    Режим работы
                  </div>
                  <!-- <span class="status" :class="[workingHours.isOpenNow ? 'open' : 'close']">
                    {{ workingHours.isOpenNow ? 'Сейчас открыто' : 'Закрыто' }}
                  </span> -->
                </div>
              </div>

              <div class="days">
                <div v-for="d in workingHours.days" :key="d.name" class="day">
                  <div class="name font-16-l">
                    {{ d.name }}
                  </div>
                  <div class="time-head">
                    <div class="time font-16-l">
                      {{ d.time }}
                    </div>
                    <div class="hours font-12-l">
                      {{ d.hours }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <div class="font-16-l">
            Карты и навигация
          </div>
          <div class="maps">
            <Card v-for="m in mapLinks" :key="m.name" class="map-item" @click="openLink(m.link)">
              <template #content>
                <div class="row">
                  <VIcon :icon="contactsLocationArrow" :size="36" color="var(--primary-500)" />
                  <div class="font-14-l">
                    {{ m.name }}
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- <Card class="place">
            <template #content>
              <div class="place-inner">
                <div class="pin">
                  🔰
                </div>
                <div class="addr font-14-l">
                  {{ place.shortAddress }}
                </div>
                <div class="city font-12-r color-secondary">
                  {{ place.city }}
                </div>
                <Button label="OBLACKO" size="small" text @click="openLink(place.primaryMapLink)" />
              </div>
            </template>
          </Card> -->
        </div>
      </div>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.color-secondary {
  color: var(--secondary-900)
}

.contacts-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.contacts-body {
  margin-bottom: 100px;
  flex: 1 1 auto;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}

.contact-item :deep(.p-card-body) {
  padding: .8rem 1rem
}

.schedule :deep(.p-card-body) {
  padding: 1rem
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 82px;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .3rem
}

.action {
  margin-left: auto
}

.days {
  display: flex;
  flex-direction: column;
  gap: 2rem;;
  margin: 1rem;
}

.day {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: var(--secondary-900)
}

.day .time-head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day .time {
  color: var(--text-color);
}

.day .hours {
  color: var(--secondary-950);
  text-align: end;
}

.maps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: .4rem
}

.map-item {
  cursor: pointer
}

.map-item :deep(.p-card-body) {
  padding: .8rem
}

.status {
  font: var(--font-12-r);
  padding: .2rem .6rem;
  border-radius: .6rem;
}

.status.open {
  background: rgba(34, 197, 94, .15);
  color: #22c55e
}

.status.close {
  background: rgba(239, 68, 68, .15);
  color: #ef4444
}

.place :deep(.p-card-body) {
  padding: 1.4rem
}

.place-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: .6rem
}

.pin {
  font-size: 2.2rem
}

.addr {
  text-align: center
}

.city {
  text-align: center
}
</style>
