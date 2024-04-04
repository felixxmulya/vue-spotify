<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { mapState } from 'vuex';

export default {
   name: 'NavbarSpotify',
   inject: ['isMobile'],
   components: {
      ChevronLeftIcon,
      ChevronRightIcon
   },
   data() {
      return {
         pageId: 'NavbarSpotify',
         isOpen: false,
      }
   },
   methods: {
      login() {
         this.$store.dispatch('redirectToLogin')
      },
      logout() {
      this.$store.dispatch('logout');
      this.isOpen = false;
    }
   },
   computed: {
    ...mapState(['isLogin', 'imageUrl']),
  },
  created() {
    this.$store.dispatch('fetchUserData');
  },
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
            <button @click="isOpen = !isOpen" v-if="isLogin" class="relative z-10 block rounded-full bg-black p-1 focus:outline-none">
               <img class="h-9 w-9 rounded-full" :src="imageUrl" alt="user-profile" />
            </button>
            <div v-else>
                  <button @click="login" class="block px-6 py-2 text-sm bg-white rounded-full text-black hover:bg-gray-100">Login</button>
               </div>
            <div v-show="isOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#242424] ring-1 ring-black ring-opacity-5">
               <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <template v-if="isLogin">
                     <a href="https://www.spotify.com/us/account/overview/" target="_blank" class="block px-4 py-2 text-sm hover:bg-[#2a2a2a] rounded-md " role="menuitem">Account</a>
                     <a href="#" class="block px-4 py-2 text-sm hover:bg-[#2a2a2a] rounded-md " role="menuitem">Profile</a>
                     <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm border-t border-gray-600 hover:bg-[#2a2a2a] rounded-md " role="menuitem">Log out</a>
                  </template>
               </div>
            </div>
         </div>
      </nav>
    </div>
</template>