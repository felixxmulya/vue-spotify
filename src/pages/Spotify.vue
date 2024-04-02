<script>
import NavbarSpotify from '../components/NavbarSpotify.vue'
import SideBarSpotify from '../components/SideBarSpotify.vue'
import PlaylistMediaSpotify from '../components/PlaylistMediaSpotify.vue'

export default {
  name: 'Spotify',
  inject: ['isMobile'],
  components: {
    SideBarSpotify,
    NavbarSpotify,
    PlaylistMediaSpotify
  },
  data() {
    return {
        pageId: 'spotify-page',
        isOpen: false,
    }
  },
}
</script>

<template>
    <div :class="pageId">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <side-bar-spotify/>
        </div>
        <div class="col-span-9">
          <div class="bg-[#121212] rounded-lg shadow-lg p-4 w-full h-full mb-5 header-sidebar">
            <div class="mb-5">
              <NavbarSpotify/>
            </div>
            <div class="mb-8">
              <PlaylistMediaSpotify/>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>