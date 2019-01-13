import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/felog/:id',
      name: 'felog',
      component: () => import(/* webpackChunkName: "felag" */ './views/felag.vue')
    },
    {
      path: '/idkendur',
      name: 'idkendur',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/idkendur/:id',
      name: 'athlete',
      component: () => import(/* webpackChunkName: "idkandi" */ './views/idkandi.vue')
    },
    {
      path: '/herud/',
      name: 'herud',
      component: () => import(/* webpackChunkName: "herud" */ './views/herud.vue')
    }
  ]
})
