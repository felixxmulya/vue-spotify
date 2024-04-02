<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import axios from 'axios'

export default {
  name: 'NavbarSpotify',
  inject: ['isMobile'],
  components: {
   ChevronLeftIcon,
   ChevronRightIcon
  },
  data() {
    return {
        playlists: [],
        pageId: 'NavbarSpotify',
        isOpen: false,
        imageUrl: ''
    }
  },
  async created() {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    })
    this.imageUrl = response.data.images[0].url;
  }
}
</script>

<template>
    <div :class="pageId">
      <nav class="h-16 flex items-center px-8 text-white">
         <button class="mr-2 bg-black rounded-full p-1">
            <ChevronLeftIcon class="h-6 w-6 text-white"/>
         </button>
         <button class="mr-2 bg-black rounded-full p-1">
            <ChevronRightIcon class="h-6 w-6 text-white"/>
         </button>
         <div class="relative ml-auto z-50">
            <button @click="isOpen = !isOpen" class="relative z-10 block rounded-full bg-black p-1 focus:outline-none">
               <img class="h-8 w-8 rounded-full" :src="imageUrl" alt="user-profile" />
            </button>
            <div v-show="isOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#242424] ring-1 ring-black ring-opacity-5">
               <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="#" class="block px-4 py-2 text-sm hover:bg-[#2a2a2a] rounded-md " role="menuitem">Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm hover:bg-[#2a2a2a] rounded-md " role="menuitem">Settings</a>
                  <a href="#" class="block px-4 py-2 text-sm border-t border-gray-600 hover:bg-[#2a2a2a] rounded-md " role="menuitem">Log out</a>
               </div>
            </div>
         </div>
      </nav>
    </div>
</template>