import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Spotify from '../pages/Spotify.vue'
import Playlist from '../pages/Playlist.vue'
import loginStore from '../stores/loginStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: '',
      component: Spotify,
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: Playlist
    }
  ]
})

export default router
