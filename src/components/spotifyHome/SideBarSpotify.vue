<script>
import { HomeIcon, SearchIcon, LibraryIcon } from '@heroicons/vue/solid'
import PlaylistSideBar from './PlaylistSideBar.vue'

export default {
  name: 'SideBarSpotify',
  inject: ['isMobile'],
  components: {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlaylistSideBar
  },
  data() {
    return {
        pageId: 'SideBarSpotify',
        isOpen: false,
    }
  },
}
</script>

<template>
    <div :class="pageId">
        <div class="bg-[#121212] rounded-lg shadow-lg p-6 w-full h-full mb-5 header-sidebar">
            <div class="mb-8">
                <img src="https://i.ibb.co/fC0FZgs/Spotify-Logo-RGB-Green.png" alt="Spotify-Logo-RGB-Green" class="spotify-logo">
            </div>
            <div class="mb-4 flex items-center text-white">
                <HomeIcon class="h-5 w-5 mr-2" />
                <router-link to="/home" class="">Home</router-link>
            </div>
            <div class="flex items-center text-white">
                <SearchIcon class="h-5 w-5 mr-2" />
                <router-link to="/search">Search</router-link>
            </div>
        </div>
        <div class="bg-[#121212] rounded-lg shadow-lg p-6 w-full h-full playlist-sidebar">
            <div class="mb-4 flex items-center hover:text-white">
                <LibraryIcon class="h-5 w-5 mr-2" />
                <router-link to="/playlist" >Your Library</router-link>
            </div>
            <div class="mb-4 flex items-center">
                <PlaylistSideBar/>
            </div>
        </div>

    </div>
</template>