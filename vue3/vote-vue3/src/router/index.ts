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
          path: '',
          redirect: 'select-create'
        },
        {
          path: 'select-create',
          // alias: '', 
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
      path: '/my-settings',
      component: () => import('../views/MySettings.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
    }
  ],
})

export default router
