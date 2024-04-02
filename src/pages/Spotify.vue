<script>
import SideBarSpotify from '../components/SideBarSpotify.vue'

export default {
  name: 'Spotify',
  inject: ['isMobile'],
  components: {
    SideBarSpotify
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
          <!-- The rest of your Spotify page content goes here -->
        </div>
      </div>
    </div>
</template>