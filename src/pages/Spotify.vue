<script>
import NavbarSpotify from '../components/spotifyHome/NavbarSpotify.vue'
import SideBarSpotify from '../components/spotifyHome/SideBarSpotify.vue'
import PlaylistMediaSpotify from '../components/spotifyHome/PlaylistMediaSpotify.vue'
import PlaylistCategories from '../components/spotifyHome/PlaylistCategories.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import { mapState } from 'vuex'

export default {
  name: 'Spotify',
  components: {
    SideBarSpotify,
    NavbarSpotify,
    PlaylistMediaSpotify,
    PlaylistCategories,
    MusicPlayer
  },
  data() {
    return {
        pageId: 'spotify-page',
        isOpen: false,
    }
  },
  computed: {
    ...mapState(['isLogin', 'isSidebarVisible']),
  },
}
</script>

<template>
    <div :class="pageId" >
      <div class="flex gap-4 h-full">
        <div class="w-1/3">
          <side-bar-spotify v-if="isSidebarVisible"/>
        </div>
        <div class="w-full ">
          <div class="bg-[#121212] rounded-lg shadow-lg p-4 main-home h-full">
            <div class="mb-5">
              <NavbarSpotify/>
            </div>
            <div class="mb-5">
              <PlaylistMediaSpotify/>
            </div>
            <div class="mb-5">
              <PlaylistCategories/>
            </div>
            <div class="mb-5">
              <PlaylistCategories/>
            </div>
          </div>
        </div>

        </div>
    </div>
</template>