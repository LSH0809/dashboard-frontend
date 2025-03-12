import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ServicesView from '../views/ServicesView.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    alias: '/home'
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-menu-item'
})

router.beforeEach((to, from, next) => {
  if (to.name === 'home') {
    to.matched[0].components.default = () => import('../views/HomeView.vue')
  }
  next()
})

export default router 