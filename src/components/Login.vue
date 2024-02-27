<template>
  <nav class="flex items-center justify-between flex-wrap bg-black p-6 text-end mx-24">
    <div class="flex items-center flex-shrink-0 text-white">
      <img src="" alt="Spotify" class="h-8 w-8 mr-2"/>
      <span class="font-semibold text-xl tracking-tight">Spotify</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href="#premium" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-500 mr-4">
          Premium
        </a>
        <a href="#support" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-500 mr-4">
          Support
        </a>
        <a href="#download" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-500">
          Download
        </a>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
    data() {
        return {
            message: 'Hello, Vue!'
        }
    }
}
</script>

<style scoped>
nav {
    margin: 0 auto;
}

h1 {
    color: #42b983;
}
</style>