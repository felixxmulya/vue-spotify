<script>
import musicPlayer from './components/musicPlayer.vue'
import '@/assets/main.scss'

export default {
  name: 'App',
  components: {
    musicPlayer
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
