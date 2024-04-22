<script>
import MusicPlayer from './components/MusicPlayer.vue'
import '@/assets/main.scss'

export default {
  name: 'App',
  components: {
    MusicPlayer
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<template>
  <div>
    <router-view />
    <music-player/>
  </div>
</template>
