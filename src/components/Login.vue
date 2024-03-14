<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<template id="login">
  <nav class="login bg-black px-6 py-4">
    <div class="flex flex-row items-center justify-between">
      <div class="flex items-center text-white px-4">
        <img src="" alt="Spotify" class="h-8 w-8 mr-2"/>
        <span class="font-semibold text-xl tracking-tight">Spotify</span>
      </div>
      <div class="hidden md:block px-4">
        <div class="text-sm text-white">
          <a href="#premium" class="block mt-4 md:inline-block md:mt-0 hover:text-green-500 mr-4">
            Premium
          </a>
          <a href="#support" class="block mt-4 md:inline-block md:mt-0 hover:text-green-500 mr-4">
            Support
          </a>
          <a href="#download" class="block mt-4 md:inline-block md:mt-0 hover:text-green-500">
            Download
          </a>
        </div>
      </div>
      <div class="block md:hidden ml-auto">
      <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
      </div>
    </div>

    <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="md:hidden ml-auto">
      <div class="px-2 pt-2 pb-4">
        <a href="#premium" class="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-500 mr-4">
          Premium
        </a>
        <a href="#support" class="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-500 mr-4">
          Support
        </a>
        <a href="#download" class="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-500">
          Download
        </a>
      </div>
    </div>
  </nav>
</template>



<style scoped>
</style>