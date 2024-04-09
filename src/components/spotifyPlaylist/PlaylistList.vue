<script>
export default {
   data() {
      return {
         pageId: 'playlist-list',
         songs: [],
         tableTitle:[
            { key: 'number', value: '#' },
            { key: 'title', value: 'Title' },
            { key: 'album', value: 'Album' },
            { key: 'dateAdded', value: 'Date Added' }
         ],
         tableTitleArray: []
      }
   },
   created() {
      this.tableTitleArray = Object.entries(this.tableTitle).map(([key, value]) => ({ key, value }));
   }
}
</script>

<template>
   <div :class="pageId">
      <table class="table-auto w-full text-left">
         <tr>
            <th class="px-4 py-2" v-for="item in tableTitle" :key="item.key">{{ item.value }}</th>
         </tr>
         <tbody>
            <tr v-for="(song, index) in songs" :key="song.id">
               <td class="border px-4 py-2">{{ index + 1 }}</td>
               <td class="border px-4 py-2">{{ song.title }}</td>
               <td class="border px-4 py-2">{{ song.album }}</td>
               <td class="border px-4 py-2">{{ song.dateAdded }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>