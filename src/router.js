import Vue from 'vue'
import Router from 'vue-router'
import getUser from './user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './login/Login.vue')
    },
    {
      path: '/felog',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "felog" */ './clubs/List.vue')
    },
    {
      path: '/felog/:id',
      // beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "felag" */ './clubs/Single.vue')
    },
    {
      path: '/idkendur',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "about" */ './athletes/List.vue')
    },
    {
      path: '/idkendur/:id',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "idkandi" */ './athletes/Single.vue')
    },
    {
      path: '/herud',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "herud" */ './regions/List.vue')
    },
    {
      path: '/herud/:id',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "herud" */ './regions/Single.vue')
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

function hasSession () {
  return (to, from, next) => {
    const user = getUser()
    if (user) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
}
