<script>
export default {
  name: 'Login',
  inject: ['isMobile'],
  data() {
    return {
      isOpen: false,
      links: [
        { text: 'Premium', href: 'https://www.spotify.com/premium/' },
        { text: 'Support', href: 'https://support.spotify.com/?_gl=1*x5gi86*_gcl_au*MTUwOTk0OTkwMS4xNzEwNDk2MDUw' },
        { text: 'Download', href: 'https://www.spotify.com/download/ios/' },
      ]
    }
  }
}
</script>

<template id="login">
  <nav class="login bg-black" :class="isMobile() ? '' : ''">
    <div class="flex flex-row items-center justify-between">
      <div class="flex items-center text-white" :class="isMobile() ? '' : 'px-4'">
        <img src="https://i.ibb.co/FYbMXTm/spotify-icon.png" alt="Spotify" class="h-8 w-8 mr-2"/>
        <span class="spotify-title font-semibold text-xl tracking-tight">Spotify</span>
      </div>
      <div v-if="!isMobile()" class="px-4">
        <div class="text-sm text-white">
          <a v-for="link in links" :key="link.text" :href="link.href" class="block mt-4 md:inline-block md:mt-0 hover:text-green-500 mr-4">
            {{ link.text }}
          </a>
        </div>
      </div>
      <div v-else class="ml-auto">
        <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
    </div>

    <div v-if="isMobile() && isOpen" class="ml-auto">
      <div class="px-2 pt-2 pb-4">
        <a v-for="link in links" :key="link.text" :href="link.href" class="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-500 mr-4">
            {{ link.text }}
          </a>
      </div>
    </div>
  </nav>
  
  <div class="container mx-auto px flex justify-between">
    <div class="w-1/2">
      <img src="https://i.ibb.co/FYbMXTm/spotify-icon.png" alt="Spotify" class="h-8 w-8 mr-2"/>
    </div>
    <div class="w-1/2">
      <h1 class="text-xl font-bold">Welcome to Spotify</h1>
      <p class="text-sm">Please login to continue</p>
    </div>
  </div>
</template>



<style lang="scss" scoped>

 @import '@/assets/main.scss';

</style>