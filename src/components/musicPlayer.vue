<script>
import { PlayIcon, PauseIcon, ChevronRightIcon as NextIcon, ChevronLeftIcon as PrevIcon, VolumeUpIcon } from '@heroicons/vue/solid'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'musicPlayer',
    inject: ['isMobile'],
    components: {
        PlayIcon,
        PauseIcon,
        PrevIcon,
        NextIcon,
        VolumeUpIcon
    },
    data() {
        return {
            pageId: 'music-player',
            isOpen: false,
            isPlaying: false,
            volume: 30,
            track: 30,
            currentTrack: null
            
        }
    },
    computed: {
    ...mapState(['isLogin','currentlyPlayingTrack'])
    },
    mounted() {
    },
    watch: {
        isPlaying() {
            this.fetchCurrentlyPlayingTrack().then(track => {
                this.currentTrack = track
            })
        },
    },
    methods: {
        ...mapActions(['fetchCurrentlyPlayingTrack', 'resumeTrack', 'pauseTrack', 'skipToPreviousTrack', 'skipToNextTrack']),
        togglePlay() {
            console.log('togglePlay called')
            if (this.isPlaying) {
                console.log('Pausing track')
                this.isPlaying = false
                this.$store.dispatch('pauseTrack')
                this.fetchCurrentlyPlayingTrack()
            } else {
                console.log('Resuming track')
                this.isPlaying = true
                this.$store.dispatch('resumeTrack')
                this.fetchCurrentlyPlayingTrack()
            }
        },
        playTrack() {
            console.log('playTrack called')
            this.isPlaying = true
            this.$store.dispatch('resumeTrack')
            this.fetchCurrentlyPlayingTrack()
        },
        pauseTrack() {
            console.log('pauseTrack called')
            this.isPlaying = false
            this.$store.dispatch('pauseTrack')
            this.fetchCurrentlyPlayingTrack()
        },
        async prevTrack() {
        console.log('prevTrack called')
        await this.$store.dispatch('skipToPreviousTrack')
        this.isPlaying = true
        this.fetchCurrentlyPlayingTrack().then(track => {
            this.currentTrack = track
        })
        },
        async nextTrack() {
            console.log('nextTrack called')
            await this.$store.dispatch('skipToNextTrack')
            this.isPlaying = true
            this.fetchCurrentlyPlayingTrack().then(track => {
                this.currentTrack = track
            })
        },
        updateVolume(event) {
            this.volume = event.target.value
        },
        updateTrack(event) {
            this.track = event.target.value
        },
    }
}
</script>

<template>
    <div :class="pageId" class="pb-20" v-if="isLogin">
        <div class="bg-black text-white flex flex-col md:flex-row items-center px-12 fixed bottom-0 w-full h-auto justify-between">
            <div class="flex items-center gap-2 mb-4 md:mb-0">
                <img v-if="currentlyPlayingTrack" :src="currentlyPlayingTrack.albumUrl" alt="track image" class="w-14 h-14 rounded-md object-cover">
                <div v-if="currentlyPlayingTrack" class="ml-4" style="width: 200px">
                    <p class="text-sm truncate" :title="currentlyPlayingTrack.name">{{ currentlyPlayingTrack.name }}</p>
                    <p class="text-sm text-gray-400 truncate" :title="currentlyPlayingTrack.artist">{{ currentlyPlayingTrack.artist }}</p>
                </div>
                <div v-else class="ml-4" style="width: 200px">
                    <p class="text-sm truncate">No track is currently playing</p>
                    <p class="text-sm text-gray-400 truncate"></p>
                </div>
            </div>
            <div class="flex flex-col items-center w-full md:w-1/3 mb-4 md:mb-0 mt-1">
                <div class="flex items-center">
                    <button @click="prevTrack">
                        <PrevIcon class="h-10 w-10 text-white" />
                    </button>
                    <button @click="isPlaying ? pauseTrack() : playTrack()">
                        <PlayIcon v-if="!isPlaying" class="h-10 w-10 text-white" />
                        <PauseIcon v-else class="h-10 w-10 text-white" />
                    </button>
                    <button @click="nextTrack">
                        <NextIcon class="h-10 w-10 text-white" />
                    </button>
                </div>
                <div class="mb-3 w-full">
                    <input id="track" type="range" min="0" max="100" v-model="track" @input="updateTrack" class="w-full">
                </div>
            </div>
            <div class="flex items-center ">
                <label for="volume" class="mr-3">
                    <VolumeUpIcon class="h-5 w-5 text-white" />
                </label>
                <input id="volume" type="range" min="0" max="100" v-model="volume" @input="updateVolume">
            </div>
        </div>
    </div>
</template>

