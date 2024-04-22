<script>
import { HomeIcon, SearchIcon, LibraryIcon } from '@heroicons/vue/solid'
import PlaylistSideBar from './PlaylistSideBar.vue'
import { mapState } from 'vuex'

export default {
    name: 'SideBarSpotify',

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
    computed: {
        ...mapState(['isSidebarVisible', 'isMobile']),
    },
}
</script>

<template>
    <div :class="pageId">
        <div class="bg-[#121212] rounded-lg shadow-lg p-6 w-full h-full mb-5 header-sidebar">
            <div class="mb-8">
                <img src="https://i.ibb.co/fC0FZgs/Spotify-Logo-RGB-Green.png" alt="Spotify-Logo-RGB-Green" class="spotify-logo">
            </div>
            <div class="mb-4 flex items-center text-white" :class="isMobile ? 'justify-center' : ''">
                <router-link to="/home" class="flex items-center" >
                    <HomeIcon class="h-5 w-5 mr-2"  />
                    <p class="hidden sm:block">Home</p>
                </router-link>
            </div>
            <!--
            <div class="flex items-center text-white">
                <router-link to="/search" class="flex items-center justify-center">
                    <SearchIcon class="h-5 w-5 mr-2" />
                    <p class="hidden md:block">Search</p>
                </router-link>
            </div>
            -->
        </div>
        <div class="bg-[#121212] rounded-lg shadow-lg w-full h-full playlist-sidebar" :class="isMobile ? '' : 'p-6'">
            <div class="mb-4 flex items-center hover:text-white cursor-pointer" :class="isMobile ? 'justify-center' : ''">
                <LibraryIcon class="h-5 w-5 mr-2"/>
                <p class="hidden sm:block">Your Library</p>
            </div>
            <div class="flex items-center">
                <PlaylistSideBar/>
            </div>
        </div>
    </div>
</template>
