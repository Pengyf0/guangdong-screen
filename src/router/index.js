import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import OperateView from '../views/OperateView.vue'
import IntegralView from '../views/IntegralView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/OperateView',
    name: 'OperateView',
    component: OperateView
  },
  {
    path: '/IntegralView',
    name: 'IntegralView',
    component: IntegralView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router