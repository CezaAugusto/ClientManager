import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contacts/:id',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue')
  },
  {
    path: '/addresses/:id',
    name: 'Addresses',
    component: () => import('../views/Addresses.vue')
  },
  {
    path: '/tenants/:user/:address',
    name: 'Tenants',
    component: () => import('../views/Tenants.vue')
  },
  {
    path: '/tenants-contacts/:user/:address',
    name: 'TenantsContacts',
    component: () => import('../views/TenantsContacts.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
