<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PlaylistMediaSpotify',
  components: {
  },
  data() {
    return {
        pageId: 'PlaylistMediaSpotify',
        isOpen: false,
    }
  },
  computed: {
    ...mapState(['isLogin', 'recentlyPlayedTracks']),
  },
  created() {
    this.$store.dispatch('fetchRecentlyPlayedTracks')
  },
  methods: {
    ...mapActions(['resumeTrack']),
    truncateText(text) {
      return text.length > 15 ? text.slice(0, 15) + '...' : text
    },
    handleClick(track) {
      console.log(track)
    }
  },
}
</script>

<template>
  <div :class="pageId" v-if="isLogin">
    <h2 class="text-white mb-3">Welcome Back</h2>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="track in recentlyPlayedTracks.slice(0, 8)" :key="track.played_at" :to="`/playlist/${track.track.id}`" class="flex flex-row bg-[#2e2e2e] shadow-sm rounded-lg relative group p-2 items-center hover:bg-[#424242] cursor-pointer">
        <img class="h-14 w-14 object-cover rounded-md" :src="track.track.album.images[0].url" alt="Album cover" :title="(track.track.name)" />
        <h2 class="text-sm font-semibold mb-2 hidden sm:block mx-2" :title="(track.track.name)">{{ truncateText(track.track.name) }}</h2>
        <div class="justify-items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto hidden sm:block md:block">
          <button @click="resumeTrack(track.track.id)" class="bg-green-500 text-black rounded-full h-14 w-14 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>