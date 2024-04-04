<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'PlaylistCategories',
    inject: ['isMobile'],
    components: {},
    data() {
        return {
            pageId: 'PlaylistCategories',
            isOpen: false,
            playlists: [], // Changed from playlist to playlists
        };
    },
    async created() {
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
                },
            });

            const playlists = response.data.playlists.items;
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * playlists.length);
                this.playlists.push(playlists[randomIndex]);
                playlists.splice(randomIndex, 1); // Remove the selected playlist from the array
            }
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
    },
    computed: {
    ...mapState(['isLogin']),
    }
};
</script>

<template>
    <div :class="pageId">
        <div class="" v-if="isLogin">
            <h2 class="text-white mb-3">Featured Playlists</h2>
            <div class="grid grid-cols-7 gap-4">
                <div v-for="playlist in playlists" :key="playlist.id" class="card p-2 rounded-md hover:bg-[#424242] cursor-pointer" @click="playPlaylist(playlist.uri)">
                    <img :src="playlist.images[0].url" alt="Playlist cover" class="card-img-top object-fit rounded-md bg-white mb-2">
                    <div class="card-body">
                        <h5 class="card-title">{{ playlist.name }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>