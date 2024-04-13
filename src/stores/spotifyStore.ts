import { createStore } from 'vuex'
import axios from 'axios'

const initialState = {
    clientId: 'c9e427559756478e9e29acde01d39372',
    redirectUrl: 'http://localhost:5173/',
    apiUrl: 'https://accounts.spotify.com/authorize',
    scopes: [
        "user-read-email",
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
        "user-read-playback-position",
    ],
    isLogin: false,
    isPlaying: false,
    imageUrl: '',
    currentlyPlayingTrack: null,
    recentlyPlayedTracks: [],
    recentlyPlayedPlaylists: [],
    userPlaylists: [],
    selectedPlaylist: {},
    songs: [],
}

export default createStore({
    state: { ...initialState },

    mutations: {
        SET_LOGGED_IN(state, value) {
            state.isLogin = value
        },
        SET_IMAGE_URL(state, url) {
            state.imageUrl = url
        },
        RESET_STATE(state) {
            Object.assign(state, initialState)
        },
        SET_RECENTLY_PLAYED_TRACKS(state, tracks) {
            state.recentlyPlayedTracks = tracks
        },
        SET_RECENTLY_PLAYED_PLAYLISTS(state, playlists) {
            state.recentlyPlayedPlaylists = playlists
        },
        SET_USER_PLAYLISTS(state, playlists) {
            state.userPlaylists = playlists
        },
        setSelectedPlaylist(state, playlist) {
            state.selectedPlaylist = playlist
        },
        setSongs(state, songs) {
            state.songs = songs
        },
        SET_PLAYING(state, value) {
            state.isPlaying = value
        },
        SET_CURRENTLY_PLAYING_TRACK(state, track) {
            state.currentlyPlayingTrack = track
        },
    },
    actions: {
        redirectToLogin({ state }) {
            window.location.href = `${state.apiUrl}?client_id=${state.clientId}&redirect_uri=${state.redirectUrl}&scope=${state.scopes.join(' ')}&response_type=token&show_dialog=true`
        },
        async fetchUserData({ commit }) {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                }
            })
            if (response.data) {
                commit('SET_LOGGED_IN', true)
                commit('SET_IMAGE_URL', response.data.images[0].url)
            }
        },
        logout({ commit }) {
            localStorage.removeItem('spotify_access_token')
            commit('RESET_STATE')
            window.location.reload()
        },
        async fetchRecentlyPlayedTracks({ commit }) {
            const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                }
            })
            commit('SET_RECENTLY_PLAYED_TRACKS', response.data.items)
        },
        async fetchCurrentlyPlayingTrack({ commit }) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                    }
                });
                if (response.data && response.data.item) {
                    const track = {
                        name: response.data.item.name,
                        artist: response.data.item.artists.map(artist => artist.name).join(', '),
                        albumUrl: response.data.item.album.images[0].url
                    };
                    commit('SET_CURRENTLY_PLAYING_TRACK', track);
                } else {
                    console.log('No currently playing track found.');
                }
            } catch (error) {
                console.error('Error fetching currently playing track:', error);
            }
        },
        async skipToNextTrack({ commit, dispatch }) {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/next', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to skip to the next track');
                }
                console.log('Skipped to next track');
                // Ensure the track information is fetched after changing the track
                await dispatch('fetchCurrentlyPlayingTrack');
            } catch (error) {
                console.error(error);
            }
        },
        async skipToPreviousTrack({ commit, dispatch }) {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to skip to the previous track');
                }
                console.log('Skipped to previous track');
                // Ensure the track information is fetched after changing the track
                await dispatch('fetchCurrentlyPlayingTrack');
            } catch (error) {
                console.error(error);
            }
        },
        async pauseTrack({ dispatch }) {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to pause the track')
                }
                console.log('Paused track')
                await dispatch('fetchRecentlyPlayedTracks')
            } catch (error) {
                console.error(error)
            }
        },
        async resumeTrack({ dispatch }) {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to resume the track')
                }
                console.log('Resumed track')
                await dispatch('fetchRecentlyPlayedTracks')
            } catch (error) {
                console.error(error)
            }
        },
        async fetchRecentlyPlayedPlaylists({ commit }) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?type=playlist', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
                },
                })
        
                commit('SET_RECENTLY_PLAYED_PLAYLISTS', response.data.items)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchUserPlaylists({ commit }) {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
                }
            })
            commit('SET_USER_PLAYLISTS', response.data.items)
        },
        setSelectedPlaylist({ commit }, playlist) {
            commit('setSelectedPlaylist', playlist)
        },
        setSongs({ commit }, songs) {
            commit('setSongs', songs)
        },
        async fetchPlaylistSong({ dispatch }, playlistId) {
            const accessToken = localStorage.getItem('spotify_access_token')

            try {
                const responsePlaylist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })


                if (responsePlaylist.data) {
                const playlist = {
                    image: responsePlaylist.data.images[0].url,
                    title: responsePlaylist.data.name,
                    description: responsePlaylist.data.description,
                }
                console.log('playlist:', playlist)
                dispatch('setSelectedPlaylist', playlist)
                }

                const responseTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                })

                if (responseTracks.data) {
                const songs = responseTracks.data.items.map((item, index) => {
                    const dateAdded = new Date(item.added_at)
                    const now = new Date()
                    const diffTime = Math.abs(now - dateAdded)
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
                dispatch('setSongs', songs)
                }
            } catch (error) {
                console.error('Error getting playlist songs:', error)
            }
        },
    },
})