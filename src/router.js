import Vue from 'vue'
import Router from 'vue-router'
import getUser from './user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/felog',
      name: 'clubs-list',
      // beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "felog" */ './views/clubs-list.vue')
    },
    {
      path: '/felog/:id',
      name: 'clubs-single',
      // beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "felag" */ './views/clubs-single.vue')
    },
    {
      path: '/idkendur',
      name: 'athletes-list',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "about" */ './views/athletes-list.vue')
    },
    {
      path: '/idkendur/:id',
      name: 'athletes-single',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "idkandi" */ './views/athletes-single.vue')
    },
    {
      path: '/herud',
      name: 'regions-list',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "herud" */ './views/regions-list.vue')
    },
    {
      path: '/passar/',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "passar" */ './views/passi.vue')
    },
    {
      path: '/passar/:athleteId',
      beforeEnter: hasSession(),
      component: () => import(/* webpackChunkName: "passarAthlete" */ './views/passi.vue')
    }
  ]
})

function hasSession () {
  return (to, from, next) => {
    const user = getUser()
    if (user) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
}
