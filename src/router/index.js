import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Community from '../views/Community.vue'
import Register from '../views/Register.vue'
import Messages from '../views/Messaging.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  {
    path: location.hostname + '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Community',
    name: 'Community',
    component: Community
  }
  ,
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
  ,
  {
    path: '/Messages',
    name: 'Messages',
    component: Messages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
