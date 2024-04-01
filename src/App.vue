<script>
import '@/assets/main.scss'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
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
    <Login />
  </div>
</template>