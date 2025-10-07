<script setup lang="ts">
import { Button, Card } from 'primevue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  calendar,
  edit as editIcon,
  email as emailIcon, listIcon,
  logout,
  phone as phoneIcon,
  shieldIcon,
  user,
  users,
} from '@/assets/icons';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import VInputText from '@/components/Form/VInputText.vue';
import LoyaltyRules from '@/components/LoyaltyRules.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useRegistration } from '@/composables/useRegistration';
import { sexOptions } from '@/composables/useRegistration/models';
import { $confirm } from '@/plugins/confirmation.ts';
import { useToastStore } from '@/store/toastsStore.ts';
import { useUserStore } from '@/store/userStore.ts';

const { t } = useI18n();
const userStore = useUserStore();
const $toast = useToastStore();
const $router = useRouter();

const {
  edit, deactivateEdit, activateEdit,
  loading, name, surName, birthDate, sex, email, phone, createCustomer, getCustomer,
} = useRegistration();
const logOut = async () => {
  const ok = await $confirm.default({ title: 'confirmations.warning', subtitle: 'logout' });
  if (ok) {
    userStore.resetUserData();
    await $router.push({ name: 'auth' });
  }
};
const updateCustomer = async () => {
  await createCustomer();
  await getCustomer();
  deactivateEdit();
  $toast.success('Пользователь сохранён');
};

const userInfoList = computed(() => {
  if (!userStore.userInfo) return [];
  return [
    { title: 'Полное имя', value: `${userStore.userInfo.name} ${userStore.userInfo.surname || ''}`, icon: user },
    { title: 'Телефон', value: userStore.userInfo.phone, icon: phoneIcon },
    { title: 'Email', value: userStore.userInfo.email, icon: emailIcon },
    { title: 'Дата рождения', value: userStore.userInfo.birthday?.split(' ')[0] ?? '', icon: calendar },
  ];
});

const privacyDialog = ref(false);
const loyaltyDialog = ref(false);

const actions = [
  {
    title: 'Правила лояльности',
    icon: listIcon,
    action: () => privacyDialog.value = true,
  },
  {
    title: 'Конфиденциальность',
    icon: shieldIcon,
    action: () => loyaltyDialog.value = true,
  },
];
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="top">
        <div class="font-24-r">
          Профиль
        </div>
        <div class="font-16-r color-secondary">
          Управление аккаунтом и настройками
        </div>
      </div>
    </template>

    <div style="display: flex; flex-direction: column; gap: 1.2rem; width: 100%;">
      <Card v-if="userStore.userInfo" class="card">
        <template #content>
          <div class="profile-form-content">
            <div class="user">
              <VIcon :icon="user" class="primary-gradient" />
              <div style="flex-grow: 1">
                <div class="font-16-r">
                  {{ userStore.userInfo.name.toUpperCase() }}
                </div>
                <div class="font-14-r color-secondary">
                  Участник программы лояльности
                </div>
              </div>
              <div class="edit">
                <Button v-if="!edit" text size="small" @click="activateEdit">
                  <VIcon :icon="editIcon" :size="24" />
                </Button>
              </div>
            </div>
            <div class="dynamic-content">
              <Transition name="slide-in-left">
                <div v-if="!edit">
                  <div v-for="item in userInfoList" :key="item.title" class="user-item">
                    <VIcon :icon="item.icon" class="primary-gradient" :size="16" />
                    <div class="text" style="display: flex; flex-direction: column; gap: .4rem">
                      <div class="font-14-r color-secondary">
                        {{ item.title }}
                      </div>
                      <div class="font-16-l">
                        {{ item.value }}
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition name="slide-in-right">
                <VForm v-if="edit" class="form-wrapper" @submit-form="updateCustomer">
                  <VInputText
                    v-model="name"
                    :label="t('registration.name')"
                    :placeholder="t('registration.namePlaceholder')"
                    :rules="[$formRules.required()]"
                  />

                  <VInputText
                    v-model="surName"
                    :label="t('registration.surName')"
                    :placeholder="t('registration.surNamePlaceHolder')"
                  />

                  <VInputMask
                    v-model="birthDate"
                    :label="t('registration.birthDate')"
                    :loading="loading"
                    mask="##/##/####"
                    placeholder="__-__-____"
                    :pt="{ root: { inputmode: 'numeric' } }"
                    :rules="[$formRules.required(), $formRules.birthDate()]"
                  />

                  <div class="sex-wrapper">
                    <div class="font-14-r colspan-2 text-left" style="color: var(--secondary-900)">
                      {{ t('registration.sex') }}
                    </div>
                    <Button
                      v-for="item in sexOptions"
                      :key="item.value"
                      :severity="sex === item.value ? 'primary' : 'secondary'"
                      :icon="users"
                      :label="t(`registration.${item.name}`)"
                      fluid
                      outlined
                      @click.prevent="sex = item.value"
                    />
                  </div>

                  <VInputText
                    v-model="email"
                    :label="t('registration.email')"
                    placeholder="example@email.com"
                  />

                  <div class="w-full">
                    <VInputMask
                      v-model="phone"
                      mask="+### ## ### ## ##"
                      :label="t('registration.phoneNumber')"
                      :disabled="true"
                      :readonly="true"
                    />
                    <div class="font-14-r color-secondary" style="margin-top: 0.4rem">
                      Номер телефона нельзя изменить
                    </div>
                  </div>

                  <div style="display: flex; gap: 1rem; width: 100%">
                    <Button
                      type="submit"
                      label="Сохранить"
                      :loading="loading"
                      fluid
                    />
                    <Button label="Отменить" severity="secondary" fluid @click.prevent="deactivateEdit" />
                  </div>
                </VForm>
              </Transition>
            </div>
          </div>
        </template>
      </Card>

      <Card v-for="action in actions" :key="action.title" class="action">
        <template #content>
          <Button text fluid class="text-left" @click="action.action">
            <div style="display: flex; align-items: center; width: 100%; gap: 1.2rem">
              <VIcon :icon="action.icon" class="primary-gradient" :size="16" style="width: 3rem; height: 3rem;" />
              <div class="font-16-l" style="color: #fff;">
                {{ action.title }}
              </div>
            </div>
          </Button>
        </template>
      </Card>

      <Button class="logout-button" outlined severity="danger" label="Выйти из аккаунта" :icon="logout" @click="logOut" />
    </div>

    <PrivacyPolicy v-model="loyaltyDialog" />
    <LoyaltyRules v-model="privacyDialog" />
  </PageWrapper>
</template>

<style scoped lang="scss">
.logout-button {
  :deep(svg) {
    width: 2.4rem;
    height: 2.4rem;
  }
}
.action {
  :deep(.p-card-body) {
    padding: 0;
  }
}
.profile {
  display: flex;
  flex-direction: column;
  padding: 4rem 2.4rem 12rem;
  gap: 2.3rem;
}

.top {
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  width: 100%;
}
.card {
  width: 100%;
  overflow: hidden;
  .profile-form-content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 1.25rem;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    .primary-gradient {
      min-width: 6.4rem;
    }
  }
  .user-item {
    display: flex;
    align-items: center;
    padding: 1.2rem;
    background: rgba(42, 42, 42, 0.3);
    border-radius: var(--radius-m);
    gap: 1.2rem;
    margin-bottom: 1.2rem;
    .primary-gradient {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
}

.dynamic-content {
  position: relative;
  .slide-in-left-leave-to,
  .slide-in-right-leave-to{
    position: absolute;
    inset: 0;
  }
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding-top: 2.4rem;
}
.sex-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}
</style>
