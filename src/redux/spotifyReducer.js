import { AUTH_CODE, STORE_TOKEN, STORE_USER_DATA, STORE_PLAYLIST_DATA, TOGGLE_CURRENT_PAGE, STORE_TOP_ARTISTS_DATA, STORE_TOP_TRACKS_DATA } from "./action_types"

const initState = {
    authCode: null,
    userToken: null,
    userData: null,
    playlist: null,
    topArtists: null,
    topTracks: null,
    currentPage: 'profile'
}

export default function spotifyReducer(state = initState, action) {
    const {type, payload} = action
    const selector = {}
    selector[AUTH_CODE] = authenticateUser
    selector[STORE_TOKEN] = storeToken
    selector[STORE_USER_DATA] = storeUserData
    selector[STORE_PLAYLIST_DATA] = storePlaylistData
    selector[TOGGLE_CURRENT_PAGE] = toggleCurrentPage
    selector[STORE_TOP_ARTISTS_DATA] = storeTopArtistsData
    selector[STORE_TOP_TRACKS_DATA] = storeTopTracksData

    if(selector[type] === undefined) return {...state}

    return selector[type](state, payload)
}

function authenticateUser(state, payload) {
    return {...state, authCode: payload}
}

function storeToken(state, payload) {
    return {...state, userToken: payload}
}

function storeUserData(state, payload) {
    return {...state, userData: payload}
}

function storePlaylistData(state, payload) {
    return {...state, playlist: payload}
}

function toggleCurrentPage(state, payload) {
    return {...state, currentPage: payload}
}

function storeTopArtistsData(state, payload) {
    return {...state, topArtists: payload}
}

function storeTopTracksData(state, payload) {
    return {...state, topTracks: payload}
}