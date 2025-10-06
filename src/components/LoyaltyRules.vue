<script setup lang="ts">
import { Button, Dialog } from 'primevue';
import { backArrow } from '@/assets/icons';
import VIcon from '@/components/UI/VIcon.vue';

defineProps<{
  modelValue: boolean
}>();

const model = defineModel<boolean>('modelValue');
const textJson = [
  {
    title: 'Общие положения',
    text: [
      'Программа лояльности Oblacko — «Бонусы от братьев» (далее — Программа) создана для поощрения постоянных гостей.',
      'Участие в Программе является добровольным и бесплатным.',
      'Настоящие Правила обязательны для всех Участников Программы.',
    ],
  },
  {
    title: 'Участие в Программе',
    text: [
      'Участником может быть любое физическое лицо, достигшее 21 года.',
      'Регистрация осуществляется через Telegram-бот Программы.',
      'Один Telegram-аккаунт = одна карта лояльности = один Участник.',
      'Для активации бонусов необходимо предоставить номер телефона.',
      'Нажатие кнопки «Start» в Telegram-боте означает согласие с настоящими Правилами и Политикой конфиденциальности.',
    ],
  },
  {
    title: 'Начисление бонусов',
    text: [
      'За каждый оплаченный чек начисляется 7% бонусов (1 бонус = 1 сум).',
      'Бонусы не начисляются:',
    ],
    list: [
      'на услуги доставки,',
      'на акционные предложения,',
      'на заказы после 00:00.',
    ],
    text2: [
      'Начисление происходит автоматически после оплаты чека.',
      'Бонусы начисляются начиная с первого визита.',
    ],
  },
  {
    title: 'Использование бонусов',
    text: [
      'Бонусы можно использовать только со следующего визита.',
      'Допускается списание не более 50% от суммы чека.',
      'Списание возможно только с одной карты за один заказ (объединение карт запрещено).',
      'Срок действия бонусов — до 31 декабря текущего года, после чего они аннулируются.',
    ],
  },
  {
    title: 'Ограничения и ответственность',
    text: [
      'Передача бонусов другим лицам невозможна.',
      'Повторная регистрация допускается только на другой номер телефона и считается новой картой.',
      'В случае нарушения Правил (мошенничество, недостоверные данные и т.п.) Организатор вправе заблокировать Участника и аннулировать бонусы.',
    ],
  },
];
</script>

<template>
  <Dialog
    v-model:visible="model"
    modal
    class="full-dialog"
  >
    <template #header>
      <div class="header">
        <div class="font-16-r">
          Правила пользования программой лояльности
        </div>
        <div class="font-14-l color-secondary">
          «Бонусы от братьев»
        </div>
      </div>
    </template>
    <template #closebutton>
      <Button text severity="secondary" size="small" style="padding: .7rem" @click="model = false">
        <VIcon :icon="backArrow" color="white" />
      </Button>
    </template>
    <div class="content">
      <template v-for="(item, itemIndex) in textJson" :key="itemIndex">
        <h3 class="font-16-l">
          {{ itemIndex + 1 }}. {{ item.title }}
        </h3>
        <p v-for="(paragraph, paragraphIndex) in item.text" :key="paragraphIndex">
          {{ itemIndex + 1 }}.{{ paragraphIndex + 1 }} {{ paragraph }}
        </p>
        <ul v-if="item.list">
          <li v-for="listElement in item.list" :key="listElement">
            {{ listElement }}
          </li>
        </ul>
      </template>
    </div>
    <template #footer>
      <div class="footer">
        Последнее обновление: 30 сентября 2025 г.
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  gap: .6rem;
  order: 2;
  margin-right: auto;
  padding-left: 1.6rem;
}
h3 {
  margin: 1.4rem 0;
  line-height: 1.3 !important;
}
p, li, .footer {
  color: var(--p-zinc-400);
  font: var(--font-16-l);
  margin-bottom: .8rem;
  line-height: 1.3 !important;
}

ul {
  padding-left: 2.4rem;
  line-height: 1.3 !important;
}
.footer {
  padding: 1.4rem 1rem;
  text-align: center;
  justify-content: center;
  width: 100%;
}
</style>
