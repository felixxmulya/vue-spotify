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
    imageUrl: '',
    recentlyPlayedTracks: [],
    playlists: [],
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
        SET_PLAYLISTS(state, playlists) {
            state.playlists = playlists
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
            console.log('Response data:', response.data.items)
            commit('SET_RECENTLY_PLAYED_TRACKS', response.data.items)
            console.log('State after commit:', this.state.recentlyPlayedTracks)
        },
        async fetchPlaylists({ commit }) {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
              }
            })
            commit('SET_PLAYLISTS', response.data.items)
        },
    },
})