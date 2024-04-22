<script>
import { mapActions, mapState } from 'vuex'
import { PlayIcon } from '@heroicons/vue/solid'

export default {
  components: {
    PlayIcon,
  },
  data() {
    return {
      pageId: 'playlist-list',
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
  created() {
    this.fetchPlaylistSong(this.$route.params.id)
  },
  computed: {
    ...mapState(['selectedPlaylist', 'songs', 'isMobile'])
  },
  methods: {
    ...mapActions(['fetchPlaylistSong']),
    truncatedTitle(title) {
      return title.length > 40 ? title.substring(0, 35) + '...' : title
    },
    truncatedAlbum(album) {
      return album.length > 40 ? album.substring(0, 35) + '...' : album
    },
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchPlaylistSong(this.$route.params.id)
      },
    },
  },
}
</script>

<template>
   <div :class="pageId">
    <div class="bg-[#121212] text-white p-4 flex items-center" v-if="selectedPlaylist">
        <img :src="selectedPlaylist.image" alt="Playlist Image" class="playlist-header-image mr-6 bg-white rounded-md" >
        <div class="">
            <h3 >Playlist</h3>
            <h1 class="header-title text-white mb-5">{{ selectedPlaylist.title }}</h1>
            <p class="text-sm text-gray-400 " >{{ selectedPlaylist.description }}</p>
        </div>
    </div>
    <table class="table-auto text-left" >
        <tr>
          <th class="px-4 py-2" v-for="item in tableTitle" :key="item.key" :style="{ width: item.width }">{{ item.value }}</th>
        </tr>
        <tbody>
        <tr v-for="(song, index) in songs" :key="song.id" class="hover:bg-[#424242] rounded-md cursor-pointer">
          <td class="border px-4 py-2 relative group">
            <span class="opacity-100 group-hover:opacity-0">{{ index + 1 }}</span>
            <span class="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
                        <path fill-Rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
            </span>
          </td>
          <td class="border px-4 py-2" :title="song.title">{{ truncatedTitle(song.title) }}</td>
          <td class="border px-4 py-2" :title="song.album">{{ truncatedAlbum(song.album) }}</td>
          <td class="border px-4 py-2">{{ song.dateAdded }}</td>
          <td class="border px-4 py-2">{{ song.duration }}</td>
        </tr>
        </tbody>
    </table>
   </div>
</template>