import Vue from 'vue'
import Router from 'vue-router'
import ConnectView from '@/components/ConnectView'
import HomeView from '@/components/HomeView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'connect',
      component: ConnectView
    },
    {
      path: '/game',
      name: 'game',
      component: HomeView
    }
  ]
})
