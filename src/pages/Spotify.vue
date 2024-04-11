<script>
import NavbarSpotify from '../components/spotifyHome/NavbarSpotify.vue'
import SideBarSpotify from '../components/spotifyHome/SideBarSpotify.vue'
import PlaylistMediaSpotify from '../components/spotifyHome/PlaylistMediaSpotify.vue'
import PlaylistCategories from '../components/spotifyHome/PlaylistCategories.vue'
import { mapState } from 'vuex'

export default {
  name: 'Spotify',
  inject: ['isMobile'],
  components: {
    SideBarSpotify,
    NavbarSpotify,
    PlaylistMediaSpotify,
    PlaylistCategories,
  },
  data() {
    return {
        pageId: 'spotify-page',
        isOpen: false,
    }
  },
  computed: {
    ...mapState(['isLogin']),
  },
}
</script>

<template >
    <div :class="pageId" >
      <div class="flex grid grid-cols-12 gap-4">
        <div class="col-span-3 h-full">
          <side-bar-spotify/>
        </div>
        <div class="col-span-9 h-full ">
          <div class="bg-[#121212] rounded-lg shadow-lg p-4 w-full h-full main-home">
            <div class="mb-5">
              <NavbarSpotify/>
            </div>
            <div class="mb-5">
              <PlaylistMediaSpotify/>
            </div>
            <div class="mb-5">
              <PlaylistCategories/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>