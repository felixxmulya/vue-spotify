import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Spotify from '../pages/Spotify.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/spotify',
      name: '',
      component: Spotify
    }
  ]
})

export default router
