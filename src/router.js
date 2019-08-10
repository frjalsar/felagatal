import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
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
    },
    {
      path: '/passar/',
      name: 'passar',
      component: () => import(/* webpackChunkName: "passar" */ './views/passi.vue')
    },
    {
      path: '/passar/:athleteId',
      name: 'passar',
      component: () => import(/* webpackChunkName: "passarAthlete" */ './views/passi.vue')
    }
  ]
})
