import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },

  {
    path: '/data/products',
    name: 'dataProducts',
    component: () => import(/* webpackChunkName: "about" */ '../views/DataProducts.vue')
  },
  {
    path: '/data/categories',
    name: 'dataCategories',
    component: () => import(/* webpackChunkName: "about" */ '../views/DataCategories.vue')
  },
  {
    path: '/data/volumes',
    name: 'dataVolumes',
    component: () => import(/* webpackChunkName: "about" */ '../views/DataVolumes.vue')
  },
  {
    path: '/data/content',
    name: 'dataContent',
    component: () => import(/* webpackChunkName: "about" */ '../views/DataContent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
