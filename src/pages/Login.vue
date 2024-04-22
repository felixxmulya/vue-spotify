<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      pageId: 'login-page',
      isOpen: false,
      links: [
        { text: 'Premium', href: 'https://www.spotify.com/premium/' },
        { text: 'Support', href: 'https://support.spotify.com/?_gl=1*x5gi86*_gcl_au*MTUwOTk0OTkwMS4xNzEwNDk2MDUw' },
        { text: 'Download', href: 'https://www.spotify.com/download/ios/' },
      ]
    }
  },
  created() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})
    window.location.hash = ''

    // If the hash contains an access token, the user was just redirected from Spotify
    if (hash.access_token) {
    localStorage.setItem('spotify_access_token', hash.access_token)
    this.$router.push('/home')
    }
  },
  methods: {
    ...mapActions('loginStore', ['redirectToLogin']),
    login() {
         this.$store.dispatch('redirectToLogin')
    },
  },
  computed: {
    ...mapState(['isLogin', 'isMobile']),
  },
}
</script>

<template>
  <div :class="pageId">
    <nav class="login-navbar bg-black">
      <div class="flex flex-row items-center justify-between">
        <router-link to="/" class="flex items-center text-white" :class="isMobile ? '' : 'px-4'" >
          <img src="https://i.ibb.co/FYbMXTm/spotify-icon.png" alt="Spotify" class="h-auto w-10 mr-2"/>
          <span class="spotify-title font-semibold text-xl tracking-tight">Spotify</span>
        </router-link>
        <div class="px-4 hidden md:block">
          <div class="text-sm text-white">
            <a v-for="link in links" :key="link.text" :href="link.href" class="block mt-4 md:inline-block md:mt-0 hover:text-green-500 mr-4">
              {{ link.text }}
            </a>
          </div>
        </div>
        <div class="md:hidden ml-auto">
          <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
      </div>

      <div v-if="isOpen" class="ml-auto">
        <div class="px-2 pt-2 pb-4">
          <a v-for="link in links" :key="link.text" :href="link.href" class="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-500 mr-4">
              {{ link.text }}
            </a>
        </div>
      </div>
    </nav>
    
    <div class="container mx-auto login-container flex flex-col justify-center">
      <img src="https://i.ibb.co/fC0FZgs/Spotify-Logo-RGB-Green.png" alt="Spotify-Logo-RGB-Green" class="spotify-logo">
      <button @click="login" class="login-btn mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full w-32 block mx-auto"> Log in </button>
    </div>
  </div>

</template>



<style lang="scss" scoped>

 @import '@/assets/main.scss';

</style>