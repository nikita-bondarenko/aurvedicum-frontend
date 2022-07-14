import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    name: 'products',
    component: () => import('../views/DataProducts.vue')
  },
  {
    path: '/:id',
    name: 'product',
    component: () => import('../views/DataProduct.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
