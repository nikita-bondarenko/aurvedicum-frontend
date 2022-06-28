import { createRouter, createWebHistory } from 'vue-router'
// import MainPage from '@/views/MainPage.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'main',
  //   component: MainPage
  // },

  {
    path: '/',
    name: 'dataProducts',
    component: () => import('../views/DataProducts.vue')
  },
  {
    path: '/data/categories',
    name: 'dataCategories',
    component: () => import('../views/DataCategories.vue')
  },
  {
    path: '/data/volumes',
    name: 'dataVolumes',
    component: () => import('../views/DataVolumes.vue')
  },
  {
    path: '/data/content',
    name: 'dataContent',
    component: () => import('../views/DataContent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
