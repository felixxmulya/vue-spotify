<script>
import { VolumeUpIcon, VolumeOffIcon} from '@heroicons/vue/solid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRandom, faStepBackward, faPlayCircle, faPauseCircle, faPause, faStepForward, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapState, mapActions } from 'vuex'

library.add(faRandom, faStepBackward, faPlayCircle, faPauseCircle, faPause, faStepForward, faRepeat)

export default {
    name: 'musicPlayer',

    components: {
        VolumeUpIcon,
        FontAwesomeIcon,
        VolumeOffIcon
    },
    data() {
        return {
            pageId: 'music-player',
            isOpen: false,
            isPlaying: false,
            isMuted: false,
            volume: null,
            prevVolume: null,
            currentTrack: null,
            repeatActive: false,
            shuffleActive: false,
            trackPosition: [],
            trackDuration: []
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
        ...mapActions(['fetchCurrentlyPlayingTrack', 'repeatTrack', 'shufflePlayback', 'seekToPosition']),
        playTrack() {
            console.log('playTrack called')
            this.isPlaying = true
            this.$store.dispatch('resumeTrack')
            this.fetchCurrentlyPlayingTrack()
        },
        seekToPosition() {
            this.$store.dispatch('seekToPosition', this.trackPosition)
        },
        updateTrack(){
            const track = this.$store.state.currentlyPlayingTrack
            if (track) {
                this.trackPosition = track.progress_ms
                this.trackDuration = track.duration_ms
            }
        },
        pauseTrack() {
            console.log('pauseTrack called')
            this.isPlaying = false
            this.$store.dispatch('pauseTrack')
            this.fetchCurrentlyPlayingTrack()
        },
        prevTrack() {
        console.log('prevTrack called')
            this.$store.dispatch('skipToPreviousTrack')
            this.isPlaying = true
            this.fetchCurrentlyPlayingTrack()
        },
        nextTrack() {
            console.log('nextTrack called')
            this.$store.dispatch('skipToNextTrack')
            this.isPlaying = true
            this.fetchCurrentlyPlayingTrack()
        },
        mute() {
            this.isMuted = !this.isMuted
            if (this.isMuted) {
                this.prevVolume = this.volume
                this.volume = 0
            }
            else{
                this.volume = this.prevVolume
            }
            this.$store.dispatch('setVolume', this.volume)
        },
        updateVolume(event) {
            this.volume = event.target.value
            this.$store.dispatch('setVolume', this.volume)
            if (this.volume > 0) {
                this.isMuted = false
                this.prevVolume = this.volume
            } else {
                this.isMuted = true
            }
        },
        shuffle() {
            this.shuffleActive = !this.shuffleActive
            this.shufflePlayback(this.shuffleActive)
        },
        repeat() {
            this.repeatActive = !this.repeatActive
            this.repeatTrack(this.repeatActive ? 'context' : 'off')
        }
    },
}
</script>

<template>
    <div :class="pageId" class="pb-20" v-if="isLogin">
        <div class="bg-black text-white flex flex-col md:flex-row items-center px-4 md:px-12 fixed bottom-0 w-full h-24 justify-between">
            <div class="flex items-center gap-2 mb-4 md:mb-0 w-full md:w-64 flex-wrap">
                <img v-if="currentlyPlayingTrack" :src="currentlyPlayingTrack.albumUrl" alt="track image" class="w-14 h-14 rounded-md object-cover">
                <div v-if="currentlyPlayingTrack" class="ml-2 md:ml-4">
                    <p class="text-sm truncate" :title="currentlyPlayingTrack.name">{{ currentlyPlayingTrack.name }}</p>
                    <p class="text-sm text-gray-400 truncate" :title="currentlyPlayingTrack.artist">{{ currentlyPlayingTrack.artist }}</p>
                </div>
                <div v-else class="ml-2 md:ml-4">
                    <p class="text-sm truncate">No track is currently playing</p>
                    <p class="text-sm text-gray-400 truncate"></p>
                </div>
            </div>
            <div class="flex flex-row items-center w-full md:w-1/3 mb-4 md:mb-0 mt-1 flex-wrap">
                <div class="flex items-center">
                    <button @click="shuffle" :class="[shuffleActive ? 'text-green-500 hover:text-white' : 'text-gray-300 hover:text-white']">
                        <font-awesome-icon icon="random" class="h-6 w-6" />
                    </button>
                    <button @click="prevTrack">
                        <font-awesome-icon :icon="['fas', 'step-backward']" class="h-7 w-7 text-gray-300 hover:text-white" />
                    </button>
                    <button @click="isPlaying ? pauseTrack() : playTrack()">
                        <font-awesome-icon icon="circle-play" v-if="!isPlaying" class="h-8 w-8 text-white" />
                        <font-awesome-icon icon="circle-pause" v-else class="h-8 w-8 text-white" />

                    </button>
                    <button @click="nextTrack">
                        <font-awesome-icon icon="step-forward" class="h-7 w-7 text-gray-300 hover:text-white" />
                    </button>
                    <button @click="repeat" :class="repeatActive ? 'text-green-500' : 'text-gray-300 hover:text-white'">
                        <font-awesome-icon icon="repeat" class="h-6 w-6" />
                    </button>
                </div>
                <!--
                <div class="mb-3 w-full">
                    <input id="track" type="range" min="0" :max="trackDuration" v-model="trackPosition" @change="seekToPosition" class="w-full">
                </div>
                -->
            </div>
            <div class="flex items-center w-full md:w-auto">
                <button @click="mute" class="mr-3">
                    <VolumeUpIcon v-if="!isMuted" class="h-6 w-6 text-white" />
                    <VolumeOffIcon v-else class="h-6 w-6 text-white" />
                </button>
                <input id="volume" type="range" min="0" max="100" v-model="volume" @input="updateVolume">
            </div>
        </div>
    </div>
</template>

