import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/age',
    name: 'age',
    component: () => import('@/pages/AgePage.vue'),
    meta: {
      layout: 'Empty',
    },
  },

  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/MainPage.vue'),
    meta: {
      layout: 'Default',
    },
  },

  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/Profile.vue'),
  },

  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/pages/ContactsPage.vue'),
  },

  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('@/pages/PrivacyPolicyPage.vue'),
    meta: {
      layout: 'Empty',
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
