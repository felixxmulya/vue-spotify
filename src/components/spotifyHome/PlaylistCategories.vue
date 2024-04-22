<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'PlaylistCategories',

    components: {},
    data() {
        return {
            pageId: 'PlaylistCategories',
            isOpen: false,
            playlistFeatures: [],
        }
    },
    async created() {
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
                },
            })

            const playlists = response.data.playlists.items
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * playlists.length)
                this.playlistFeatures.push(playlists[randomIndex])
                playlists.splice(randomIndex, 1)
            }
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        selectPlaylist(playlist) {
            this.$router.push({ name: 'playlist', params: { id: playlist.id } })
        },
    },
    computed: {
        ...mapState(['isLogin']),
    }
}
</script>

<template>
    <div :class="pageId" v-if="isLogin">
        <h2 class="text-white mb-3">Featured Playlists</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
            <router-link v-for="playlist in playlistFeatures" :key="playlist.id" :to="`/playlist/${playlist.id}`" class="card p-2 rounded-md hover:bg-[#424242] cursor-pointer relative group">
                <div class="relative">
                    <img v-if="playlist.images && playlist.images.length > 0" :src="playlist.images[0].url" alt="Playlist cover" class="card-img-top object-fit rounded-md bg-white mb-2 w-auto h-auto">
                    <div class="absolute right-0 bottom-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button class="bg-green-500 text-black rounded-full h-14 w-14 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                                <path fill-Rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <p class="md:block">{{ playlist.name }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>