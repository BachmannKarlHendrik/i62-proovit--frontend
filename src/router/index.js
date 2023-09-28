import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/athlete',
    name: 'athlete',
    component: () => import( '../views/AthleteView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
