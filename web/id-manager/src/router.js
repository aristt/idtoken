import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Address from './components/Address.vue'


import
userService
from "./userService"

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Address,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
      meta: {
        requiresAuth: true
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!userService.isAuthenticated()) {
      console.log('not authenticated')
      next({
        name: 'login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      console.log('authenticated')
      next()
    }
  } else {
    next()
  }
})

export default router
