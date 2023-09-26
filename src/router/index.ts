import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/counter/pages/Counter1Page.vue')
    },
    {
      path: '/setup',
      name: 'counter-setup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/counter/pages/Counter2PageSetup.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/clients/layout/ClientsLayout.vue'),
      redirect: { name: 'clients-list' },
      children: [
        {
          path: '/clients/list', name: 'clients-list', component: () => import('@/clients/pages/ListPage.vue')
        },
        {
          path: '/clients/:id', name: 'client-by-id', component: () => import('@/clients/pages/ClientPage.vue')
        }
      ]
    }
  ]
})

export default router
