import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../pages/Home.vue'
import CompanyView from '../pages/Company.vue'
import CalculatorView from '../pages/Calculator.vue'

import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'


import { useAppStore } from '@/stores/app';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/company',
      name: 'company',
      component: CompanyView
    },

    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})


router.beforeEach((to) => {

  const appRef = useAppStore();

  if (to.path.includes('login') || to.path.includes('signup') || to.path.includes('reset-password') || to.name.includes('static')) {
    appRef.route = 'static'
  } else {
    appRef.route = 'app'
  }

})

export default router
