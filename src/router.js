import Vue from 'vue'
import Router from 'vue-router'
import PageAccueil from './views/Accueil.vue'
import PageGTA from './views/GTA.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: PageAccueil
    },
    {
      path: '/gta',
      name: 'gta',
      component: PageGTA
    }
  ]
})
