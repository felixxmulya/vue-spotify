<script>
import axios from 'axios'

export default {
  name: 'PlaylistMediaSpotify',
  inject: ['isMobile'],
  components: {
  },
  data() {
    return {
        playlists: [],
        pageId: 'PlaylistMediaSpotify',
        isOpen: false,
        recentlyPlayedTracks: []
    }
  },
  async created() {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    })
    this.recentlyPlayedTracks = response.data.items;
  }
}
</script>

<template>
  <div :class="pageId">
      <div class="grid grid-cols-4 gap-4">
         <div v-for="track in recentlyPlayedTracks.slice(0, 8)" :key="track.played_at" class="flex flex-row bg-white shadow-sm rounded-lg relative group p-4">
            <div class="flex items-center justify-center flex-shrink-0 h-16 w-auto">
               <img class="h-full w-full object-cover" :src="track.track.album.images[0].url" alt="Album cover" />
            </div>
            <div class="flex justify-between items-center">
               <div class="flex flex-col ml-4">
                  <h2 class="text-sm font-semibold mb-2">{{ track.track.name }}</h2>
               </div>
               <div class="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                  <button class="bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                     <i class="fas fa-play"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>