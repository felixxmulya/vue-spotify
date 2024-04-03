<script>
import axios from 'axios'

export default {
  name: 'Playlists',
  inject: ['isMobile'],
  components: {

  },
  data() {
    return {
        playlists: [],
        pageId: 'playlistSpotify',
        isOpen: false,
    }
  },
  async created() {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    })
    this.playlists = response.data.items
  }
}
</script>

<template>
    <div :class="pageId">
        <div class="playlist-item flex flex-wrap overflow-auto">
            <div v-for="playlist in playlists" :key="playlist.id" class="w-full p-4 flex items-center gap-4 hover:bg-[#424242] cursor-pointer">
                <img :src="playlist.images[0].url" alt="Playlist cover" class="playlist-image" />
                <p>{{ playlist.name }}</p>
            </div>
        </div>
    </div>
</template>