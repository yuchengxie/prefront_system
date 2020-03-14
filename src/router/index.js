import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'submit',
    component: () => import('../views/Submit.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/Submit.vue')
  },
  {
    path: '/query',
    name: 'query',
    component: () => import('../views/Query.vue')
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/Task.vue')
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('../views/Other.vue')
  }

  // {
  //   path: '/',
  //   name: 'submit',
  //   component: () => import('../views/Submit.vue')
  // },
  // {
  //   path: '/submit',
  //   name: 'submit',
  //   component: () => import('../views/Submit.vue')
  // },
  // {
  //   path: '/query',
  //   name: 'query',
  //   component: () => import('../views/Query.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router