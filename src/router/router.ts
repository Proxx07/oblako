import { createRouter, createWebHistory } from 'vue-router';
import { checkActiveUser } from '@/middlewares/checkActiveUser.ts';
import { layoutMiddleware } from '@/middlewares/layoutMiddleware.ts';
import routes from './routes.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(layoutMiddleware);
router.beforeEach(checkActiveUser);
export default router;
