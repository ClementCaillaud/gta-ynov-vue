import Vue from 'vue'
import Router from 'vue-router'
import Accueil from './views/Accueil.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About//() => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
