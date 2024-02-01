import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: CityView
    },
    {
      path: '/register',
      name: 'registerView',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
  
  ]
})

export default router
