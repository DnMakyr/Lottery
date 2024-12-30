import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  linkActiveClass: 'text-blue-500',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/consolation',
      name: 'Consolation',
      component: () => import('../views/ConsolationView.vue'),
    },
    {
      path: '/third',
      name: 'Third Prize Drawing',
      component: () => import('../views/ThirdView.vue'),
    },
    {
      path: '/second',
      name: 'Second Prize Drawing',
      component: () => import('../views/SecondView.vue'),
    },
    {
      path: '/first',
      name: 'First Prize Drawing',
      component: () => import('../views/FirstView.vue'),
    },
    {
      path: '/deluxe',
      name: 'Deluxe Prize Drawing',
      component: () => import('../views/DeluxeView.vue'),
    },
    {
      path: '/winners',
      name: 'Winners',
      component: () => import('../views/WinnerView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = String(to.meta.title) || 'Default Title'
  }
})

export default router
