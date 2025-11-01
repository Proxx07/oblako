<script setup lang="ts">
import { Button, Card } from 'primevue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  calendar,
  edit as editIcon,
  email as emailIcon, listIcon,
  logout, loyalty,
  phone as phoneIcon,
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
    { title: 'Имя', value: `${userStore.userInfo.name} ${userStore.userInfo.surname || ''}`, icon: user },
    { title: 'Телефон', value: userStore.userInfo.phone, icon: phoneIcon },
    { title: 'Email', value: userStore.userInfo.email, icon: emailIcon },
    { title: 'Дата рождения', value: userStore.userInfo.birthday?.split(' ')[0] ?? '', icon: calendar },
  ];
});

const privacyDialog = ref(false);
const loyaltyDialog = ref(false);

const actions = [
  {
    title: 'Политика конфиденциальности',
    icon: listIcon,
    action: () => loyaltyDialog.value = true,
  },

  {
    title: 'Правила лояльности',
    icon: loyalty,
    action: () => privacyDialog.value = true,
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
        <div class="note-text">
          Управление аккаунтом
        </div>
      </div>
    </template>

    <div style="display: flex; flex-direction: column; gap: 1.2rem; width: 100%;">
      <div class="edit-text">
        <div class="font-16-l" style="line-height: 49px !important;">
          Личная информация
        </div>
        <Button v-if="!edit" text size="small" @click="activateEdit">
          <VIcon :icon="editIcon" :size="24" />
        </Button>
      </div>
      <Card v-if="userStore.userInfo" class="card">
        <template #content>
          <div class="profile-form-content">
            <div class="dynamic-content">
              <Transition name="slide-in-left">
                <div v-if="!edit">
                  <div v-for="item in userInfoList" :key="item.title" class="user-item">
                    <VIcon :icon="item.icon" class="icon" :size="20" span-bg="var(--form-field-bg)" color="var(--primary-500)" />
                    <div class="text" style="display: flex; flex-direction: column; gap: .4rem">
                      <div class="font-12-l" style="opacity: .6;">
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
                    <Button label="Отмена" severity="secondary" fluid @click.prevent="deactivateEdit" />
                    <Button
                      type="submit"
                      label="Сохранить"
                      :loading="loading"
                      fluid
                    />
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
              <VIcon :icon="action.icon" class="icon" :size="24" />
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
.edit-text {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;
}
.card {
  width: 100%;
  overflow: hidden;
  .profile-form-content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: .8rem;
  }
  .user-item {
    display: flex;
    align-items: center;
    padding: .2rem 0;
    gap: 1.2rem;
    margin-bottom: 1.2rem;
    .icon {
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
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
