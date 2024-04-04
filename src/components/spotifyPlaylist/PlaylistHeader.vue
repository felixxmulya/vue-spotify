<script>
export default {
   name: 'PlaylistHeader',
   data() {
      return {
         pageId: 'Playlist-header',
      }
   },
}
</script>

<template>
   <div :class="pageId" >
      <div class="bg-[#121212] text-white p-4 flex items-center">
         <img src="https://i.ibb.co/FYbMXTm/spotify-icon.png" alt="Playlist Image" class="playlist-header-image mr-4">
         <div class="">
            <h3>Playlist</h3>
            <h1 class="text-4xl mb-2">Hi</h1>
            <p class="text-lg">Test</p>
         </div>
      </div>
   </div>
</template>