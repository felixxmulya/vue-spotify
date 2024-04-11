<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PlaylistSideBar',
  inject: ['isMobile'],
  components: {

  },
  data() {
    return {
        pageId: 'PlaylistSideBarpotify',
        isOpen: false,
    }
  },
  computed: {
    ...mapState(['playlists']),
  },
  methods: {
    ...mapActions(['fetchPlaylists']),
  },
  created() {
    this.fetchPlaylists()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal) {
        this.fetchPlaylists(newVal);
      },
    },
  },
}
</script>

<template>
    <div :class="pageId">
        <div class="playlist-item flex flex-wrap overflow-auto">
            <div v-for="playlist in playlists" :key="playlist.id" class="w-full">
              <router-link :to="`/playlist/${playlist.id}`" class="w-full p-4 flex items-center gap-4 hover:bg-[#424242] rounded-md cursor-pointer">
                <img :src="playlist.images[0].url" alt="Playlist cover" class="playlist-image" />
                <p>{{ playlist.name }}</p>
              </router-link>
            </div>
        </div>
    </div>
</template>