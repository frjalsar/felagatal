import Vue from 'vue'
import Router from 'vue-router'
import getUser from './user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/idkendur',
      component: () => import(/* webpackChunkName: "about" */ './athletes/List.vue')
    },
    {
      path: '/idkendur/:id',
      component: () => import(/* webpackChunkName: "idkandi" */ './athletes/Single.vue')
    },
    {
      path: '/felog',
      component: () => import(/* webpackChunkName: "felog" */ './clubs/List.vue')
    },
    {
      path: '/felog/:id',
      component: () => import(/* webpackChunkName: "felag" */ './clubs/Single.vue')
    },
    {
      path: '/herud',
      component: () => import(/* webpackChunkName: "herud" */ './regions/List.vue')
    },
    {
      path: '/herud/:id',
      component: () => import(/* webpackChunkName: "herud" */ './regions/Single.vue')
    },
    {
      path: '/felagasaga/:id',
      component: () => import(/* webpackChunkName: "felagasaga" */ './membership/Single.vue')
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './login/Login.vue')
    },
    {
      path: '/passar/',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "passar" */ './passi/Passi.vue')
    },
    {
      path: '/passar/:athleteId',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "passarAthlete" */ './passi/Passi.vue')
    }
  ]
})

// Out of date
function hasSession () {
  return (to, from, next) => {
    console.log('hasSession')
    const user = getUser()
    if (user) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
}
