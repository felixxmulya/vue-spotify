<script>
import NavbarSpotify from '../components/NavbarSpotify.vue'
import SideBarSpotify from '../components/SideBarSpotify.vue'
import PlaylistMediaSpotify from '../components/PlaylistMediaSpotify.vue'
import PlaylistCategories from '../components/PlaylistCategories.vue'

export default {
  name: 'Spotify',
  inject: ['isMobile'],
  components: {
    SideBarSpotify,
    NavbarSpotify,
    PlaylistMediaSpotify,
    PlaylistCategories
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
    <div :class="pageId" class=" overflow-auto">
      <div class="grid grid-cols-12 gap-4 h-full">
        <div class="col-span-3 h-full">
          <side-bar-spotify/>
        </div>
        <div class="col-span-9 h-full">
          <div class="bg-[#121212] rounded-lg shadow-lg p-4 w-full h-full mb-5 header-sidebar ">
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