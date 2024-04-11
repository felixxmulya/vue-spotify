<script>
import SideBarSpotify from '../components/spotifyHome/SideBarSpotify.vue'
import NavbarSpotify from '../components/spotifyHome/NavbarSpotify.vue'
import PlaylistList from '../components/spotifyPlaylist/PlaylistList.vue'

export default {
  name: 'Playlist',
  inject: ['isMobile'],
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
  
}
</script>

<template>
   <div :class="pageId" class="h-full w-full">
    <div class="flex grid grid-cols-12 gap-4">
        <div class="col-span-3 h-full">
            <side-bar-spotify/>
        </div>
        <div class="col-span-9 h-full">
            <div class="bg-[#121212] rounded-lg shadow-lg p-4 w-full h-full ">
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