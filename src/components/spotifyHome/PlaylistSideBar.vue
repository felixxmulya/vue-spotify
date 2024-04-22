<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PlaylistSideBar',
  components: {

  },
  data() {
    return {
        pageId: 'PlaylistSideBarpotify',
        isOpen: false,
    }
  },
  computed: {
    ...mapState(['userPlaylists', 'isMobile']),
  },
  methods: {
    ...mapActions(['fetchUserPlaylists']),
  },
  created() {
    this.fetchUserPlaylists()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal) {
        this.fetchUserPlaylists(newVal)
      },
    },
  },
}
</script>

<template>
  <div :class="pageId">
      <div class="playlist-item flex flex-wrap overflow-auto">
          <div v-for="playlist in userPlaylists" :key="playlist.id" class="w-full">
            <router-link :to="`/playlist/${playlist.id}`" class="w-full flex items-center gap-4 rounded-md cursor-pointer" :class="[isMobile ? 'p-2 justify-center' : 'p-4', {'hover:bg-[#424242]': $route.path !== `/playlist/${playlist.id}`, 'bg-[#424242]': $route.path === `/playlist/${playlist.id}`}]">
              <img v-if="playlist.images && playlist.images.length > 0" :src="playlist.images[0].url" alt="Playlist cover" class="playlist-image"/>
              <p class="hidden md:block" >{{ playlist.name }}</p>
            </router-link>
          </div>
      </div>
  </div>
</template>