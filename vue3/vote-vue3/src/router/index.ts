import { createRouter, createWebHistory } from 'vue-router'
import SelectCreate from '../views/selectCreate.vue'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: 'select-create',
          component: SelectCreate,
        },
        {
          path: 'me',
          component: () => import('../views/Me.vue'),
        }
      ]
    },
    {
      path: '/create',
      component: () => import('@/views/CreateVote.vue'),
    },
    
    {
      path: '/vote/:id',
      component: () => import('../views/Vote.vue'),
    },
    {
      path: '/my-votes',
      component: () => import('../views/MyVotes.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
    }
  ],
})

export default router
