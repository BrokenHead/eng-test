import { createRouter, createWebHistory } from 'vue-router';
import ErrorPage from '@/pages/ErrorPage.vue';
import HomePage from '@/pages/HomePage.vue';
import SignInPage from '@/pages/SignInPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignInPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
