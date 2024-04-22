<script>
import SideBarSpotify from '../components/spotifyHome/SideBarSpotify.vue'
import NavbarSpotify from '../components/spotifyHome/NavbarSpotify.vue'
import PlaylistList from '../components/spotifyPlaylist/PlaylistList.vue'
import { mapState } from 'vuex'

export default {
    name: 'Playlist',
    components: {
        NavbarSpotify,
        SideBarSpotify,
        PlaylistList
    },
    data() {
        return {
            pageId: 'playlist-page',
            isOpen: false,
        }
    },
    computed: {
        ...mapState(['isSidebarVisible', 'isMobile']),
    },
    mounted() {
    this.$store.commit('SET_IS_MOBILE', window.innerWidth <= 640)
    window.addEventListener('resize', () => {
        this.$store.commit('SET_IS_MOBILE', window.innerWidth <= 640)
    })
    },
}
</script>

<template>
   <div :class="pageId">
    <div class="flex gap-4 h-full">
        <div :class="isSidebarVisible ? (isMobile ? 'w-1/3' : 'w-1/3') : 'w-full'">
            <side-bar-spotify v-if="isSidebarVisible"/>
        </div>
        <div class="w-full">
            <div class="bg-[#121212] rounded-lg shadow-lg p-4 h-full" :class="!isMobile ? 'w-full' : ''">
                <div class="mb-2">
                    <NavbarSpotify/>
                </div>
                <div>
                    <playlist-list/>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>