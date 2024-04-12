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
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  provide() {
    return {
      isMobile: () => this.isMobile
    }
  }
}
</script>

<template>
  <div>
    <router-view />
    <music-player/>
  </div>
</template>
