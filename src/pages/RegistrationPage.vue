<script setup lang="ts">
import { Button } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { backArrow, check } from '@/assets/icons';
import RegistrationNamesForm from '@/components/Forms/RegistrationNamesForm.vue';
import RegistrationsUserInfoForm from '@/components/Forms/RegistrationsUserInfoForm.vue';
import Steps from '@/components/Steps.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useRegistration } from '@/composables/useRegistration';
import { useUserStore } from '@/store/userStore.ts';

const userStore = useUserStore();
const {
  name, surName,
  birthDate, sex, email,
  createCustomer,
} = useRegistration();
const $router = useRouter();

const step = ref(1);

const backClickHandler = () => {
  if (step.value === 1) {
    $router.push({ name: 'auth' });
  }
  else {
    step.value--;
  }
};

const formSubmitHandler = async () => {
  await createCustomer();
  if (userStore.userInfo?.id) step.value = 3;
  step.value = 3;
};
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="page-header">
        <Button
          v-if="step !== 3"
          severity="secondary"
          outlined
          :icon="backArrow"
          @click="backClickHandler"
        />
        <div class="font-20-l text-center" style="flex-grow: 1;">
          OBLACKO
        </div>
        <span v-if="step !== 3" style="width: 4.5rem" />
      </div>
    </template>
    <div class="content-wrapper">
      <Steps :current-step="step" :steps-length="3" />

      <div class="forms-outer">
        <TransitionGroup name="scale-fade">
          <RegistrationNamesForm
            v-if="step === 1"
            v-model:sur-name="surName"
            v-model:name="name"
            class="form"
            @submit-form="step = 2"
          />
          <RegistrationsUserInfoForm
            v-if="step === 2"
            v-model:sex="sex"
            v-model:birth-date="birthDate"
            v-model:email="email"
            class="form"
            @submit-form="formSubmitHandler"
          />

          <div
            v-if="step === 3"
            class="form step-3"
          >
            <VIcon
              :icon="check"
              class="mt-auto"
              :size="40"
              style="padding: 2.6rem"
              span-bg="var(--primary-500)"
              color="var(--black)"
            />

            <div class="font-30-l">
              Добро пожаловать {{ userStore.userInfo?.name }}!
            </div>
            <div class="note-text">
              Ваш аккаунт успешно зарегистрирован.
              Теперь вы можете пользоваться всеми возможностями приложения OBLACKO.
            </div>
            <Button label="Начать" fluid class="mt-auto" @click="$router.push({ name: 'main' })" />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1.6rem;

  .details {
    display: flex;
    flex-direction: column;
    gap: .4rem;
    color: var(--primary-500);
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  gap: 2.4rem;
}

.forms-outer {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.form {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  &.step-3 {
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  & + .form {
    position: absolute;
    inset: 0;
  }
  :deep([type='submit']) {
    margin-top: auto;
  }
}
</style>
