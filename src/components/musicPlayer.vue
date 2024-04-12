<script>
import { PlayIcon, PauseIcon, ChevronRightIcon as NextIcon, ChevronLeftIcon as PrevIcon } from '@heroicons/vue/solid'

export default {
    name: 'musicPlayer',
    inject: ['isMobile'],
    components: {
        PlayIcon,
        PauseIcon,
        PrevIcon,
        NextIcon
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
        }
    },
    methods: {
        togglePlay() {
            this.isPlaying = !this.isPlaying;
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
    <div :class="pageId" class="h-full w-full flex flex-col">
        <div class="h-24 bg-black text-white flex items-center justify-center px-4 fixed bottom-0 w-full">
            <div class="flex flex-col items-center w-1/3">
                <div class="flex items-center">
                    <button @click="prevTrack">
                        <PrevIcon class="h-6 w-6 text-white" />
                    </button>
                    <button @click="togglePlay" class="mx-2">
                        <PlayIcon v-if="!isPlaying" class="h-6 w-6 text-white" />
                        <PauseIcon v-else class="h-6 w-6 text-white" />
                    </button>
                    <button @click="nextTrack">
                        <NextIcon class="h-6 w-6 text-white" />
                    </button>
                </div>
                <div class="w-full h-1 bg-gray-800 rounded-full my-2 relative overflow-hidden">
                    <div class="absolute top-0 left-0 h-full bg-green-600"></div>
                </div>
            </div>

        </div>
    </div>
</template>

