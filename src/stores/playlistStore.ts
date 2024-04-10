import { createStore } from 'vuex'
import axios from 'axios'

/*
export default createStore({
    state: {
        playlist: {},
        songs: [],
      },
      mutations: {
        setPlaylist(state, playlist) {
          state.playlist = playlist
        },
        setSongs(state, songs) {
          state.songs = songs
        },
      },
      actions: {
        async fetchPlaylistList({ commit }, playlistId) {
          const accessToken = localStorage.getItem('spotify_access_token')

          try {
            const responsePlaylist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })

            if (responsePlaylist.data) {
              commit('setPlaylist', {
                image: responsePlaylist.data.images[0].url,
                title: responsePlaylist.data.name,
                description: responsePlaylist.data.description,
              })
            }

            const responseTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })

            if (responseTracks.data) {
            const songs = responseTracks.data.items.map((item: any, index: number) => {
                const dateAdded = new Date(item.added_at)
                const now = new Date()
                const diffTime = Math.abs(now.getTime() - dateAdded.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                let formattedDate

                if (diffDays <= 1) {
                  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
                  formattedDate = `${diffHours} hours ago`
                } else if (diffDays <= 7) {
                  formattedDate = `${diffDays} days ago`
                } else if (diffDays <= 30) {
                  const diffWeeks = Math.floor(diffDays / 7)
                  formattedDate = `${diffWeeks} weeks ago`
                } else {
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                  ]
                  formattedDate = `${monthNames[dateAdded.getMonth()]} ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`
                }

                return {
                  id: index + 1,
                  title: item.track.name,
                  album: item.track.album.name,
                  dateAdded: formattedDate,
                  duration: new Date(item.track.duration_ms).toISOString().substr(14, 5),
                }
              })
              commit('setSongs', songs)
            }
          } catch (error) {
            console.error('Error getting playlist songs:', error)
          }
        },
    },
})
*/