import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/MainPage.vue'),
    meta: {
      layout: 'Default',
    },
  },

  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/pages/ContactsPage.vue'),
    meta: {
      layout: 'Default',
    },
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/AuthPage.vue'),
  },

  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/RegistrationPage.vue'),
  },

  {
    path: '/example',
    name: 'example',
    component: () => import.meta.env.DEV ? import('@/pages/Example.vue') : import('@/pages/Page404.vue'),
  },

  {
    path: '/status/:type',
    name: 'status',
    component: () => import('@/pages/StatusPage.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/Page404.vue'),
    meta: {
      layout: 'Empty',
    },
  },
];

export default routes;
