<script>
import axios from 'axios'

export default {
  data() {
    return {
      pageId: 'playlist-list',
      songs: [],
      playlist: {},
      tableTitle: [
        { key: 'number', value: '#', width: '3%' },
        { key: 'title', value: 'Title', width: '40%' },
        { key: 'album', value: 'Album', width: '30%' },
        { key: 'dateAdded', value: 'Date Added', width: '15%' },
        { key: 'duration', value: 'Duration', width: '10%' },
      ],
      tableTitleArray: [],
    }
  },
  async created() {
    this.fetchPlaylist()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchPlaylist();
      },
    },
  },
  methods: {
    async fetchPlaylist() {
      this.tableTitleArray = Object.entries(this.tableTitle).map(([key, value]) => ({ key, value }))

      const accessToken = localStorage.getItem('spotify_access_token')
      const playlistId = this.$route.params.id

      try {
        const responsePlaylist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (responsePlaylist.data) {
          this.playlist = {
            image: responsePlaylist.data.images[0].url,
            title: responsePlaylist.data.name,
            description: responsePlaylist.data.description,
          }
        }

        const responseTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (responseTracks.data) {
          this.songs = responseTracks.data.items.map((item, index) => {
            const dateAdded = new Date(item.added_at)
            const now = new Date()
            const diffTime = Math.abs(now - dateAdded)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 
            let formattedDate

            if (diffDays <= 1) {
              const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
              formattedDate = `${diffHours} hours ago`
            } else if (diffDays <= 7) {
              formattedDate = `${diffDays} days ago`
            } else if (diffDays <= 30) {
              const diffWeeks = Math.floor(diffDays / 7)
              formattedDate = `${diffWeeks} weeks ago`
            } else {
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ]
              formattedDate = `${monthNames[dateAdded.getMonth()]} ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`
            }

            return {
              id: index + 1,
              title: item.track.name,
              album: item.track.album.name,
              dateAdded: formattedDate,
              duration: new Date(item.track.duration_ms).toISOString().substr(14, 5),
            }
          })
        }
      } catch (error) {
        console.error('Error getting playlist songs:', error)
      }
    },
  },
}
</script>

<template>
   <div :class="pageId">
    <div class="bg-[#121212] text-white p-4 flex items-center">
        <img :src="playlist.image" alt="Playlist Image" class="playlist-header-image mr-6 bg-white rounded-md">
        <div class="">
            <h3>Playlist</h3>
            <h1 class="header-title text-white mb-2">{{ playlist.title }}</h1>
            <p class="text-sm text-gray-400 ">{{ playlist.description }}</p>
        </div>
    </div>
      <table class="table-auto text-left">
         <tr>
            <th class="px-4 py-2" v-for="item in tableTitle" :key="item.key" :style="{ width: item.width }">{{ item.value }}</th>
         </tr>
         <tbody>
         <tr v-for="(song, index) in songs" :key="song.id">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ song.title }}</td>
            <td class="border px-4 py-2">{{ song.album }}</td>
            <td class="border px-4 py-2">{{ song.dateAdded }}</td>
            <td class="border px-4 py-2">{{ song.duration }}</td>
         </tr>
         </tbody>
      </table>
   </div>
</template>