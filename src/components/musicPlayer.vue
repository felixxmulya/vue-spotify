<script>
import { PlayIcon, PauseIcon, ChevronRightIcon as NextIcon, ChevronLeftIcon as PrevIcon, VolumeUpIcon } from '@heroicons/vue/solid'

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
            currentTrack: {
                title: 'Track Title',
                artist: 'Artist Name',
            },
            progress: 0,
            volume: 30,
            track: 0,
        }
    },
    computed:{

    },
    methods: {
        togglePlay() {
            this.isPlaying = !this.isPlaying;
        },
        updateVolume(event) {
            this.volume = event.target.value;
        },
        updateTrack(event) {
            this.track = event.target.value;
        },
        prevTrack() {
            // Logic to switch to the previous track
        },
        nextTrack() {
            // Logic to switch to the next track
        },
    },
}
</script>

<template>
    <div :class="pageId" class="pb-16">
        <div class="bg-black text-white flex flex-col md:flex-row items-center px-12 fixed bottom-0 w-full h-auto justify-between">
            <div class="flex items-center gap-2 mb-4 md:mb-0">
                <img src=" " alt="track image" class="w-14 h-14 rounded-md object-cover">
                <div class="ml-4">
                    <p class="text-sm">Title Name Left</p>
                    <p class="text-sm text-gray-400">Artist Left</p>
                </div>
            </div>
            <div class="flex flex-col items-center w-full md:w-1/3 mb-4 md:mb-0">
                <div class="flex items-center">
                    <button @click="prevTrack">
                        <PrevIcon class="h-8 w-8 text-white" />
                    </button>
                    <button @click="togglePlay" class="">
                        <PlayIcon v-if="!isPlaying" class="h-8 w-8 text-white" />
                        <PauseIcon v-else class="h-8 w-8 text-white" />
                    </button>
                    <button @click="nextTrack">
                        <NextIcon class="h-8 w-8 text-white" />
                    </button>
                </div>
                <div class="mb-3 w-full">
                    <input id="track" type="range" min="0" max="100" v-model="track" @input="updateTrack">
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

