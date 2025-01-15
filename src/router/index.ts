import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  linkActiveClass: 'text-red-800',
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
      meta: {
        title: 'Giải Khuyến Khích',
      },
    },
    {
      path: '/third',
      name: 'Third Prize Drawing',
      component: () => import('../views/ThirdView.vue'),
      meta: {
        title: 'Giải Ba',
      },
    },
    {
      path: '/second',
      name: 'Second Prize Drawing',
      component: () => import('../views/SecondView.vue'),
      meta: {
        title: 'Giải Nhì',
      },
    },
    {
      path: '/first',
      name: 'First Prize Drawing',
      component: () => import('../views/FirstView.vue'),
      meta: {
        title: 'Giải Nhất',
      },
    },
    // {
    //   path: '/deluxe',
    //   name: 'Deluxe Prize Drawing',
    //   component: () => import('../views/DeluxeView.vue'),
    //   meta: {
    //     title: 'Giải Đặc Biệt',
    //   },
    // },
    // {
    //   path: '/desk',
    //   name: 'Desk Prize Drawing',
    //   component: () => import('../views/LuckyDeskView.vue'),
    //   meta: {
    //     title: 'Bàn Làm Việc May Mắn',
    //   },
    // },
  ],
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = String(to.meta.title) || 'Default Title'
  }
})

export default router
